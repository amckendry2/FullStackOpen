import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryType } from '../types';
import AddEntryForm, { FormValues } from './AddEntryForm';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (value: FormValues, type: EntryType) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
		<Modal.Header>Add a new entry</Modal.Header>
		<Modal.Content>
			{error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
		</Modal.Content>
	</Modal>	
);

export default AddEntryModal;