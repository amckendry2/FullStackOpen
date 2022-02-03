import React from 'react';
import { useStateValue } from '../../state';
import { OccupationalHealthcareEntry } from '../../types';

const Occupational = ({ entry }: { entry: OccupationalHealthcareEntry }) => {

	const [ { diagnoses: diagnosesData }, ] = useStateValue();

	const diagnoses = entry.diagnosisCodes?.map(c => {
		const data = diagnosesData.find(d => d.code === c);
		return <li key={c}>{data?.code}: {data?.name}</li>;
	});

	return (
		<div style={{border: '2px solid black', padding: 10}}>
			<h4>{entry.date}: Occupational Care</h4>
			<p>specialist: {entry.specialist}</p>
			<p style={{ fontStyle: 'italic' }}>
				{entry.description}
			</p>
			{entry.sickLeave 
				? 
				<> 
				<h4>sick leave:</h4>
				<ul>
					<li>started: {entry.sickLeave.startDate}</li>
					<li>ended: {entry.sickLeave.endDate}</li>
				</ul>
				</>
				: null
			}
			{diagnoses 
				? <>
					<h4>diagnoses:</h4>
					<ul>
						{diagnoses}
					</ul>
				</>
				: null
			}

		</div>
	);
};


export default Occupational;