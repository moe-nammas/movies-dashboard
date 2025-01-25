import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

export interface IApiHandlerParams {
  url: string;
  headers?: AxiosHeaders | undefined;
  method?: Method;
  data?: unknown | undefined;
  token: string | null;
}

export interface IApiHandleResponse<T> {
  data: T | null;
  error: AxiosError<unknown, unknown> | null;
}

export const apiHandler = async <T,>({
  url,
  headers,
  method = 'GET',
  data,
  token,
}: IApiHandlerParams): Promise<IApiHandleResponse<T>> => {
  try {
    const predefinedHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Language': 'en',
    };
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: `${process.env.REACT_APP_BASE_URL}${url}`,
      data,
      headers: { ...predefinedHeaders, ...headers },
    };
    const { data: response }: AxiosResponse<T> = await axios(axiosConfig);
    return { data: response, error: null };
  } catch (error) {
    return {
      data: (error as AxiosError<T>).response?.data ?? null,
      error: error as AxiosError,
    };
  }
};
