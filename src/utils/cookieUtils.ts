import Cookies from 'js-cookie';

/**
 * Access Token을 저장할 Cookie 키 이름
 */
const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Cookie에 Access Token 저장
 *
 * @param token - JWT Access Token
 * @param expiresInHours - 만료 시간 (기본 1시간)
 */
export const setAccessToken = (token: string, expiresInHours: number = 1): void => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: expiresInHours / 24, // js-cookie는 일(day) 단위
    secure: false, // 개발 환경에서는 false (프로덕션에서는 true)
    sameSite: 'Lax',
  });
};

/**
 * Cookie에서 Access Token 읽기
 *
 * @returns Access Token 또는 undefined
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

/**
 * Cookie에서 Access Token 삭제
 */
export const removeAccessToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};
