import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientSsnExluded());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient({
    name, dateOfBirth, ssn, gender, occupation
  });
  res.json(newPatientEntry);
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export default router;