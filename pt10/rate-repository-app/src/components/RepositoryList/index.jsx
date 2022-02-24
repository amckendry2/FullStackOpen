import useRepositories from '../../hooks/useRepositories'
import RepositoryListContainer from './RespositoryListContainer'
import { useState } from 'react'

const RepositoryList = () => {

	const [orderBy, setOrder] = useState('CREATED_AT')
	const [orderDirection, setDirection] = useState('DESC')
	const [searchKeyword, setKeyword] = useState('')

	const { repositories, fetchMore } = useRepositories({ 
		first: 4,
		orderBy, 
		orderDirection, 
		searchKeyword
	})

	const handleEndReach = () => {
		fetchMore()
	}

	return (
		<RepositoryListContainer
			repos={repositories} 
			setOrder={setOrder}
			setDirection={setDirection}
			setKeyword={setKeyword}
			onEndReach={handleEndReach}
		/>
	)

}

export default RepositoryList