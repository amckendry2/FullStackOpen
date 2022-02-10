import { useQuery } from '@apollo/client'
import React from 'react'
import { Linking, FlatList } from 'react-native'
import RepositoryItem from './RepositoryItem'
import { GET_SINGLE_REPOSITORY } from '../../graphql/queries'
import { useParams } from 'react-router-native'
import ReviewItem from './ReviewItem'
import ItemSeparator from '../ItemSeparator'

const SingleRepo = () => {

	const { id } = useParams()
	
	const { data, fetchMore, loading } = useQuery(GET_SINGLE_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: {
			reviewsFirst: 3,
			repositoryId: id
		}
	})

	if(!data){
		return null
	}

	const repoInfo = data.repository

	const repoReviews = repoInfo.reviews.edges.map(e => e.node)

	const handleOpenGithub = () => {
		Linking.openURL(repoInfo.url)
	}

	const handleFetchMore = () => {
		console.log("try fetch", repoInfo.reviews.pageInfo.hasNextPage)
		if(!loading && repoInfo.reviews.pageInfo.hasNextPage){
			fetchMore({
				variables: {
					repositoryId: id,
					reviewsAfter: repoInfo.reviews.pageInfo.endCursor
				}
			})
		}
	}

	const repoItem = (
		<RepositoryItem
			item={repoInfo}
			handleOpenGithub={handleOpenGithub}
			singleView
		/>
	)


	return (
		<FlatList
			data={repoReviews}
			renderItem={({ item }) => <ReviewItem review={item}/>}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={repoItem}
			ItemSeparatorComponent={ItemSeparator}
			onEndReached={handleFetchMore}
			onEndReachedThreshold={.5}
		/>
	)
		
}

export default SingleRepo