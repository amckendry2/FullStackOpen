type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T,K>
	: never;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"Low Risk" = 1,
	"High Risk" = 2,
	"Critical Risk" = 3
}

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

interface EntryBase {
	type: string;
	id: string;
	date: string;
	specialist: string;
	description: string;
}

export interface HospitalEntry extends EntryBase {
	type: 'Hospital';
	diagnosisCodes?: string[];
	discharge: {
		date: string;
		criteria: string;
	}
}

export interface OccupationalHealthcareEntry extends EntryBase {
	type: 'OccupationalHealthcare';
	employerName: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}

export interface HealthCheckEntry extends EntryBase {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewEntry = DistributiveOmit<Entry, 'id'>;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PatientNoSsn = Omit<Patient, 'ssn'>;

export interface Diagnosis {
	code: string,
	name: string,
	latin?: string
}