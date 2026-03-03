import type {UserInfo} from "./UserInfo.ts";

/**
 * 로그인 응답 데이터
 */
export interface LoginResponseData {
  /** Access Token (JWT) */
  accessToken: string;
  /** 사용자 정보 */
  user: UserInfo;
}