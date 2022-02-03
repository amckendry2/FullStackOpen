import {v1 as uuid} from 'uuid';
import { Patient, PatientNoSsn, NewPatient, NewEntry, Entry } from '../types';
import patientData from '../../data/patients';

const getAll = (): Patient[] => {
	return patientData;
};

const getById = ( id: string ): Patient | undefined => {
	return patientData.find(p => p.id === id);
};

const postNew = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		...patient,
		id: uuid()
	};
	patientData.push(newPatient);
	return newPatient;
};

const postNewEntry = (id: string, entry: NewEntry): Patient => {
	const foundPatient = patientData.find(p => p.id === id);
	if(!foundPatient){
		throw new Error('Tried to update entry on non-existent patient!');
	}
	const entryWithId: Entry = {
		...entry,
		id: uuid()
	};
	const updatedPatient: Patient = { 
		...foundPatient, 
		entries: foundPatient.entries.concat(entryWithId)
	}
	patientData.map(p => p.id === id ? updatedPatient : p);
	return updatedPatient;
}

const getAllNoSsn = (): PatientNoSsn[] => {
	return patientData.map(p => ({
		id: p.id,
		name: p.name,
		dateOfBirth: p.dateOfBirth,
		gender: p.gender,
		occupation: p.occupation,
		entries: p.entries
	}));
};

export default { getAll, getAllNoSsn, postNew, getById, postNewEntry };