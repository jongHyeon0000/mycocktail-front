export interface ReceivedLike {

  /** 좋아요 ID */
  likeId: number;

  /** 칵테일 ID */
  cocktailId: number;

  /** 칵테일명 (영문) */
  cocktailName: string;

  /** 칵테일명 (한글) */
  cocktailNameKr: string;

  /** 칵테일 썸네일 이미지 */
  cocktailImage?: string;

  /** 좋아요를 누른 유저 */
  likedBy: {
    userId: number;
    username: string;
    thumbnailImage?: string;
  };

  /** 좋아요 등록일 */
  createdAt: string;
}
