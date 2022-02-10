export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: Gender,
	occupation: string
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export type NewPatient = Omit<Patient, 'id'>;

export type PatientNoSsn = Omit<Patient, 'ssn'>;

export interface Diagnosis {
	code: string,
	name: string,
	latin?: string
}