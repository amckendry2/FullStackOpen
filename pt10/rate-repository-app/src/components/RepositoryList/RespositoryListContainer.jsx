import { FlatList } from 'react-native'
import ItemSeparator from '../ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker'
import ThemedTextInput from '../ThemedTextInput'
import { useDebouncedCallback } from 'use-debounce'

const RepositoryListContainer = ({ 
	repos, 
	setOrder, 
	setDirection, 
	setKeyword, 
	onEndReach 
}) => {

	const debouncedKeyword = useDebouncedCallback(
		val => setKeyword(val),
		500
	)

	const Sorting = {
		NewAsc: 'NewAsc',
		NewDesc: 'NewDesc',
		AvgAsc: 'AvgAsc',
		AvgDesc: 'AvgDesc'
	}

	const Order = {
		CREATED_AT: 'CREATED_AT',
		RATING_AVERAGE: 'RATING_AVERAGE'
	}

	const Direction = {
		ASC: 'ASC',
		DESC: 'DESC'
	}

	const repoNodes = repos
		? repos.repositories.edges.map(e => e.node)
		: [];

	const handleSortChange = val => {
		switch(val){
			case Sorting.NewAsc:
				setOrder(Order.CREATED_AT)
				setDirection(Direction.ASC)
				return
			case Sorting.NewDesc:
				setOrder(Order.CREATED_AT)
				setDirection(Direction.DESC)
				return
			case Sorting.AvgAsc:
				setOrder(Order.RATING_AVERAGE)
				setDirection(Direction.ASC)
				return
			case Sorting.AvgDesc:
				setOrder(Order.RATING_AVERAGE)
				setDirection(Direction.DESC)
				return
		}	
	}
	
	const pickerHeader = (
		<>
		<ThemedTextInput 
			style={{width: 200, margin: 10}}
			placeholder='seach keyword'
			onChangeText={debouncedKeyword}
		/>
		<Picker 
			style={{height: 30, width: 200, margin: 10}}	
			onValueChange={handleSortChange}>
			<Picker.Item label='Latest repositories' value={Sorting.NewDesc}/>
			<Picker.Item label='Oldest repositories' value={Sorting.NewAsc}/>
			<Picker.Item label='Highest-rated repositories' value={Sorting.AvgDesc}/>
			<Picker.Item label='Lowest-rated repositories' value={Sorting.AvgAsc}/>
		</Picker>
		</>
	)	

	return (
		<FlatList
			data={repoNodes}
			renderItem={(props) => <RepositoryItem {...props}/>}
			keyExtractor={(_, idx) => idx.toString()}
			ItemSeparatorComponent={ItemSeparator}
			ListHeaderComponent={pickerHeader}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.25}
		/>
	)
}

export default RepositoryListContainer