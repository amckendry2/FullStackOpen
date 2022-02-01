import { Gender, NewPatient } from "./types";

//type guards
const isString = (data: unknown): data is string => 
	typeof data === 'string';

//regular checks
const isDate = (data: string): boolean => Boolean(Date.parse(data));

const isGender = (data: string): data is Gender => 
	[...Object.values<string>(Gender)].includes(data);

//data parsers
const parseDate = (data: unknown): string => {
	if(!data || !isString(data) || !isDate(data)){
		throw new Error('Incorrect or missing date: ' + data);
	}
	return data;
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any) : NewPatient => {
	const patient: NewPatient = {
		name: parseName(object.name),
		ssn: parseSsn(object.ssn),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		occupation: parseOccupation(object.occupation)
	};
	return patient;
};