import { ApolloClient, createHttpLink, InMemoryCache, from, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import "firebase/auth";
import { Storage } from "@capacitor/storage";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { setMinAppVersion, currAppVersion, minAppVersionVar as currMinAppVersion } from "utils/update/update";
import { captureException } from "ErrorLogger";
import { GraphQLError } from "graphql";
import firebase from "../Firebase";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HUMBL_DATA_URL,
  // credentials: 'same-origin',
});

const error = onError(({ operation, networkError, graphQLErrors, response }) => {
  trackEvent(EVENTS.API_ERROR, {
    operation,
    networkError,
    graphQLErrors,
  });
  if (networkError) {
    captureException(networkError);
  }

  if (graphQLErrors) {
    graphQLErrors.forEach((e) => {
      const sentryError = new Error();
      const name = e.extensions?.code ?? e.message;
      sentryError.name = name;
      sentryError.message = e.message;
      captureException(sentryError, generateGraphQLErrorMeta(e));
    });
  }

  if (response?.errors) {
    // eslint-disable-next-line no-param-reassign
    response.errors = response.errors.map((err) => ({
      ...err,
      humblErrorCode: err.extensions?.code,
    }));
  }
});

function generateGraphQLErrorMeta(graphqlError: GraphQLError) {
  return Object.entries(graphqlError).reduce((curr, next) => {
    const [k, v] = next;
    // Ignore message since we use that as the main error text anyways.
    if (k !== "message") {
      try {
        curr[k] = JSON.stringify(v);
      } catch (e) {
        captureException(e);
      }
    }

    return curr;
  }, {} as Record<string, string>);
}

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from firebase if it exists
  const token = await firebase.auth().currentUser?.getIdToken();
  // return the headers to the context so httpLink can read them
  Storage.migrate();
  const accountId = await Storage.get({ key: "defaultAccountId" });
  const headerObject = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
    version: currAppVersion,
  };
  // If we have a default account in local storage to work with, send it along
  if (accountId.value) {
    headerObject.account = accountId.value;
  }
  return {
    headers: headerObject,
  };
});

const responseLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
    const context = operation.getContext();
    const minAppVersion: string = context?.response?.headers?.get("minimum-app-version") ?? "";

    if (minAppVersion !== currMinAppVersion()) {
      setMinAppVersion(minAppVersion);
    }

    return response;
  }));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_HUMBL_DATA_URL,
  link: from([error, authLink, responseLink.concat(httpLink)]),
  defaultOptions: { query: { fetchPolicy: "cache-first" } },
});

export default client;
