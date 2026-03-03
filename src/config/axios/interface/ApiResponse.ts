export interface ApiResponse<T = unknown> {
  /**
   * 응답 상태 코드
   * @example "OK", "ERROR", "FAIL"
   */
  code: string;

  /**
   * 응답 메시지
   * @example "요청이 정상적으로 처리되었습니다."
   */
  message: string;

  /**
   * 실제 데이터 페이로드
   */
  data: T;
}