import {View, StyleSheet } from 'react-native'
import ThemedText from '../ThemedText';

const style = StyleSheet.create({
	panel: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20
	},
	pair: {
		paddingHorizontal: 10,
		textAlign: 'center' 
	}
})

const InfoPair = ({ top, bottom }) => (
	<View style={style.pair}>
		<ThemedText 
			fontWeight='bold' 
			fontSize='subheading'
			withPadding
		>
			{top}
		</ThemedText>
		<ThemedText>
			{bottom}
		</ThemedText>
	</View>
)

const intToK = (num) => num >= 1000 ? (num/1000).toFixed(1) + 'k' : num



const PanelBottom = ( { stars, forks, reviews, rating }) => {

	return (
		<View style={style.panel}>
			<InfoPair top={intToK(stars)} bottom='Stars' />
			<InfoPair top={intToK(forks)} bottom='Forks' />
			<InfoPair top={intToK(reviews)} bottom='Reviews' />
			<InfoPair top={intToK(rating)} bottom='Rating' />
		</View>
	)
} 

export default PanelBottom