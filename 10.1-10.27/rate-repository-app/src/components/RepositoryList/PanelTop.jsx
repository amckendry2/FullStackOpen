import {View, Image, StyleSheet } from 'react-native'
import ThemedText from '../ThemedText';
import theme from '../../theme';

const style = StyleSheet.create({
	panelTop: {
		display: 'flex',
		flexDirection: 'row',
	},
	avatarImage:{
		height: theme.spacing.imageHeight,
		width: theme.spacing.imageWidth,
		borderRadius: 10
	},
	header:{
		marginLeft: 20,
	},

})

const PanelTop = ({ imageUrl, title, description, language }) => (
	<View testID='panelTop' style={style.panelTop}>
		<Image
			style={style.avatarImage}
			source={{ uri: imageUrl }}
		/>
		<View style={style.header}>
			<ThemedText
				fontWeight='bold'
				fontSize={'subheading'}
				withPadding
			>
				{title}
			</ThemedText>
			<ThemedText
				color='textSecondary'
			>
				{description}
			</ThemedText>
			<View style={theme.nub}>
				<ThemedText style={{color: 'white'}}>
					{language}
				</ThemedText>
			</View>
		</View>
	</View>

)

export default PanelTop;