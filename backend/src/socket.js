import { Server } from "socket.io";
import Slot from "./infrastructure/schema/slots_schema.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  console.log("Socket server initialized");

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Listen for a request from the client
    socket.on("process_request", async (data) => {
      try {
        console.log("Received from client:", data);

        // Process data
        const result = `Processed data: ${data.toUpperCase()}`;

        // Wait for database response
        const slots = await getSlotsBySessionId(data);

        // Emit result back to the same client
        socket.emit("process_response", slots);
      } catch (error) {
        console.error("Error processing request:", error);
        socket.emit("process_error", { message: "Failed to process request" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Make the function async
  async function getSlotsBySessionId(sessionId) {
    return await Slot.find({ Session: sessionId });
  }

  return io;
};
