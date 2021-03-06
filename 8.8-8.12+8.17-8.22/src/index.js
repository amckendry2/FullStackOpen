import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from '@apollo/client/link/context'
import {
	ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from
} from '@apollo/client'

const authLink = setContext((_, { headers } ) => {
	const token = localStorage.getItem('token')
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null
		}
	}
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000'})
const combinedLink = from([ authLink, httpLink ]) 

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: combinedLink 
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App /> 
	</ApolloProvider>,
	document.getElementById('root')
)