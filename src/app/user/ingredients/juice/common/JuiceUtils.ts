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
 * 당도 레벨 키들을 배열로 반환하는 함수
 */
export const getSugarLevelKeys = (): SUGAR_LEVEL_MAP_KEY[] => {
  return Object.keys(SUGAR_LEVEL_MAP).map(Number) as SUGAR_LEVEL_MAP_KEY[];
};

/*
 * 당도 레벨 숫자를 한글로 변환 함수
 */
export const getSugarLevelKorean = (level: number): string => {
  return SUGAR_LEVEL_MAP[level as SUGAR_LEVEL_MAP_KEY] || String(level);
};

/*
 * 산도 레벨 맵핑 객체
 */
export const ACIDITY_LEVEL_MAP = {
  1: '매우 낮음',
  2: '낮음',
  3: '보통',
  4: '높음',
  5: '매우 높음'
} as const;

/*
 * 산도 레벨 키 타입 추출
 */
export type ACIDITY_LEVEL_MAP_KEY = keyof typeof ACIDITY_LEVEL_MAP;

/*
 * 산도 레벨 키들을 배열로 반환하는 함수
 */
export const getAcidityLevelKeys = (): ACIDITY_LEVEL_MAP_KEY[] => {
  return Object.keys(ACIDITY_LEVEL_MAP).map(Number) as ACIDITY_LEVEL_MAP_KEY[];
};

/*
 * 산도 레벨 숫자를 한글로 변환 함수
 */
export const getAcidityLevelKorean = (level: number): string => {
  return ACIDITY_LEVEL_MAP[level as ACIDITY_LEVEL_MAP_KEY] || String(level);
};

/*
 * 주스 타입 맵핑 객체
 */
export const JUICE_TYPE_MAP = {
  CITRUS: '시트러스',
  TROPICAL: '열대 과일',
  BERRY: '베리류',
  STONE_FRUIT: '핵과류',
  VEGETABLE: '채소',
  OTHER: '기타'
} as const;

/*
 * 주스 타입 키 타입 추출
 */
export type JUICE_TYPE_MAP_KEY = keyof typeof JUICE_TYPE_MAP;

/*
 * 주스 타입 키들을 배열로 반환하는 함수
 */
export const getJuiceTypeKeys = (): JUICE_TYPE_MAP_KEY[] => {
  return Object.keys(JUICE_TYPE_MAP) as JUICE_TYPE_MAP_KEY[];
};

/*
 * 주스 타입을 한글로 변환 함수
 */
export const getJuiceTypeKorean = (type: string): string => {
  return JUICE_TYPE_MAP[type as JUICE_TYPE_MAP_KEY] || type;
};