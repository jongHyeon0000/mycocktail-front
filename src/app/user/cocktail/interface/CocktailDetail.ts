import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface CocktailDetail {

  /** 칵테일 ID */
  cocktailId: number;

  /** 썸네일 이미지 */
  image?: string;

  /** 칵테일명 */
  cocktailName: string;

  /** 칵테일명 (한글) */
  cocktailNameKr: string;

  /** 카테고리 */
  category: string;

  /** 예상 도수 */
  absPercentage: number;

  /** 난이도 (1~5) */
  difficulty: number;

  /** 변형 레시피 여부 */
  isVariation: boolean;

  /** 프로필 설명 */
  profileNote?: string;

  /** 신규 여부 */
  isNew: boolean;

  /** 역사 설명 */
  historyNote?: string;

  /** 설명 */
  note?: string;

  /** 제조 팁 */
  tip_note?: string;

  /** 재료 정보 */
  ingredients: {
    /** 기주 */
    spirits: Array<CommonSlideElement>;
    /** 주스 */
    juices: Array<CommonSlideElement>;
    /** 비터스 */
    bitters: Array<CommonSlideElement>;
    /** 시럽 */
    syrups: Array<CommonSlideElement>;
    /** 탄산 음료 */
    carbonated: Array<CommonSlideElement>;
    /** 유제품/크림 */
    dairy: Array<CommonSlideElement>;
    /** 가니쉬 */
    garnishes: Array<CommonSlideElement>;
    /** 기타 재료 */
    others: Array<CommonSlideElement>;
  };

  /** 도구 */
  tools: Array<CommonSlideElement>;

  /** 잔 */
  glassware: Array<CommonSlideElement>;

  /** 제조 기법 */
  techniques: Array<CommonSlideElement>;

  /** 개인적인 설명 */
  personalNotes?: string;

  /** 개인적인 팁 */
  MakerTips?: string;

  /** 개인적인 후기 */
  personalReview?: string;

  /** 해시태그 */
  hashtags: {
    cocktailHashtagId: number,
    cocktailHashtag: string
  };

  /** 좋아요 수 */
  likeCount: number;

  /** 공유된 수 */
  shareCount: number;

  /** 댓글 및 답글 */
  comments: Array<{
    id: number;
    username: string;
    content: string;
    createdDate: string;
    replies?: Array<{
      id: number;
      username: string;
      content: string;
      createdDate: string;
    }>;
  }>;

  /** 등록일 */
  createAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;
}