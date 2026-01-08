import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface CocktailDetail{
  cocktailId: number;
  image?: string;
  cocktailName: string;
  cocktailNameKr: string;
  category: string;
  absPercentage: number;
  difficulty: number;
  isVariation: boolean;
  profileNote?: string;
  isNew: boolean;

  // 상세 정보 (HTML 텍스트 에리어)
  historyNote?: string;
  note?: string;
  tip_note?: string;

  // 재료 정보 (슬라이드 형태)
  ingredients: {
    spirits: Array<CommonSlideElement>;
    juices: Array<CommonSlideElement>;
    bitters: Array<CommonSlideElement>;
    syrups: Array<CommonSlideElement>;
    carbonated: Array<CommonSlideElement>;
    dairy: Array<CommonSlideElement>;
    garnishes: Array<CommonSlideElement>;
    others: Array<CommonSlideElement>;
  };

  // 도구/기물
  tools: Array<CommonSlideElement>;

  // 잔
  glassware: Array<CommonSlideElement>;

  // 제조 기법
  techniques: Array<CommonSlideElement>;

  // 개인적인 정보
  personalNotes?: string;
  MakerTips?: string;
  personalReview?: string;

  // 소셜 정보
  hashtags: {
    cocktailHashtagId: number,
    cocktailHashtag: string
  };

  // 좋아요 수
  likeCount: number;

  // 공유 수
  shareCount: number;

  comments: Array<{        // 댓글 및 답글
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

  // 등록 / 업데이트 일
  createAt: string;
  updatedAt: string;
}