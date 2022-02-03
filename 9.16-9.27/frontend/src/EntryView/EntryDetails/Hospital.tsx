import React from 'react';
import { HospitalEntry } from '../../types';
import { useStateValue } from '../../state';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {

	const [ { diagnoses: diagnosesData }, ] = useStateValue();

	const diagnoses = entry.diagnosisCodes?.map(c => {
		const data = diagnosesData.find(d => d.code === c);
		return <li key={c}>{data?.code}: {data?.name}</li>;
	});

	return (
		<div style={{border: '2px solid black', padding: 10}}>
			<h4>{entry.date}: Hospital Visit</h4>
			<p>specialist: {entry.specialist}</p>
			<p style={{ fontStyle: 'italic' }}>
				{entry.description}
			</p>
			<h4>discharged:</h4>
			<ul>
				<li>date: {entry.discharge.date}</li>
				<li>reason: {entry.discharge.criteria}</li>
			</ul>
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


export default Hospital;