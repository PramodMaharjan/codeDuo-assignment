import { useEffect, useState } from "react";
import axios from "axios";

import { ListItem } from "../types/types";

interface ApiResponse {
  results: ListItem[];
}

interface AxiosHookResponse {
  data: ListItem[] | null;
  error: string | null;
  isLoading: boolean;
}

const options = {
  method: "GET",
};

export const useAxios = (url: string): AxiosHookResponse => {
  const [data, setData] = useState<ListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(url, {
          ...options,
          cancelToken: source.token,
        });

        if (response.status !== 200) {
          throw new Error("Network Error!!!");
        }

        setData(response.data.results);
        setIsLoading(false);
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, error, isLoading };
};
