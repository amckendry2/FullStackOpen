import SignInForm from '../../components/SignIn/SignInForm'
import { render, fireEvent, waitFor } from '@testing-library/react-native'


describe('SignIn', () => {
	it('calls onSubmit with the correct arguments', async () => {
		const submitTest = jest.fn()
		const { getByPlaceholderText, getByTestId } = render(<SignInForm onSubmit={submitTest} />)
		fireEvent.changeText(getByPlaceholderText('username'), 'testUsername')
		fireEvent.changeText(getByPlaceholderText('password'), 'testPassword')
		fireEvent.press(getByTestId('submitButton'))
		await waitFor(() => {
			expect(submitTest).toHaveBeenCalledTimes(1)
			expect(submitTest.mock.calls[0][0]).toEqual({
				username: 'testUsername',
				password: 'testPassword'
			})
		})
	})
})