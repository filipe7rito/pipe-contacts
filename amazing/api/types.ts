import { AxiosInstance, CancelTokenSource } from 'axios';

export type APIConfiguration = {
  sessionToken: string | null;
  httpClient: AxiosInstance;
};

export type APIFactory<T> = (config?: APIConfiguration) => T;

export type APICancelToken = CancelTokenSource;
