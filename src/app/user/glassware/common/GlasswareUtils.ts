/*
 * 서빙 잔 타입 맵핑 객체 (전역)
 */
export const GLASS_TYPE_MAP = {
  'stemmed': '스템 글라스',
  'tumbler': '텀블러',
  'mug': '머그',
  'flute': '플루트',
  'specialty': '특수 잔'
} as const;

/*
 * 서빙 스타일 맵핑 객체
 */
export const SERVING_STYLE_MAP = {
  'straight_up': '스트레이트 업',
  'on_the_rocks': '온 더 락스',
  'neat': '니트',
  'long': '롱 드링크',
  'hot': '핫 드링크',
  'frozen': '프로즌',
  'layered': '레이어드'
} as const;

/*
 * 온도 유지력 맵핑 객체
 */
export const TEMPERATURE_RETENTION_MAP = {
  'poor': '낮음',
  'moderate': '보통',
  'good': '좋음',
  'excellent': '매우 좋음'
} as const;

/*
 * 타입 키 추출
 */
export type GLASS_TYPE_MAP_KEY = keyof typeof GLASS_TYPE_MAP;
export type SERVING_STYLE_MAP_KEY = keyof typeof SERVING_STYLE_MAP;
export type TEMPERATURE_RETENTION_MAP_KEY = keyof typeof TEMPERATURE_RETENTION_MAP;

/*
 * 키들을 배열로 반환하는 함수
 */
export const getGlassTypeKeys = (): GLASS_TYPE_MAP_KEY[] => {
  return Object.keys(GLASS_TYPE_MAP) as GLASS_TYPE_MAP_KEY[];
};

export const getServingStyleKeys = (): SERVING_STYLE_MAP_KEY[] => {
  return Object.keys(SERVING_STYLE_MAP) as SERVING_STYLE_MAP_KEY[];
};

export const getTemperatureRetentionKeys = (): TEMPERATURE_RETENTION_MAP_KEY[] => {
  return Object.keys(TEMPERATURE_RETENTION_MAP) as TEMPERATURE_RETENTION_MAP_KEY[];
};

/*
 * 서빙 잔 타입 영어 네이밍 한글로 변환 함수
 */
export const getGlassTypeKorean = (type: string): string => {
  return GLASS_TYPE_MAP[type as GLASS_TYPE_MAP_KEY] || type;
};

/*
 * 서빙 스타일 영어 네이밍 한글로 변환 함수
 */
export const getServingStyleKorean = (style: string): string => {
  return SERVING_STYLE_MAP[style as SERVING_STYLE_MAP_KEY] || style;
};

/*
 * 온도 유지력 영어 네이밍 한글로 변환 함수
 */
export const getTemperatureRetentionKorean = (retention: string): string => {
  return TEMPERATURE_RETENTION_MAP[retention as TEMPERATURE_RETENTION_MAP_KEY] || retention;
};