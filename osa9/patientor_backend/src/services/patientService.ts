import patients from "../../data/patients";
import { NewEntry, NewPatient, Patient, PatientSsnExluded } from "../types";
import {v1 as uuid} from 'uuid';

const getPatientSsnExluded = (): PatientSsnExluded[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
      id,
      entries: [],
      ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error('Cannot find patient');
  }
};

const addEntry = (entryId: string, entry: NewEntry): NewEntry => {
  const patients = getPatientSsnExluded();
  const patient = patients.find(patient => patient.id === entryId);
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  if (patient) {
    patient.entries.push(newEntry);
  } else {
    throw new Error('Cannot add entry');
  }

  return newEntry;
};

export default { getPatientSsnExluded, addPatient, getPatientById, addEntry };