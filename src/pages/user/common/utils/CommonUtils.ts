/**
 * HTML 태그를 제거하고 순수 텍스트만 반환하는 함수
 */
export const stripHtmlTags = (html: string | null | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};