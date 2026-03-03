/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequestBody {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}
