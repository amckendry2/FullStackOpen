import Constants from 'expo-constants'
import { Platform } from 'react-native';

const font = Platform.select({
	default: () => 'System',
	ios: () => 'Arial',
	android: () => 'Roboto'
})()

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		navBar: '#25292e',
		navBarTabText: 'white',
		separator: 'lightgrey'
	},
	nub: {
		backgroundColor: '#0366d6',
		flexGrow: 0,
		borderRadius: 5,
		padding: 5,
		color: 'white',
		overflow: 'hidden',
		alignSelf: 'flex-start',
		marginTop: 8
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: font
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
	spacing: {
		navBar: Constants.statusBarHeight,
		imageHeight: 50,
		imageWidth: 50,
		separator: 10,
		headerPadding: 5
	}
};

export default theme;