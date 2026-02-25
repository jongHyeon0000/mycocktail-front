import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface SpiritProductDetail {

  /** 개별 기주 ID */
  spiritProductId: number;

  /** 썸네일 이미지 */
  image?: string;

  /** 제품명 */
  spiritName: string;

  /** 제품명 (한글) */
  spiritNameKr: string;

  /** 도수 */
  absPercentage: number;

  /** 용량 (ml) */
  volumeMl: number;

  /** 단종 여부 */
  isDiscontinued: boolean;

  /** 가격 */
  price: number;

  /** 단맛 레벨 (1~5) */
  sweetness: number;

  /** 시트러스 레벨 (1~5) */
  citrus: number;

  /** 허브 (1~5) */
  herbal: number;

  /** 매움 (1~5) */
  spicy: number;

  /** 기주 카테고리 */
  spirit: {
    spiritId: string;
    spiritName: string;
    spiritNameKr: string;
  }

  /** 브랜드 */
  brand: {
    brandId: number;
    brandName: string;
    brandNameKr: string;
  }

  /** 원산지 국가 */
  country: {
    countryId: number;
    countryName: string;
    countryNameKr: string;
  }

  /** 프로필 설명 */
  profileNote?: string;

  /** 역사 설명 */
  historyNote?: string;

  /** 설명 */
  note?: string;

  /** 개인 후기 */
  personalReview?: string;

  /** 사용 가능한 칵테일 */
  availableCocktails: Array<CommonSlideElement>;

  /** 등록일 */
  createAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;
}