import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme';
import { Provider, createClient } from 'urql';

const client = createClient({
  // Our GraphQl server
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include", // send cookie
  }
});

function MyApp({ Component, pageProps }: any) {
  return (
    // URQL Provider
    <Provider value={client}> 
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
    
  )
}

export default MyApp
