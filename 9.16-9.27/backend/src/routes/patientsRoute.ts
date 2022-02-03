import express from 'express';
import service from '../services/patientsService';
import { NewEntry, NewPatient, Patient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => {
	res.send(service.getAllNoSsn());
});

patientsRoute.get('/:id', (req, res) => {
	try {
		res.send(service.getById(req.params.id));
	} catch (err: unknown) {
		let msg = 'Something went wrong.';
		if (err instanceof Error) {
			msg += 'Error: ' + err.message;
		}
		res.status(400).send({ error: msg });
	}
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
		res.status(400).send({ error: errorMessage });
	}
});

patientsRoute.post('/:id/entries', (req, res) => {
	try {
		const newEntry: NewEntry = toNewEntry(req.body);
		const patientId = req.params.id;
		const updatedPatient: Patient = service.postNewEntry(patientId, newEntry);
		res.json(updatedPatient);
	} catch (err: unknown) {
		let errorMessage = 'Something went wrong.';
		if (err instanceof Error) {
			errorMessage += ' Error: ' + err.message;
		}
		res.status(400).send({ error: errorMessage });
	}
})

export default patientsRoute;