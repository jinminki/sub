const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// CORS 설정: Netlify에서 오는 요청만 허용
const corsOptions = {
    origin: 'https://songjinq.netlify.app',  // Netlify 도메인 설정
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));  // CORS 설정 적용
app.use(express.json());  // JSON 데이터 파싱

// 모바일에서 위치 정보를 서버로 전송하는 엔드포인트
app.post('/update-location', (req, res) => {
    const { lat, lng } = req.body;
    mobileLocation = { lat, lng };  // 모바일 위치 정보 저장
    console.log('모바일 위치 업데이트:', mobileLocation);
    res.status(200).send('Location updated');
});

// 노트북에서 모바일의 GPS 위치 정보를 요청하는 엔드포인트
app.get('/get-location', (req, res) => {
    if (mobileLocation.lat && mobileLocation.lng) {
        res.json(mobileLocation);  // 저장된 모바일 위치 정보를 반환
    } else {
        res.status(404).send('위치 정보가 없습니다.');  // 404 오류 반환
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
app.options('*', cors(corsOptions)); // 모든 경로에 대해 Preflight 요청을 허용
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://songjinq.netlify.app"); // Netlify 도메인 허용
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
