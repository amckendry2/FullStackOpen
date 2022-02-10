import { View, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
	separator: {
		height: theme.spacing.separator,
		backgroundColor: theme.colors.separator 
	}
})
const ItemSeparator = () => <View style={styles.separator}/>

export default ItemSeparator