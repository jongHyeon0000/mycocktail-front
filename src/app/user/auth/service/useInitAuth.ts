import { useEffect } from 'react';
import { api } from '../../../../config/axios/AxiosConfig.ts';
import type { ApiResponse } from '../../../../config/axios/interface/ApiResponse.ts';
import { useAuthStore } from '../../../../store/authStore.ts';
import { getAccessToken } from '../../../../utils/cookieUtils.ts';
import type { UserInfo } from '../interface/UserInfo.ts';

/**
 * 앱 초기화 시 Cookie 토큰으로 Zustand 인증 상태를 복원하는 훅
 *
 * - Cookie에 토큰이 있으면 GET /api/auth/me 호출 → 성공 시 Zustand setUser
 * - Cookie에 토큰이 없으면 바로 isInitialized = true (비로그인 상태)
 * - 단 한 번만 실행 (마운트 시)
 */
const useInitAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      setInitialized();
      return;
    }

    api.get<ApiResponse<UserInfo>>('/api/auth/me')
      .then((response) => {
        if (response.data.code === 'OK') {
          setUser(response.data.data);
        }
      })
      .catch(() => {
        // 토큰 무효 → Axios 인터셉터에서 쿠키 삭제 및 logout 처리
      })
      .finally(() => {
        setInitialized();
      });
  }, []);
};

export default useInitAuth;
