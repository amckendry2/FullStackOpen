import React from 'react';
import { assertNever } from '../utils';
import { Entry } from '../types';
import Hospital from './EntryDetails/Hospital';
import Occupational from './EntryDetails/Occupational';
import HealthCheck from './EntryDetails/HealthCheck';

const EntryView = ({ entry }: {entry: Entry }) => {
	switch(entry.type){
		case 'Hospital':
			return <Hospital entry={entry}/>;
		case 'OccupationalHealthcare':
			return <Occupational entry={entry}/>;
		case 'HealthCheck':
			return <HealthCheck entry={entry}/>;
		default:
			assertNever(entry);
			return <></>;
	}
};

export default EntryView;