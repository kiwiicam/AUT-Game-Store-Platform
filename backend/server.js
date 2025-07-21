//general imports
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';

//route imports
import example from './routes/exampleroute.js';
import authentication from './routes/authenticationroutes.js';
import database from './routes/databaseroutes.js';
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
}));


app.use('/', example)
app.use('/api/auth', authentication);
app.use('/api/database', database);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});