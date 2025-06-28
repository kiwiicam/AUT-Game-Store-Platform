import express from 'express';
import { exampleController } from '../controllers/examplecontroller.js';

const router = express.Router();

router.get('/example', exampleController);

export default router;