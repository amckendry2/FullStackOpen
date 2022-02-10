import { useState } from 'react'
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

const Greeting = ({ name }) => {
	return (
		<View>
			<Text>Hello {name}!</Text>
		</View>
	);
};

describe('Greeting', () => {
	it('renders a greeting message based on the name prop', () => {
		const { getByText } = render(<Greeting name="Kalle" />);

		expect(getByText('Hello Kalle!')).toBeDefined();
	});
});

const Form = ({ onSubmit }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		onSubmit({ username, password });
	};

	return (
		<View>
			<View>
				<TextInput
					value={username}
					onChangeText={(text) => setUsername(text)}
					placeholder="Username"
				/>
			</View>
			<View>
				<TextInput
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Password"
				/>
			</View>
			<View>
				<Pressable onPress={handleSubmit} testID="submitButton">
					<Text>Submit</Text>
				</Pressable>
			</View>
		</View>
	);
};

describe('Form', () => {
	it('calls function provided by onSubmit prop after pressing the submit button', () => {
		const submitTest = jest.fn();
		const { getByPlaceholderText, getByText } = render(<Form onSubmit={submitTest} />);

		fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
		fireEvent.changeText(getByPlaceholderText('Password'), 'password');
		fireEvent.press(getByText('Submit'));

		expect(submitTest).toHaveBeenCalledTimes(1);

		// onSubmit.mock.calls[0][0] contains the first argument of the first call
		expect(submitTest.mock.calls[0][0]).toEqual({
			username: 'kalle',
			password: 'password',
		});
	});
});