// server.js
const express = require('express');
const app = express();

// 포트 번호 설정
const PORT = 3000;

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
