const https = require('https');
const fs = require('fs');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

// 서버 인증서 사용
const privateKey  = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.crt'), 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

const app = express();
const server = https.createServer(credentials, app);

// Socket.IO 설정 수정
const io = new Server(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO 이벤트 처리
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // 클라이언트로부터 메시지를 받음
  socket.on('chat message', (data) => {
    // id와 메시지 데이터 전송
    io.emit('chat message', `${data.id}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Secure server is running at https://localhost:${PORT}`);
});