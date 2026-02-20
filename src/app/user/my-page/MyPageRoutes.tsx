import type { RouteType } from "../../../route/RoutesConfig";
import MyRecipesPage from "./my-recipes/MyRecipesPage";
import MyCommentsPage from "./my-comments/MyCommentsPage";
import ProfileViewPage from "./profile-view/ProfileViewPage";
import ProfileEditPage from "./profile-edit/ProfileEditPage";
import ReceivedCommentsPage from "./received-comments/ReceivedCommentsPage";
import ReceivedLikesPage from "./received-likes/ReceivedLikesPage";

/**
 * 마이페이지 서브 라우트 정의
 *
 * - @see {@link ../../../route/RoutesConfig.tsx} 에서 순환 참조를 피하기 위해 별도 파일로 분리
 * - @see {@link ./component/MyPageSidebar.tsx} 와 @see {@link ./MyPageLayout.tsx} 에서 공통으로 사용
 */
export const MY_PAGE_SUB_ROUTES: RouteType[] = [
  { path: '/my-page/recipes', name: 'my recipes', nameKr: '나의 레시피', element: <MyRecipesPage/>, type: 'my-page-sub'},
  { path: '/my-page/comments', name: 'my comments', nameKr: '나의 댓글', element: <MyCommentsPage/>, type: 'my-page-sub'},
  { path: '/my-page/profile', name: 'profile view', nameKr: '회원정보 조회', element: <ProfileViewPage/>, type: 'my-page-sub'},
  { path: '/my-page/edit', name: 'profile edit', nameKr: '회원정보 수정', element: <ProfileEditPage/>, type: 'my-page-sub'},
  { path: '/my-page/received-comments', name: 'received comments', nameKr: '내가 받은 댓글', element: <ReceivedCommentsPage/>, type: 'my-page-sub'},
  { path: '/my-page/likes', name: 'received likes', nameKr: '내가 받은 좋아요', element: <ReceivedLikesPage/>, type: 'my-page-sub'},
];
