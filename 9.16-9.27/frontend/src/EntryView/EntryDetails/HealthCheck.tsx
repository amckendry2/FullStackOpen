import React from 'react';
import { HealthCheckEntry } from '../../types';
import { HealthCheckRating } from '../../types';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
	return (
		<div style={{border: '2px solid black', padding: 10}}>
			<h4>{entry.date}: Checkup</h4>
			<p>specialist: {entry.specialist}</p>
			<p style={{ fontStyle: 'italic' }}>
				{entry.description}
			</p>
			<p>condition: {HealthCheckRating[entry.healthCheckRating]}</p>
		</div>
	);
};

export default HealthCheck;