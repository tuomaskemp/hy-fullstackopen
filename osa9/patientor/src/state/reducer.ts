import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_PAGE_VIEWED";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    };


export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatientPageViewed = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_PAGE_VIEWED",
    payload: patient
  };
};

export const setDiagnosis = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: diagnosis
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_PAGE_VIEWED":
      if(state.viewedPatients.map(p => p.id).includes(action.payload.id)) {
        return state;
      }
      return {
        ...state,
        viewedPatients: [
          ...state.viewedPatients,
          action.payload
        ]
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload
      };
    default:
      return state;
  }
};
