import * as React from "react";
import MainPage from "../app/user/main/page/MainPage.tsx";
import CocktailListPage from "../app/user/cocktail/page/CocktailListPage.tsx";
import SpiritProductListPage from "../app/user/spirit/page/SpiritProductListPage.tsx";
import BittersListPage from "../app/user/ingredients/bitters/page/BittersListPage.tsx";
import CarbonatedListPage from "../app/user/ingredients/carbonated/page/CarbonatedListPage.tsx";
import DairyCreamListPage from "../app/user/ingredients/dairy_cream/page/DairyCreamListPage.tsx";
import GarnishesListPage from "../app/user/ingredients/garnishes/page/GarnishesListPage.tsx";
import JuiceListPage from "../app/user/ingredients/juice/page/JuiceListPage.tsx";
import OtherListPage from "../app/user/ingredients/other_ingredients/page/OtherListPage.tsx";
import SyrupListPage from "../app/user/ingredients/syrup/page/SyrupListPage.tsx";
import IngredientListPage from "../app/user/ingredients/ingredient/page/IngredientListPage.tsx";
import ToolListPage from "../app/user/tool/page/ToolListPage.tsx";
import TechniqueListPage from "../app/user/technique/page/TechniqueListPage.tsx";
import GlasswareListPage from "../app/user/glassware/page/GlasswareListPage.tsx";
import MyPageLayout from "../app/user/my-page/MyPageLayout.tsx";

export type RouteType = {
  path: string;
  name: string;
  nameKr: string;
  element: React.ReactNode;
  type: string;
};

export const APP_ROUTES: readonly RouteType[] = [
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // 메인 페이지
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
      { path: '/', name: 'main', nameKr:'홈', element: <MainPage/>, type: 'root'},

  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // GNB 탭
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
      // GNB 재료 탭
      { path: '/cocktail', name: 'cocktail list', nameKr: '레시피', element: <CocktailListPage/>, type: 'gnb'},
      { path: '/spirit', name: 'spirit list', nameKr: '기주', element: <SpiritProductListPage/>, type: 'gnb'},
      { path: '/ingredients', name: 'ingredients list', nameKr: '재료', element: <IngredientListPage/>, type: 'gnb'},
      { path: '/tool', name: 'tool list', nameKr: '도구', element: <ToolListPage/>, type: 'gnb'},
      { path: '/technique', name: 'technique list', nameKr: '기법', element: <TechniqueListPage/>, type: 'gnb'},
      { path: '/glassware', name: 'glassware list', nameKr: '잔', element: <GlasswareListPage/>, type: 'gnb'},

      // GNB 재료 탭 - 하위
      { path: '/ingredients/bitters', name: 'bitters list', nameKr: '비터스', element: <BittersListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/carbonated', name: 'carbonated list', nameKr: '탄산/소다', element: <CarbonatedListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/dairy-cream', name: 'dairy-cream list', nameKr: '유제품/크림', element: <DairyCreamListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/garnishes', name: 'garnishes list', nameKr: '가니쉬', element: <GarnishesListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/juice', name: 'juice list', nameKr: '주스', element: <JuiceListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/other', name: 'other-ingredients list', nameKr: '기타', element: <OtherListPage/>, type: 'gnb-ingredients'},
      { path: '/ingredients/syrup', name: 'syrup list', nameKr: '시럽', element: <SyrupListPage/>, type: 'gnb-ingredients'},

  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
  // 마이페이지 (Nested Routes)
  // ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
      /**
       * 중요: 마이페이지는 중첩 라우팅 구조를 사용합니다
       *
       * 구조:
       * - /my-page/*              → MyPageLayout (레이아웃 + 사이드바)
       * - /my-page/recipes        → 내부에서 처리 (MyPageLayout의 중첩 Routes)
       * - /my-page/comments       → 내부에서 처리
       * - ... 기타 서브 라우트    → 내부에서 처리
       *
       * 서브 라우트 정의 위치:
       * - @see {@link ../app/user/my-page/MyPageRoutes.tsx} - 서브 라우트 데이터 정의
       * - @see {@link ../app/user/my-page/MyPageLayout.tsx} - 실제 라우팅 처리
       * - @see {@link ../app/user/my-page/component/MyPageSidebar.tsx} - 사이드바 메뉴
       *
       * 새 메뉴 추가 방법:
       * 1. MyPageRoutes.tsx에 새 RouteType 추가
       * 2. 해당 페이지 컴포넌트 생성
       * 3. 자동으로 사이드바 메뉴와 라우팅에 반영됨
       *
       * 주의: APP_ROUTES에 서브 라우트를 추가하지 마세요!
       * - 서브 라우트는 MyPageLayout 내부에서만 관리됩니다
       * - 여기에 추가하면 중복 라우팅으로 중첩 라우트가 동작하지 않습니다
       */
      { path: '/my-page/*', name: 'my page', nameKr: '마이페이지', element: <MyPageLayout/>, type: 'my-page'},

] as const;