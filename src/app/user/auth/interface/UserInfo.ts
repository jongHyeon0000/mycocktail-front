export interface UserInfo {

  /** 유저 ID */
  userId: number;

  /** 이메일 */
  email: string;

  /** 활성 여부 */
  isActive: boolean;

  /** 탈퇴 여부 */
  isDeleted: boolean;

  /** 가입일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;

  /** 비활성 업데이트일 */
  deactivatedAt?: string;

  /** 탈퇴 업데이트일 */
  deletedAt?: string;

  /** 유저명 */
  username: string;

  /** 성별 */
  gender?: string;

  /** 생일 */
  birthDate?: string;

  /** 자기소개 */
  profileNotes?: string;

  /** 썸네일 이미지 */
  thumbnailImage?: string;
}
