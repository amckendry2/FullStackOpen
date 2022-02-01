import { useApolloClient } from "@apollo/client"
import { ALL_BOOKS } from "./queries"

export const useAddBookToCache = () => {

	const client = useApolloClient()

	const addBook = addedBook => {
		const dataInStore = client.readQuery({ query: ALL_BOOKS })
		if (dataInStore.allBooks.map(b => b.id).includes(addedBook.id)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: dataInStore.allBooks.concat(addedBook) }
			})
		}
	}
	return addBook
}
