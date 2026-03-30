import { isAxiosError } from "axios";
import type { ApiResponse } from "../interface/ApiResponse.ts";

export const toApiResponse = <T>(err: unknown): ApiResponse<T | null> => {
  if (isAxiosError(err) && err.response?.data) {
    return err.response.data as ApiResponse<T | null>;
  }

  return {
    code: 'NETWORK_ERROR',
    message: '네트워크 오류가 발생했습니다.',
    data: null,
  };
};
