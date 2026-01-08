/*
 * 제조 기법 분류 맵핑 객체 (전역)
 */
export const TECHNIQUE_CATEGORY_MAP = {
  'shaking': '쉐이킹',
  'stirring': '스터링',
  'building': '빌딩',
  'muddling': '머들링',
  'blending': '블렌딩',
  'layering': '레이어링'
} as const;

/*
 * 희석 정도 맵핑 객체
 */
export const DILUTION_LEVEL_MAP = {
  'none': '없음',
  'low': '낮음',
  'medium': '중간',
  'high': '높음'
} as const;

/*
 * 공기 주입 정도 맵핑 객체
 */
export const AERATION_LEVEL_MAP = {
  'none': '없음',
  'low': '낮음',
  'medium': '중간',
  'high': '높음'
} as const;

/*
 * 온도 변화 맵핑 객체
 */
export const TEMPERATURE_CHANGE_MAP = {
  'none': '없음',
  'chill': '차갑게',
  'warm': '따뜻하게'
} as const;

/*
 * 카테고리 키 타입 추출
 */
export type TECHNIQUE_CATEGORY_MAP_KEY = keyof typeof TECHNIQUE_CATEGORY_MAP;
export type DILUTION_LEVEL_MAP_KEY = keyof typeof DILUTION_LEVEL_MAP;
export type AERATION_LEVEL_MAP_KEY = keyof typeof AERATION_LEVEL_MAP;
export type TEMPERATURE_CHANGE_MAP_KEY = keyof typeof TEMPERATURE_CHANGE_MAP;

/*
 * 카테고리 키들을 배열로 반환하는 함수
 */
export const getCategoryKeys = (): TECHNIQUE_CATEGORY_MAP_KEY[] => {
  return Object.keys(TECHNIQUE_CATEGORY_MAP) as TECHNIQUE_CATEGORY_MAP_KEY[];
};

export const getDilutionLevelKeys = (): DILUTION_LEVEL_MAP_KEY[] => {
  return Object.keys(DILUTION_LEVEL_MAP) as DILUTION_LEVEL_MAP_KEY[];
};

export const getAerationLevelKeys = (): AERATION_LEVEL_MAP_KEY[] => {
  return Object.keys(AERATION_LEVEL_MAP) as AERATION_LEVEL_MAP_KEY[];
};

export const getTemperatureChangeKeys = (): TEMPERATURE_CHANGE_MAP_KEY[] => {
  return Object.keys(TEMPERATURE_CHANGE_MAP) as TEMPERATURE_CHANGE_MAP_KEY[];
};

/*
 * 제조 기법 분류 영어 네이밍 한글로 변환 함수
 */
export const getTechniqueCategoryKorean = (category: string): string => {
  return TECHNIQUE_CATEGORY_MAP[category as TECHNIQUE_CATEGORY_MAP_KEY] || category;
};

/*
 * 희석 정도 영어 네이밍 한글로 변환 함수
 */
export const getDilutionLevelKorean = (level: string): string => {
  return DILUTION_LEVEL_MAP[level as DILUTION_LEVEL_MAP_KEY] || level;
};

/*
 * 공기 주입 정도 영어 네이밍 한글로 변환 함수
 */
export const getAerationLevelKorean = (level: string): string => {
  return AERATION_LEVEL_MAP[level as AERATION_LEVEL_MAP_KEY] || level;
};

/*
 * 온도 변화 영어 네이밍 한글로 변환 함수
 */
export const getTemperatureChangeKorean = (change: string): string => {
  return TEMPERATURE_CHANGE_MAP[change as TEMPERATURE_CHANGE_MAP_KEY] || change;
};