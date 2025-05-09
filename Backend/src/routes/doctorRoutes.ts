import express from 'express';
import { addDoctor, listDoctors } from '../controllers/doctorController';

const router = express.Router();

router.post('/add-doctor', addDoctor);
router.get('/list-doctor-with-filter', listDoctors);

export default router;
