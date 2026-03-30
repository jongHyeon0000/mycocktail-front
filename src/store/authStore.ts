import { create } from 'zustand';
import type { UserInfo } from '../app/user/auth/interface/UserInfo';
import { getAccessToken } from '../utils/cookieUtils';

/**
 * 인증 상태 관리 Store (Zustand)
 */
interface AuthStore {
  /** 현재 로그인한 사용자 정보 (null이면 미인증) */
  user: UserInfo | null;

  /** 앱 초기화 완료 여부 (Cookie → /api/auth/me 검증 후 true) */
  isInitialized: boolean;

  /** 사용자 정보 설정 (로그인 시 호출) */
  setUser: (user: UserInfo | null) => void;

  /** 앱 초기화 완료 처리 */
  setInitialized: () => void;

  /** 로그아웃 (사용자 정보 초기화) */
  logout: () => void;
}

/**
 * Auth Store 생성
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setInitialized: () => set({ isInitialized: true }),
  logout: () => set({ user: null }),
}));

/**
 * 인증 여부 확인 헬퍼 함수
 *
 * - Cookie의 accessToken 유무로 판단
 * - user 정보도 있어야 완전히 인증된 것으로 판단
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  const user = useAuthStore.getState().user;

  return token !== undefined && user !== null;
};
