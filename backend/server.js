//general imports
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';

//route imports
import example from './routes/exampleroute.js';
import authentication from './routes/authenticationroutes.js';
import database from './routes/databaseroutes.js';
import storage from './routes/storageroutes.js';

const app = express();

app.use(express.json());

const allowedOrigins = [
  'https://deployment-test.d2mwlph9qkry2s.amplifyapp.com',
  'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
}));


app.use('/', example)
app.use('/api/auth', authentication);
app.use('/api/database', database);
app.use('/api/storage', storage);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});