import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state/index';
import { EntryType } from '../types';

const isString = (data: unknown): data is string => {
	return data !== null && typeof data === 'string';
};

interface Props {
	onSubmit: (values: FormValues, type: EntryType) => void;
	onCancel: () => void;
}

export interface FormValues {
	date: string;
	specialist: string;
	description: string;
	diagnosisCodes: string[];
	discharge: {
		date: string;
		criteria: string;
	}
	employerName: string;
	sickLeave: {
		startDate: string;
		endDate: string;
	}
	healthCheckRating: number;
}


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

	const [ formType, setType ] = useState<EntryType>('Hospital');
	const [ { diagnoses } ] = useStateValue();

	const handleTypeChange = (_e: unknown, data: DropdownProps) => {
		if(isString(data.value)){
			setType(data.value as EntryType);
		}
	};

	const handleSubmit = (values: FormValues) => {
		onSubmit(values, formType);
	};

	return (
		<Formik
			initialValues={{
				date: "",
				specialist: "",
				description: "",
				diagnosisCodes: [],
				discharge: {
					date: "",
					criteria: ""
				},
				employerName: "", 
				sickLeave: {
					startDate: "",
					endDate: ""
				},
				healthCheckRating: 0
			}}
			onSubmit={handleSubmit}
			validate={values => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				if(!values.date){
					errors.date = requiredError;
				}
				if(!values.specialist){
					errors.specialist = requiredError;
				}
				if(!values.description){
					errors.description = requiredError;
				}
				switch(formType){
					case 'Hospital':
						if(!values.discharge.date){
							errors['discharge.date'] = requiredError;
						}
						if(!values.discharge.criteria){
							errors['discharge.criteria'] = requiredError;
						}
						break;
					case 'OccupationalHealthcare':
						if(!values.employerName){
							errors.employerName = requiredError;
						}
						break;
					case 'HealthCheck':
						if(!values.healthCheckRating){
							errors.healthCheckRating = requiredError;
						}
						break;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, errors, touched }) => (
				<Form className='form ui'>
					<div>
						Type
						<Dropdown
							selection
							defaultValue='Hospital'
							options={[
								{
									key: '1',
									text: 'Hospital Visit',
									value: 'Hospital',
								},
								{
									key: '2',
									text: 'Occupational Care',
									value: 'OccupationalHealthcare'
								},
								{
									key: '3',
									text: 'Checkup',
									value: 'HealthCheck'
								}
							]}
							onChange={handleTypeChange}
						/>
					</div>
					Date
					<Field
						id='date'
						placeholder='date'
						name='date'
					/>
					{touched.date && errors.date && <div>{errors.date}</div>}
					Specialist
					<Field
						id='specialist'
						placeholder='specialist'
						name='specialist'
					/>
					{touched.specialist && errors.specialist && <div>{errors.specialist}</div>}
					Description
					<Field
						id='description'
						placeholder='description'
						name='description'
					/>
					{touched.description && errors.description && <div>{errors.description}</div>}
					<DiagnosisSelection
						setFieldValue={setFieldValue}
						setFieldTouched={setFieldTouched}
						diagnoses={Object.values(diagnoses)}
					/>
					<div hidden={formType !== 'Hospital'}>
						Discharge Date
						<Field
							id='dischargeDate'
							placeholder='discharge date'
							name='discharge.date'
						/>
						{touched.discharge?.date && errors.discharge?.date && <div>{errors.discharge.date}</div>}
						Discharge Criteria
						<Field
							placeholder='discharge criteria'
							name='discharge.criteria'
						/>
						{touched.discharge?.criteria && errors.discharge?.criteria && <div>{errors.discharge.criteria}</div>}
					</div>
					<div hidden={formType !== 'OccupationalHealthcare'}>
						Employer Name
						<Field
							id='employer name'
							placeholder='employer name'
							name='employerName'
						/>
						{touched.employerName && errors.employerName && <div>{errors.employerName}</div>}
						Sick leave start	
						<Field
							id='sick leave start date'
							placeholder='sick leave start date'
							name='sickLeave.startDate'
						/>
						{touched.sickLeave?.startDate && errors.sickLeave?.startDate && <div>{errors.sickLeave.startDate}</div>}
						Sick leave end	
						<Field
							id='sick leave end date'
							placeholder='sick leave end date'
							name='sickLeave.endDate'
						/>
						{touched.sickLeave?.endDate && errors.sickLeave?.endDate && <div>{errors.sickLeave?.endDate}</div>}
					</div>
					<div hidden={formType !== 'HealthCheck'}>
						<Field
							id='health check rating'
							name='healthCheckRating'
							component={NumberField}
							min={0}
							max={3}
						/>
						{touched.healthCheckRating && errors.healthCheckRating && <div>{errors.healthCheckRating}</div>}
					</div>
					<Button type='button' onClick={onCancel} color='red'>
						Cancel
					</Button>
					<Button
						type='submit'
						floated='right'
						color='green'
						disabled={!dirty || !isValid}
					>
						Add
					</Button>
				</Form>
			)}
		</Formik>
	); 
};

export default AddEntryForm;