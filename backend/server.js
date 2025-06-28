//general imports
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import multer from 'multer';

//route imports
import example from './routes/exampleroute.js';


const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
}));


app.use('/', example)

const PORT =  process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});