import express from 'express';
import { uploadGame } from '../controllers/storagecontroller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({
    dest: '../../../uploads/'});
router.post('/uploadgame', upload.single('file'), uploadGame);

export default router;