export interface CocktailDetail{
  cocktailId: number;
  image?: string;
  cocktailName: string;
  cocktailNameKr: string;
  category: string;
  abs_percentage: number;
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
    spirits: Array<{ id: number; image?: string; spiritName: string; spiritNameKr: string; }>;
    juices: Array<{ id: number; image?: string; juiceName: string; juiceNameKr: string; }>;
    bitters: Array<{ id: number; image?: string; bitterName: string; bitterNameKr: string; }>;
    syrups: Array<{ id: number; image?: string; syrupName: string; syrupNameKr: string; }>;
    carbonated: Array<{ id: number; image?: string; carbonatedName: string; carbonatedNameKr: string; }>;
    dairy: Array<{ id: number; image?: string; dairyName: string; dairyNameKr: string; }>;
    garnishes: Array<{ id: number; image?: string; garnishName: string; garnishNameKr: string; }>;
    others: Array<{ id: number; image?: string; otherIngredientName: string; otherIngredientNameKr: string; }>;
  };

  // 도구/기물
  tools: Array<{ id: number; image?: string; toolName: string; toolNameKr: string; }>;

  // 잔
  glassware: Array<{ id: number; image?: string; glassName: string; glassNameKr: string; }>;

  // 제조 기법
  techniques: Array<{ id: number; image?: string; techniqueName: string; techniqueNameKr: string; }>;

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