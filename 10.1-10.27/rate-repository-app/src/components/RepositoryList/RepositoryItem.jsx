import { View, StyleSheet, Pressable } from 'react-native'
import PanelTop from './PanelTop'
import PanelBottom from './PanelBottom'
import theme from '../../theme'
import ThemedText from '../ThemedText'
import { useNavigate } from 'react-router-native'
import ItemSeparator from '../ItemSeparator'

const style = StyleSheet.create({
	panel: {
		padding: 10,
	},
})

const RepositoryItem = ({ item, singleView, handleOpenGithub }) => {

	const navigate = useNavigate()

	return (
		<>
		<Pressable 
			onPress={() => navigate(`/repos/${item.id}`)}
			disabled={singleView}
		>
		<View testID='repositoryItem' style={style.panel}>
			<PanelTop
				imageUrl={item.ownerAvatarUrl}
				title={item.fullName}
				description={item.description}
				language={item.language}
			/>
			<PanelBottom
				stars={item.stargazersCount}
				forks={item.forksCount}
				reviews={item.reviewCount}
				rating={item.ratingAverage}
			/>
			{singleView
				? (
					<View style={{
						...theme.nub,
						position: 'relative',
						width: 250,
						height: 30,
						justifyContent: 'center'
					}}>
						<Pressable onPress={handleOpenGithub}>
							<ThemedText style={{ color: 'white', textAlign: 'center' }}>
								Open in GitHub
							</ThemedText>
						</Pressable>
					</View>
				)
				: null
			}
		</View>
		</Pressable>
		{singleView ? <ItemSeparator/> : null}
		</>
	)
}

export default RepositoryItem