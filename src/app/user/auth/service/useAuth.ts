import { useMemo } from "react";
import { useAuthStore, isAuthenticated } from "../../../../store/authStore.ts";
import useLogin from "./useLogin.ts";
import useLogout from "./useLogout.ts";

/**
 * 통합 인증 훅
 *
 * - isAuthenticated는 Cookie의 accessToken 유무로 판단 (Single Source of Truth)
 * - 상태 변경은 로그인/로그아웃/API 에러(401/403) 시에만 발생
 */
const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const { login, isLoginLoading } = useLogin();
  const { logout } = useLogout();

  // user 상태 변경 시에만 재계산
  const authenticated = useMemo(() => isAuthenticated(), [user]);

  return {
    /** 현재 로그인한 사용자 정보 (null이면 미인증) */
    user,
    /** 인증 여부 (Cookie의 accessToken 유무로 판단) */
    isAuthenticated: authenticated,
    /** 로그인 함수 */
    login,
    /** 로그아웃 함수 */
    logout,
    /** 로그인 중 여부 */
    isLoginLoading,
  };
};

export default useAuth;
