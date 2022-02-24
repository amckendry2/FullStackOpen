import { useQuery, useMutation } from '@apollo/client'
import { FlatList, Alert } from 'react-native'
import { GET_ME } from '../../graphql/queries'
import ReviewItem from '../RepositoryList/ReviewItem'
import ItemSeparator from '../ItemSeparator'
import { DELETE_REVIEW } from '../../graphql/mutations'

const MyReviews = () => {

	const [deleteReview] = useMutation(DELETE_REVIEW)

	const { data: myReviews, refetch } = useQuery(GET_ME, {
		fetchPolicy: 'cache-and-network',
		variables: {
			includeReviews: true
		}
	})

	if(!myReviews){
		return null
	}

	const reviewsData = myReviews.me.reviews.edges.map(e => e.node)

	const handleDelete = id => {
		Alert.alert(
			"Delete Review",
			"are you sure you want to delete this review?",
			[
				{
					text: "CANCEL",
					onPress: () => console.log("cancel")
				},
				{
					text: "OK",
					onPress: async () => {
						try {
							await deleteReview({
								variables: {
									deleteReviewId: id
								}
							})
							refetch()
						} catch (err) {
							console.log(err)
						}
					}
				}
			]
		)
	}

	return (
		<FlatList
			data={reviewsData}	
			renderItem={({ item }) => <ReviewItem review={item} handleDelete={handleDelete} userView/>}
			ItemSeparatorComponent={ItemSeparator}
		/>
	)
}

export default MyReviews