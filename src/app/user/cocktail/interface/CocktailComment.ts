export interface CocktailComment {

  /** 댓글 ID */
  commentId: number;

  /** 작성자 정보 */
  author: {
    userId: number;
    userUuid: string;
    username: string;
    thumbnailImage?: string;
  };

  /** 레시피 ID */
  cocktailId: number;

  /** 부모 댓글 ID (답글인 경우) */
  parentCommentId?: number;

  /** 내용 */
  content: string;

  /** 깊이 */
  depth: number;

  /** 답글 여부 */
  isChildComment: boolean;

  /** 답글 순서 */
  sortOrder: number;

  /** 답글 목록 */
  replies?: Array<CocktailComment>;

  /** 등록일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;
}
