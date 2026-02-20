/*
 * 주요 사용처 맵핑 객체
 */
export const PRIMARY_FUNCTION_MAP = {
  'aroma': '향',
  'flavor': '맛',
  'visual': '시각',
  'all': '전체'
} as const;

/*
 * 주요 사용처 키 타입 추출
 */
export type PRIMARY_FUNCTION_MAP_KEY = keyof typeof PRIMARY_FUNCTION_MAP;

/*
 * 주요 사용처 영문을 한글로 변환 함수
 */
export const getPrimaryFunctionKorean = (primaryFunction: string): string => {
  return PRIMARY_FUNCTION_MAP[primaryFunction as PRIMARY_FUNCTION_MAP_KEY] || primaryFunction;
};