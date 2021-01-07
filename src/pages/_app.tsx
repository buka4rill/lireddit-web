import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';


/**
 * Exchange-graphcache is set up to upadate the Cache 
 * on Mutation requests
 */

// Helper function to cast types
function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}


// URQL client instance
const client = createClient({
  // Our GraphQl server
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include", // send cookie
  },
  // Update the cache
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          // update me query, return null
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({ me: null })
          );
        },
        login: (_result, args, cache, info) => {
          // cache.updateQuery({ query: MeDocument }, data => {
          //   data?.value = 5
          // })

          betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
            // If error...return current query (do nothing) else return user
            if (result.login.errors) return query
              else return { me: result.login.user };
          });
        },

        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
            // If error...return current query (do nothing) else return user
            if (result.register.errors) return query
              else return { me: result.register.user };
          });
        },
      }
    }
  }), fetchExchange],
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
