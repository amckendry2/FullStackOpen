import CreateReviewForm from './CreateReviewForm'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../../graphql/mutations'
import { useNavigate } from 'react-router-native'

const CreateReview = () => {

	const [ createReview ] = useMutation(CREATE_REVIEW)
	const navigate = useNavigate()

	const handleSubmitReview = async ({ repositoryName, repositoryOwner, rating, review }) => {
		try {
			const { data } = await createReview({
				variables: {
					review: {
						repositoryName: repositoryName,
						ownerName: repositoryOwner,
						rating: parseInt(rating),
						text: review
					}
				}
			})
			navigate(`/repos/${data.createReview.repository.id}`)
		} catch(err) {
			console.log(err)
		}
	}
	return <CreateReviewForm onSubmit={handleSubmitReview}/>
}

export default CreateReview