import { NativeRouter } from 'react-router-native';
import { ApolloProvider} from '@apollo/client'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient';
import AuthStorageContext from './src/utils/contexts/AuthStorageContext'
import authStorage from './src/utils/authStorage'

const apolloClient = createApolloClient(authStorage())

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage()}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}

export default App;