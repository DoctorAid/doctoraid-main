import { Server } from "socket.io";
import Session from "./infrastructure/schema/sessions_schema.js";
import Slot from "./infrastructure/schema/slots_schema.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  console.log("Socket server initialized");

  // Track clients by session ID
  const sessionClients = new Map(); // sessionId -> Set of socket IDs

  // Function to get current slot data
  const getSlotsBySessionId = async (sessionId) => {
    try {
      const sessionExists = await Session.exists({ _id: sessionId });
      if (!sessionExists) {
        throw new Error('Session not found');
      }

      const slots = await Slot.find({ Session: sessionId }).populate('Session');
      
      return {
        success: true,
        slots: slots,
        count: slots.length,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error("Error in getSlotsBySessionId:", error.message);
      throw error;
    }
  };

  // Function to update session with current slot count
  const updateSessionSlotCount = async (sessionId) => {
    try {
      const slotCount = await Slot.countDocuments({ Session: sessionId });
      await Session.findByIdAndUpdate(sessionId, { 
        slotCount: slotCount,
        lastUpdated: new Date()
      });
      console.log(`📊 Updated session ${sessionId} slot count to ${slotCount}`);
    } catch (error) {
      console.error(`❌ Error updating session slot count for ${sessionId}:`, error);
    }
  };

  // Function to emit slot updates to all clients watching a session
  const emitSlotUpdate = async (sessionId, changeType = 'update') => {
    try {
      console.log(`📡 Emitting slot update for session: ${sessionId}, type: ${changeType}`);
      
      // Update session slot count
      await updateSessionSlotCount(sessionId);
      
      const slotData = await getSlotsBySessionId(sessionId);
      
      // Get all clients watching this session
      const clients = sessionClients.get(sessionId);
      if (clients && clients.size > 0) {
        console.log(`📤 Sending updates to ${clients.size} clients for session ${sessionId}`);
        
        clients.forEach(socketId => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            socket.emit("slot_update", {
              ...slotData,
              changeType: changeType,
              message: `Slots ${changeType}d for session ${sessionId}`
            });
          }
        });
      } else {
        console.log(`📭 No clients watching session ${sessionId}`);
      }
    } catch (error) {
      console.error(`❌ Error emitting slot update for session ${sessionId}:`, error);
    }
  };

  // Set up MongoDB Change Streams (if using MongoDB 4.0+)
  const setupChangeStreams = () => {
    try {
      // Watch for changes in the Slot collection with more comprehensive pipeline
      const slotChangeStream = Slot.watch([
        {
          $match: {
            $or: [
              { 'fullDocument.Session': { $exists: true } },
              { 'operationType': 'delete' }
            ]
          }
        }
      ], {
        fullDocument: 'updateLookup'
      });

      slotChangeStream.on('change', async (change) => {
        console.log('📊 Database change detected:', change.operationType, change.documentKey);
        
        let sessionId;
        
        try {
          // Extract session ID based on operation type
          if (change.operationType === 'delete') {
            // For delete operations, we need to find which session this slot belonged to
            // We'll get the document ID and try to find the session
            const deletedSlotId = change.documentKey._id;
            console.log(`🗑️ Slot deleted: ${deletedSlotId}`);
            
            // Since the document is already deleted, we need to check all sessions
            // or maintain a mapping. For now, we'll refresh all active sessions
            const activeSessions = Array.from(sessionClients.keys());
            console.log(`🔄 Refreshing ${activeSessions.length} active sessions due to slot deletion`);
            
            for (const activeSessionId of activeSessions) {
              await emitSlotUpdate(activeSessionId, 'delete');
            }
            
          } else if (change.fullDocument && change.fullDocument.Session) {
            // For insert, update, replace operations
            sessionId = change.fullDocument.Session.toString();
            await emitSlotUpdate(sessionId, change.operationType);
            
          } else if (change.operationType === 'update' && change.documentKey) {
            // For updates where fullDocument might not have Session field
            // Get the document to find the session
            const slot = await Slot.findById(change.documentKey._id);
            if (slot && slot.Session) {
              sessionId = slot.Session.toString();
              await emitSlotUpdate(sessionId, change.operationType);
            }
          }
        } catch (error) {
          console.error('❌ Error processing change stream event:', error);
        }
      });

      slotChangeStream.on('error', (error) => {
        console.error('❌ Change stream error:', error);
        // Attempt to restart change stream after error
        setTimeout(() => {
          console.log('🔄 Attempting to restart change stream...');
          setupChangeStreams();
        }, 5000);
      });

      slotChangeStream.on('close', () => {
        console.log('⚠️ Change stream closed');
      });

      console.log('✅ MongoDB Change Streams initialized');
      
      // Store reference for cleanup
      io.slotChangeStream = slotChangeStream;
      
    } catch (error) {
      console.error('❌ Failed to initialize Change Streams:', error);
      console.log('📝 Falling back to manual emit triggers');
    }
  };

  // Alternative approach: Watch for slot deletions with pre-delete middleware
  // You can add this to your Slot schema as well
  const setupPreDeleteHook = () => {
    // This would go in your Slot schema file
    /*
    slotSchema.pre('findOneAndDelete', async function() {
      const slot = await this.model.findOne(this.getFilter());
      if (slot && slot.Session) {
        // Store session ID for post-delete hook
        this._sessionId = slot.Session.toString();
      }
    });

    slotSchema.post('findOneAndDelete', async function(doc) {
      if (this._sessionId) {
        // Emit update for this session
        // You'll need to access your socket instance here
        if (global.socketInstance) {
          await global.socketInstance.triggerSlotUpdate(this._sessionId, 'delete');
        }
      }
    });
    */
  };

  io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

    // Client subscribes to watch a specific session
    socket.on("watch_session", async (sessionId) => {
      try {
        console.log(`👁️ Client ${socket.id} watching session: ${sessionId}`);
        
        // Add client to session watchers
        if (!sessionClients.has(sessionId)) {
          sessionClients.set(sessionId, new Set());
        }
        sessionClients.get(sessionId).add(socket.id);

        // Send initial slot data
        const initialData = await getSlotsBySessionId(sessionId);
        socket.emit("slot_update", {
          ...initialData,
          changeType: 'initial',
          message: `Now watching session ${sessionId}`
        });

        console.log(`✅ Client ${socket.id} now watching session ${sessionId}`);
        
      } catch (error) {
        console.error(`❌ Error setting up watch for session ${sessionId}:`, error);
        socket.emit("watch_error", {
          sessionId: sessionId,
          error: error.message
        });
      }
    });

    // Client stops watching a session
    socket.on("unwatch_session", (sessionId) => {
      console.log(`👁️‍🗨️ Client ${socket.id} stopped watching session: ${sessionId}`);
      
      const clients = sessionClients.get(sessionId);
      if (clients) {
        clients.delete(socket.id);
        if (clients.size === 0) {
          sessionClients.delete(sessionId);
        }
      }
    });

    // Manual trigger for slot updates (useful for testing or manual operations)
    socket.on("trigger_slot_update", async (sessionId) => {
      console.log(`🔄 Manual slot update triggered for session: ${sessionId}`);
      await emitSlotUpdate(sessionId, 'manual');
    });

    // Get current slot data (one-time request)
    socket.on("get_slots", async (sessionId) => {
      try {
        const slotData = await getSlotsBySessionId(sessionId);
        socket.emit("slots_data", slotData);
      } catch (error) {
        socket.emit("slots_error", {
          sessionId: sessionId,
          error: error.message
        });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`🔴 Client disconnected: ${socket.id}, reason: ${reason}`);
      
      // Remove client from all session watchers
      sessionClients.forEach((clients, sessionId) => {
        clients.delete(socket.id);
        if (clients.size === 0) {
          sessionClients.delete(sessionId);
        }
      });
    });
  });

  // Initialize change streams
  setupChangeStreams();

  // Expose functions for manual triggering from other parts of your app
  io.triggerSlotUpdate = emitSlotUpdate;
  io.updateSessionSlotCount = updateSessionSlotCount;

  // Cleanup function
  io.cleanup = () => {
    if (io.slotChangeStream) {
      io.slotChangeStream.close();
    }
  };

  // Make socket instance globally available for schema hooks if needed
  global.socketInstance = io;

  return io;
};