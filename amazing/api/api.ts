import axios from 'axios';

import { APICancelToken, APIConfiguration, APIFactory } from './types';

/** Cached API factory results so that we only build them once */
const factoryCache: Record<string, ReturnType<APIFactory<any>>> = {};

/** The API configuration. Must be initialized with init(). */
let configuration: APIConfiguration | undefined;

/** Sets an API factory as being able to be built without configuration */
const SKIP_CONFIGURATION = true;

/**
 * The list of available APIs
 *
 * We use getters so that we lazy build the APIs when they are first used given
 * that the required API configuration is set async at runtime through init().
 */
export default {
  get apiFactory() {
    return build('cenasApi', cenasApi);
  },
};

/** Initializes the APIs required configuration */
export function init(
  args: Omit<APIConfiguration, 'httpClient' | 'sessionToken'>
) {
  const sessionToken = cookies.get('token') ?? null;

  configuration = {
    httpClient: axios.create({
      params: {
        session_token: sessionToken,
      },
    }),
    sessionToken,
  };
}

/** Builds an API from its factory or returns it from cache */
function build<T>(
  cacheKey: string,
  factory: APIFactory<T>,
  skipConfiguration?: boolean
): T {
  if (factoryCache[cacheKey]) {
    return factoryCache[cacheKey];
  }

  if (configuration || skipConfiguration) {
    return (factoryCache[cacheKey] = factory(configuration));
  }

  throw new Error(
    `error: API has not been initialized, cannot build ${factory.name}!`
  );
}

export const getCancelToken = (): APICancelToken => {
  return axios.CancelToken.source();
};
