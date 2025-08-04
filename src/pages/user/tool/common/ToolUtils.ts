/*
 * 기물 분류 맵핑 객체 (전역)
 */
export const TOOL_CATEGORY_MAP = {
  'shaker': '셰이커',
  'strainer': '스트레이너',
  'measuring': '계량 도구',
  'mixing': '믹싱 도구',
  'muddling': '머들링 도구',
  'garnish': '가니쉬 도구',
  'other': '기타'
} as const;

/*
 * 카테고리 키 타입 추출
 */
export type TOOL_CATEGORY_MAP_KEY = keyof typeof TOOL_CATEGORY_MAP;

/*
 * 카테고리 키들을 배열로 반환하는 함수
 */
export const getCategoryKeys = (): TOOL_CATEGORY_MAP_KEY[] => {
  return Object.keys(TOOL_CATEGORY_MAP) as TOOL_CATEGORY_MAP_KEY[];
};

/*
 * 기물 분류 영어 네이밍 한글로 변환 함수
 */
export const getToolCategoryKorean = (category: string): string => {
  return TOOL_CATEGORY_MAP[category as TOOL_CATEGORY_MAP_KEY] || category;
};
