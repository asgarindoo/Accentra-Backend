import express from 'express';
import dummyContoller from '../controllers/dummy.contoller';
const router = express.Router();

router.get('/dummy', dummyContoller.dummy)

export default router;