import type {CommonSlideElement} from "../../../common/interface/CommonSlideElement.ts";

export interface DairyCreamDetail {

  /** 유제품/크림 ID */
  dairyCreamId: number;

  /** 브랜드 ID */
  brandId: number;

  /** 브랜드명 */
  brandName: string;

  /** 브랜드명 (한글) */
  brandNameKr?: string;

  /** 원산지 국가 ID */
  countryId: number;

  /** 원산지 국가명 */
  countryName: string;

  /** 원산지 국가명 (한글) */
  countryNameKr?: string;

  /** 유제품/크림명 (영문) */
  dairyCreamName: string;

  /** 유제품/크림명 (한글) */
  dairyCreamNameKr: string;

  /** 지방 함량 */
  fatContent: number | null;

  /** 유제품 프리 여부 */
  isDairyFree: boolean;

  /** 사용 시기 */
  whenToUseNotes: string | null;

  /** 설명 */
  notes: string | null;

  /** 보관방법 */
  storageType: string | null;

  /** 유통기한 (일수) */
  shelfLifeDays: number | null;

  /** 대체 가능한 것에 대한 설명 */
  substituteNotes: string | null;

  /** 등록일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;

  /** 썸네일 이미지 */
  image?: string;

  /** 관련 칵테일 */
  availableCocktails: CommonSlideElement[];
}
