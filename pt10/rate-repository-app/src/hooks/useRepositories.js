// import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = variables => {
	const { data, error, fetchMore, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables
	})

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
		if (!canFetchMore) {
			return
		}
		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables
			}
		})
	}

	return { 
		repositories: data, 
		loading, 
		error, 
		fetchMore: handleFetchMore 
	}
}

export default useRepositories