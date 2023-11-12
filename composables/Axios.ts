import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const Authentication = async <T>(
  url: string,
  data: any,
  options?: AxiosRequestConfig,
  onResponseError?: (error: AxiosError) => void
): Promise<AxiosResponse<T> | undefined> => {
  const runtimeConfig = useRuntimeConfig();

  try {
    const response = await axios({
      url: url,
      method: data?.method || "POST",
      baseURL: runtimeConfig.public.authBaseURL,
      headers: {
        ...(options?.headers || {}),
      },
      data: data?.data,
      ...options,
    });

    return response;
  } catch (error) {
    console.error(error);
    if (onResponseError) {
      onResponseError(error);
    }
    if (error.response) {
      return error.response; // Return the error response
    }
    return undefined;
  }
};

export const useApi = async <T>(
  url: string,
  data: any,
  options?: AxiosRequestConfig,
  onResponseError?: (error: AxiosError) => void
): Promise<AxiosResponse<T> | undefined> => {
  const runtimeConfig = useRuntimeConfig();

  try {
    const response = await axios({
      url: url,
      method: data?.method || "POST",
      baseURL: runtimeConfig.public.apiBaseURL,
      headers: {
        ...(options?.headers || {}),
      },
      data: data?.data,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (onResponseError) {
      onResponseError(error);
    }
    if (error.response) {
      return error.response; // Return the error response
    }
    return undefined;
  }
};
