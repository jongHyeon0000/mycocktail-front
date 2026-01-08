import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface TechniqueDetail {

  /** 기법 ID */
  techniqueId: number;

  /** 기법명 (영문) */
  techniqueName: string;

  /** 기법명 (한글) */
  techniqueNameKr: string;

  /** 기법 카테고리 */
  techniqueCategory: 'mix' | 'pour' | 'garnish' | 'special';

  /** 설명 */
  notes: string | null;

  /** 사용 시기에 대한 설명 */
  whenToUseNotes: string | null;

  /** 희석 정도 */
  dilutionLevel: 'none' | 'low' | 'medium' | 'high';

  /** 공기 주입 정도 */
  aerationLevel: 'none' | 'low' | 'medium' | 'high';

  /** 온도 변화 */
  temperatureChange: 'none' | 'chill' | 'warm';

  /** 등록일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;

  /** 썸네일 이미지 */
  image?: string;

  /** 관련 칵테일 */
  availableCocktails: CommonSlideElement[];
}