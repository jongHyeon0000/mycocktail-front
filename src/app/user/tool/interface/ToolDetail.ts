import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface ToolDetail {

  /** 도구/기물 ID */
  toolId: number;

  /** 기물명 (영문) */
  toolName: string;

  /** 기물명 (한글) */
  toolNameKr: string;

  /** 기물 분류 */
  toolCategory: string;

  /** 재질 */
  material: string;

  /** 썸네일 이미지 */
  image?: string;

  /** 설명 */
  notes?: string;

  /** 프로필 설명 */
  profileNotes?: string;

  /** 사용 시기에 대한 설명 */
  whenToUseNotes?: string;

  /** 추천 제품 */
  recommendedProducts?: string;

  /** 대체 가능한 도구 */
  alternativeTools?: string;

  /** 등록일 */
  createAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;

  /** 관련 칵테일 */
  availableCocktails: Array<CommonSlideElement>;
}