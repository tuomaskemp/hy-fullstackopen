import patients from "../../data/patients";
import { NewPatient, Patient, PatientSsnExluded } from "../types";
import {v1 as uuid} from 'uuid';

const getPatientSsnExluded = (): PatientSsnExluded[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
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

export default { getPatientSsnExluded, addPatient };