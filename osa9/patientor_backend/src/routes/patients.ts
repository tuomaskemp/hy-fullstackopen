import express from 'express';
import getPatientSsnExluded from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatientSsnExluded());
});

export default router;