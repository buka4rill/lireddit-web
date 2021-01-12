import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme';


/**
 * Exchange-graphcache is set up to upadate the Cache 
 * on Mutation requests
 */

// Helper function to cast types
// Helper function refactored into the utils folder (betterUpdateQuery)


// // URQL client instance
// const client = createClient({
//   // Our GraphQl server
//   url: 'http://localhost:4000/graphql',
//   fetchOptions: {
//     credentials: "include", // send cookie
//   },
//   // Update the cache
//   // Bulk of the createClient code has been refactored into 
//   // the utils folder
// });

function MyApp({ Component, pageProps }: any) {
  return (
    // URQL Provider
    // <Provider value={client}> 
      
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    
    // </Provider>
    
  )
}

export default MyApp;
