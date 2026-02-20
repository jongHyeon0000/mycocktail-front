/*
 * 당도 레벨 맵핑 객체
 */
export const SUGAR_LEVEL_MAP = {
  1: '매우 낮음',
  2: '낮음',
  3: '보통',
  4: '높음',
  5: '매우 높음'
} as const;

/*
 * 당도 레벨 키 타입 추출
 */
export type SUGAR_LEVEL_MAP_KEY = keyof typeof SUGAR_LEVEL_MAP;

/*
 * 당도 레벨 숫자를 한글로 변환 함수
 */
export const getSugarLevelKorean = (level: number): string => {
  return SUGAR_LEVEL_MAP[level as SUGAR_LEVEL_MAP_KEY] || String(level);
};