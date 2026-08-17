import express from 'express';
import Institution from '../models/institution.model.js';
import { registerInstitution } from '../controllers/institution.controller.js';

const router = express.Router();

router.post('/register', registerInstitution);
export default router;