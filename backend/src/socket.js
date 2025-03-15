import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  console.log("Socket server initialized");

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Listen for a request from the client
    socket.on("process_request", (data) => {
      console.log("Received from client:", data);
      
      // Process data
      const result = `Processed: ${data.toUpperCase()}`;
      
      // Emit result back to the same client
      socket.emit("process_response", result);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
