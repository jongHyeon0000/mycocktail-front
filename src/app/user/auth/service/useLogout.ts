import { useAuthStore } from "../../../../store/authStore.ts";
import { removeAccessToken } from "../../../../utils/cookieUtils.ts";

/**
 * 로그아웃 커스텀 훅
 *
 * - Cookie에서 토큰 삭제
 * - Zustand Store 사용자 정보 초기화
 */
const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  /**
   * 로그아웃 함수 (래퍼)
   */
  const handleLogout = () => {
    // 1. Cookie에서 토큰 삭제
    removeAccessToken();

    // 2. Zustand Store 사용자 정보 초기화
    logout();
  };

  return {
    logout: handleLogout,
  };
};

export default useLogout;
