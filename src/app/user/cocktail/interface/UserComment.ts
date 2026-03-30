export interface UserComment {

  /** 댓글 ID */
  commentId: number;

  /** 칵테일 ID */
  cocktailId: number;

  /** 칵테일명 (영문) */
  cocktailName: string;

  /** 칵테일명 (한글) */
  cocktailNameKr: string;

  /** 칵테일 썸네일 이미지 */
  cocktailImage?: string;

  /** 댓글 내용 */
  content: string;

  /** 답글 여부 */
  isChildComment: boolean;

  /** 부모 댓글 ID (답글인 경우) */
  parentCommentId?: number;

  /** 등록일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;
}
