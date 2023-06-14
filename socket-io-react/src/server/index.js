const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// CORS 설정
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 클라이언트 주소로 변경하여 정확한 도메인을 명시할 수도 있습니다.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // 클라이언트로부터의 데이터 수신 이벤트 처리
  socket.on("streamData", (data) => {
    console.log("Received data:", data);

    // 다른 클라이언트에 데이터 브로드캐스트
    socket.broadcast.emit("streamData", data);
  });

  // 클라이언트 연결 해제 이벤트 처리
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});
