export interface CocktailDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    // 기본 정보
    image?: string;
    englishName: string;
    koreanName: string;
    category: string;
    alcoholContent: number;
    difficulty: 'easy' | 'medium' | 'hard';
    isVariant: boolean;
    profileDescription: string;

    // 상세 정보 (HTML 텍스트 에리어)
    history: string;
    recipe: string;
    tips: string;

    // 재료 정보 (슬라이드 형태)
    ingredients: {
      spirits: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      juices: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      bitters: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      syrups: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      carbonated: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      dairy: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      garnishes: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      others: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
    };

    // 제조 기법 정보 (슬라이드 형태)
    techniques: {
      tools: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      glassware: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      methods: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>;
      servingStyle: string;
    };

    // 개인적인 정보
    personalDescription?: string;
    personalTips?: string;
    personalReview?: string;

    // 소셜 정보
    hashtags: string[];       // 해시태그
    comments: Array<{        // 댓글 및 답글
      id: number;
      author: string;
      content: string;
      date: string;
      replies?: Array<{
        id: number;
        author: string;
        content: string;
        date: string;
      }>;
    }>;

    // 하단 정보
    likeCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
    isLiked?: boolean;
  };
}
