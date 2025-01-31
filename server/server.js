const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// MongoDB Connection
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((e) => {
      console.log("MongoDB Connected:",e.connection.host);
    })
    .catch((err) => {
      console.error("Failed to connect to DB");
      console.error(err);
    });
};

// Routes
const pollRoutes = require("./routes/pollRoutes")(io);
const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res)=>{
  res.send("Welcome to Polling App API");
});
app.use("/api/polls", pollRoutes); // Pass io for real-time updates
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    connectDB();
    server.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();