import { dedupExchange, fetchExchange } from "urql";
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  // Our GraphQl server
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include" as const, // send cookie
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
  }), ssrExchange, fetchExchange],
});
