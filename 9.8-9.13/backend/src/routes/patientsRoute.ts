import express from 'express';
import service from '../services/patientsService';
import { NewPatient, Patient } from '../types';
import { toNewPatient } from '../utils';

const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => {
	res.send(service.getAllNoSsn());
});

patientsRoute.post('/', (req, res) => {
	try {
		const patient: NewPatient = toNewPatient(req.body);
		const retPatient: Patient = service.postNew(patient);
		res.json(retPatient);
	} catch (err: unknown) {
		let errorMessage = 'Something went wrong.';
		if (err instanceof Error) {
			errorMessage += 'Error: ' + err.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientsRoute;