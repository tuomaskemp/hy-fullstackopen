import patients from "../../data/patients";
import { PatientSsnExluded } from "../types";

const getPatientSsnExluded = (): PatientSsnExluded[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default getPatientSsnExluded;