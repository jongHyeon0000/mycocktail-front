import { useState } from "react";
import { api } from "../../../../config/axios/AxiosConfig.ts";
import type { ApiResponse } from "../../../../config/axios/interface/ApiResponse.ts";
import { useAuthStore } from "../../../../store/authStore.ts";
import { setAccessToken } from "../../../../utils/cookieUtils.ts";
import type {LoginRequestBody} from "../interface/LoginRequestBody.ts";
import type {LoginResponseData} from "../interface/LoginResponseData.ts";
import { toApiResponse } from "../../../../config/axios/utils/toApiResponse.ts";

/**
 * 로그인 커스텀 훅
 *
 * - POST /api/auth/login 호출
 * - 성공 시: Cookie에 토큰 저장 + Zustand Store에 사용자 정보 저장
 */
const useLogin = () => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);

  /**
   * 로그인 함수
   *
   * @param credentials - 이메일과 비밀번호
   * @returns ApiResponse (code === 'OK'이면 성공)
   */
  const login = async (credentials: LoginRequestBody): Promise<ApiResponse<LoginResponseData | null>> => {
    setIsLoginLoading(true);

    try {
      const response = await api.post<ApiResponse<LoginResponseData>>('/api/auth/login', credentials);

      if (response.data.code === 'OK') {
        const { accessToken, user } = response.data.data;

        // 1. Cookie에 토큰 저장 (1시간 만료)
        setAccessToken(accessToken, 1);

        // 2. Zustand Store에 사용자 정보 저장
        setUser(user);
      }

      return response.data;
    } catch (err) {
      return toApiResponse<LoginResponseData>(err);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return {
    login,
    isLoginLoading,
  };
};

export default useLogin;
