import { Gender, NewPatient, NewEntry, HealthCheckRating } from "./types";

//type guards
const isString = (data: unknown): data is string => 
	typeof data === 'string';

const isNumber = (data: unknown): data is number =>
	typeof data === 'number';

//regular checks
const isDate = (data: string): boolean => Boolean(Date.parse(data));

const isGender = (data: string): data is Gender => 
	[...Object.values<string>(Gender)].includes(data);

const isEntry = (data: unknown): data is NewEntry => {
	const isEntryLike = (obj: unknown): obj is Partial<Record<keyof NewEntry, unknown>> => 
		obj !== null && typeof obj === 'object'
	return isEntryLike(data) && data.type !== undefined && typeof data.type === 'string';
}

const isHealthCheckRating = (data: unknown): data is HealthCheckRating => 
	isNumber(data) && data >= 0 && data <= 3;

//data parsers
const parseDate = (data: unknown): string => {
	if(!data || !isString(data) || !isDate(data)){
		throw new Error('Incorrect or missing date: ' + data);
	}
	return data;
};

const parseString = (data: unknown): string => {
	if(!data || !isString(data)){
		throw new Error('Failed to parse string from: ' + data);
	}
	return data;
}

const parseGender = (data: unknown): Gender => {
	if(!data || !isString(data) || !isGender(data)){
		throw new Error('Invalid gender data: ' + data);
	}
	return data;
};

const parseName = (data: unknown): string => {
	if(!data || !isString(data)){
		throw new Error('Invalid name data: ' + data);
	}
	return data;
};

const parseSsn = (data: unknown): string => {
	if(!data || !isString(data)){
		throw new Error('Invalid id data: ' + data);
	}
	return data;
};

const parseOccupation = (data: unknown): string => {
	if(!data || !isString(data)){
		throw new Error('Invalid occupation data');
	}
	return data;
};

const parseHealthCheckRating = (data: unknown): HealthCheckRating => {
	if(!data || !isHealthCheckRating(data)){
		throw new Error('got malfomred healthcheckrating data');
	}
	return data;
}

export const toNewEntry = (data: unknown): NewEntry => {
	if(!data || !isEntry(data)){
		throw new Error('Got malformed Entry');
	}
	const common = {
		date: parseDate(data.date),
		specialist: parseString(data.specialist),
		description: parseString(data.description)
	}
	switch(data.type){
		case 'Hospital':
			const hospitalObj: NewEntry = {
				...common,
				type: data.type,
				discharge: {
					date: parseDate(data.discharge.date),
					criteria: parseString(data.discharge.criteria)
				}
			};
			if(data.diagnosisCodes){
				hospitalObj.diagnosisCodes = data.diagnosisCodes.map(d => parseString(d))
			}
			return hospitalObj;
		case 'OccupationalHealthcare':
			const occupationalObj: NewEntry = {
				...common, 
				type: data.type,
				employerName: parseString(data.employerName),
			}
			if(data.diagnosisCodes){
				occupationalObj.diagnosisCodes = data.diagnosisCodes.map(d => parseString(d));
			}
			if(data.sickLeave){
				occupationalObj.sickLeave = {
					startDate: parseDate(data.sickLeave.startDate),
					endDate: parseDate(data.sickLeave.endDate)
				};
			}
			return occupationalObj;
		case 'HealthCheck':
			return {
				...common,
				type: data.type,
				healthCheckRating: parseHealthCheckRating(data.healthCheckRating)
			}
		default:
			throw new Error('Received malformed Entry data');
	}
}

export const toNewPatient = (data: unknown) : NewPatient => {
	const isPatientLike = (obj: unknown): obj is Partial<Record<keyof NewPatient, unknown>> =>
		typeof obj === 'object'
	if(!data || !isPatientLike(data)){
		throw new Error('got malformed Patient data')
	}
	const patient: NewPatient = {
		name: parseName(data.name),
		ssn: parseSsn(data.ssn),
		dateOfBirth: parseDate(data.dateOfBirth),
		gender: parseGender(data.gender),
		occupation: parseOccupation(data.occupation),
		entries: []
	};
	return patient;
};
