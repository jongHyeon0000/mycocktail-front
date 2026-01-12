import type {CommonSlideElement} from "../../common/interface/CommonSlideElement.ts";

export interface GlasswareDetail {

  /** 서빙 잔 ID */
  glassId: number;

  /** 서빙 잔명 (영문) */
  glassName: string;

  /** 서빙 잔명 (한글) */
  glassNameKr: string;

  /** 타입 */
  glassType: 'stemmed' | 'tumbler' | 'mug' | 'flute' | 'specialty';

  /** 설명 */
  notes: string | null;

  /** 주요 목적 설명 */
  primaryPurpose: string;

  /** 서빙 스타일 설명 */
  servingStyle: 'straight_up' | 'on_the_rocks' | 'neat' | 'long' | 'hot' | 'frozen' | 'layered';

  /** 평균 온도 유지력 */
  temperatureRetention: 'poor' | 'moderate' | 'good' | 'excellent';

  /** 등록일 */
  createdAt: string;

  /** 최종 업데이트일 */
  updatedAt: string;

  /** 썸네일 이미지 */
  image?: string;

  /** 관련 칵테일 */
  availableCocktails: CommonSlideElement[];
}