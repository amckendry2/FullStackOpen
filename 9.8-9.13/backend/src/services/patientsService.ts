import {v1 as uuid} from 'uuid';
import { Patient, PatientNoSsn, NewPatient } from '../types';
import patientData from '../../data/patients';

const getAll = (): Patient[] => {
	return patientData;
};

const postNew = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		...patient,
		id: uuid()
	};
	patientData.push(newPatient);
	return newPatient;
};

const getAllNoSsn = (): PatientNoSsn[] => {
	return patientData.map(p => ({
		id: p.id,
		name: p.name,
		dateOfBirth: p.dateOfBirth,
		gender: p.gender,
		occupation: p.occupation
	}));
};

export default { getAll, getAllNoSsn, postNew };