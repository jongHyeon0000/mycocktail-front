import { useState } from "react";
import type { AxiosError } from "axios";
import { api } from "../../../../config/axios/AxiosConfig.ts";
import type { ApiResponse } from "../../../../config/axios/interface/ApiResponse.ts";
import { useAuthStore } from "../../../../store/authStore.ts";
import { setAccessToken } from "../../../../utils/cookieUtils.ts";
import type { UserInfo } from "../interface/UserInfo.ts";
import type {LoginRequestBody} from "../interface/LoginRequestBody.ts";
import type {LoginResponseData} from "../interface/LoginResponseData.ts";

/**
 * 로그인 커스텀 훅
 *
 * - POST /api/auth/login 호출
 * - 성공 시: Cookie에 토큰 저장 + Zustand Store에 사용자 정보 저장
 */
const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<ApiResponse<null> | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  /**
   * 로그인 함수
   *
   * @param credentials - 이메일과 비밀번호
   * @returns 로그인 성공 시 UserInfo, 실패 시 null
   */
  const login = async (credentials: LoginRequestBody): Promise<UserInfo | null> => {
    setIsLoginLoading(true);
    setErrorResponse(null);

    try {
      const response = await api.post<ApiResponse<LoginResponseData>>('/api/auth/login', credentials);

      if (response.status === 200 && response.data.code === 'OK') {
        const { accessToken, user } = response.data.data;

        // 1. Cookie에 토큰 저장 (1시간 만료)
        setAccessToken(accessToken, 1);

        // 2. Zustand Store에 사용자 정보 저장
        setUser(user);

        return user;
      }

      return null;
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse<null>>;
      setErrorResponse(axiosError.response?.data ?? null);
      return null;
    } finally {
      setIsLoginLoading(false);
    }
  };

  return {
    login,
    isLoginLoading,
    errorResponse,
  };
};

export default useLogin;
