import type {CommonSlideElement} from "../../../common/interface/CommonSlideElement.ts";

export interface CarbonatedDetail {

  /** 탄산/소다 ID */
  carbonatedId: number;

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

  /** 탄산/소다명 (영문) */
  carbonatedName: string;

  /** 탄산/소다명 (한글) */
  carbonatedNameKr: string;

  /** 당도 (1~5) */
  sugarLevel: number;

  /** 설명 */
  notes: string | null;

  /** 유통기한 (일수) */
  shelfLifeDays: number | null;

  /** 보관방법 */
  storageType: string | null;

  /** 사용 시기 */
  whenToUseNotes: string | null;

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