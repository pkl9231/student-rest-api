import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
require("./db/connection");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
app.use(express.json())

server.listen(port, () => {
    console.log(`Server start at port ${port}`);
});

app.use('/', router());
