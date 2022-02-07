import patients from "../../data/patients";
import { NewPatient, Patient, PatientSsnExluded, PublicPatient } from "../types";
import {v1 as uuid} from 'uuid';

const getPatientSsnExluded = (): PatientSsnExluded[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
      id,
      ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const getPublicPatientById = (id: string): PublicPatient => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error('Cannot find patient');
  }
};

export default { getPatientSsnExluded, addPatient, getPublicPatientById };