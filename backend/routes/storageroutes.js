import express from 'express';
import { uploadGame, uploadGameImages, retrieveGameImagesGame, downloadGame, getpfp,setpfp } from '../controllers/storagecontroller.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads' });

router.post('/uploadgame', upload.single('file'), uploadGame);
router.post('/uploadimages', upload.array('images'), uploadGameImages);
router.post('/getgameimages', retrieveGameImagesGame)
router.get('/downloadGame/:gamename', downloadGame);
router.post('/getpfp', getpfp);
router.post('/setpfp', upload.single('image'), setpfp);
export default router;