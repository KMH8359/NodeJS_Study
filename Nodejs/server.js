// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트 (채팅 페이지 제공)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 클라이언트와의 연결 이벤트
io.on('connection', (socket) => {
    console.log('A user connected');

    // 클라이언트로부터 메시지를 받음
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // 모든 클라이언트에게 메시지 전송
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
