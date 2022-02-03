import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, gotPatient, updatePatient } from '../state';
import { NewEntry, Patient, EntryType } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import EntryView from '../EntryView/EntryView';
import AddEntryModal from '../AddEntryModal';
import { Button } from 'semantic-ui-react';
import { FormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetails = () => {

	const { id: patientId } = useParams<{ id: string }>();	
	const [ { patients }, dispatch ] = useStateValue();
	const [ modalOpen, setModalOpen ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | undefined>();

	useEffect(() => {
		const getPatientData = async () => {
			try {
				const { data: patientData } = await axios.get<Patient>(
					`${apiBaseUrl}/patients/${patientId}`);
				dispatch(gotPatient(patientData));
			} catch (err) {
				let msg = 'Something went wrong.';
				if(err instanceof Error){
					msg += 'Error: ' + err.message;
				}
				console.error(msg);
			}
		};
		void getPatientData();
	},[dispatch]);

	const submitNewEntry = async ( values: FormValues, type: EntryType) => { 
		const submitEntry: NewEntry = {
			...values,
			type: type
		};
		try {
			const { data: updatedPatient } = await axios.post<Patient>(
				`${apiBaseUrl}/patients/${patientId}/entries`, 
				submitEntry
			);
			dispatch(updatePatient(updatedPatient));
			closeModal();
		} catch (err) {
			let msg = 'Something went wrong.';
			if(err instanceof Error){
				msg += ' Error: ' + err.message;
			}
			console.error(msg);
		}
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setError(undefined);
	};

	const currentPatient = patients[patientId];
	
	if(currentPatient === undefined){
		return null;
	}

	const entryData = currentPatient.entries.map(e => 
		<EntryView key={e.id} entry={e}/>
	);

	return (
		<div>
			<h2>{currentPatient.name}</h2>
			<p>gender: {currentPatient.gender}</p>
			<p>ssn: {currentPatient.ssn}</p>
			<p>occupation: {currentPatient.occupation}</p>
			{entryData.length > 0
				? (<>
					<h3>entries</h3>
					{entryData}
				</>)
				: null
			}
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
			<Button onClick={openModal}>Add New Entry</Button>
		</div>
	);
};

export default PatientDetails;