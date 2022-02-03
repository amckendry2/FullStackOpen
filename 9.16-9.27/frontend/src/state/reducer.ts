import { Diagnosis, Patient } from "../types";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: Diagnosis[]
};

export const initialState: State = {
  patients: {},
  diagnoses: []
};

export const setPatientList = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: payload
});

export const addPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: payload
});

export const gotPatient = (payload: Patient): Action => ({
  type: "GOT_PATIENT",
  payload: payload
});

export const setDiagnoses = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES",
  payload: payload
});

export const updatePatient = (payload: Patient): Action => ({
  type: "UPDATE_PATIENT",
  payload: payload
});

export type Action =
  {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  |
  {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "GOT_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  |
  {
    type: "UPDATE_PATIENT";
    payload: Patient;
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
    case "GOT_PATIENT":
      return Object.keys(state.patients).includes(action.payload.id) 
      ? state 
      : {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {...state, diagnoses: action.payload };
    case "UPDATE_PATIENT":
      return {
        ...state, 
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
