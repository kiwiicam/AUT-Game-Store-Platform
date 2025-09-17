import express from 'express';
import { uploadGame, uploadGameImages, retrieveGameImagesGame, downloadGame } from '../controllers/storagecontroller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads' });

router.post('/uploadgame', upload.single('file'), uploadGame);
router.post('/uploadimages', upload.array('images'), uploadGameImages);
router.post('/getgameimages', retrieveGameImagesGame)
router.get('/downloadGame/:gamename', downloadGame);

export default router;