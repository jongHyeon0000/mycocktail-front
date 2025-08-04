export interface SpiritProductDetail {
  spiritProductId: number;
  image?: string;
  spiritName: string;
  spiritNameKr: string;
  absPercentage: number;
  volumeMl: number;

  isDiscontinued: boolean;
  price: number;

  sweetness: number;
  citrus: number;
  herbal: number;

  /*
  * 기주 카테고리 (상위 table)
  * */
  spirit: {
    spiritId: string;
    spiritName: string;
    spiritNameKr: string;
  }

  /*
  * 브랜드
  * */
  brand: {
    brandId: number;
    brandName: string;
    brandNameKr: string;
  }

  /*
  * 원산지 국가
  * */
  country: {
    countryId: number;
    countryName: string;
    countryNameKr: string;
  }

  profileNote?: string;

  // 상세 정보 (HTML 텍스트 에리어)
  historyNote?: string;
  note?: string;
  personalReview?: string;

  // 사용 가능한 칵테일
  availableCocktails: Array<{ id: number; image?: string; cocktailName: string; cocktailNameKr: string; }>;

  // 등록 / 업데이트 일
  createAt: string;
  updatedAt: string;
}