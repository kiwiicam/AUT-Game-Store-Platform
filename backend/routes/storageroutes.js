import express from 'express';
import { uploadGame, uploadGameImages } from '../controllers/storagecontroller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({
    dest: '../../../uploads/'});

router.post('/uploadgame', upload.single('file'), uploadGame);
router.post('/uploadimages', upload.array('images'), uploadGameImages);

export default router;