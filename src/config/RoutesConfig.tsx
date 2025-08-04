import * as React from "react";
import MainPage from "../pages/user/main/page/MainPage.tsx";
import CocktailListPage from "../pages/user/cocktail/page/CocktailListPage.tsx";
import SpiritProductListPage from "../pages/user/spirit/page/SpiritProductListPage.tsx";
import BittersListPage from "../pages/user/ingredients/bitters/page/BittersListPage.tsx";
import CarbonatedListPage from "../pages/user/ingredients/carbonated/page/CarbonatedListPage.tsx";
import DairyCreamListPage from "../pages/user/ingredients/dairy_cream/page/DairyCreamListPage.tsx";
import GarnishesListPage from "../pages/user/ingredients/garnishes/page/GarnishesListPage.tsx";
import JuiceListPage from "../pages/user/ingredients/juice/page/JuiceListPage.tsx";
import OtherListPage from "../pages/user/ingredients/other/page/OtherListPage.tsx";
import SyrupListPage from "../pages/user/ingredients/syrup/page/SyrupListPage.tsx";
import IngredientsListPage from "../pages/user/ingredients/common/page/IngredientsListPage.tsx";
import ToolListPage from "../pages/user/tool/page/ToolListPage.tsx";
import TechniqueListPage from "../pages/user/technique/page/TechniqueListPage.tsx";
import GlasswareListPage from "../pages/user/glassware/page/GlasswareListPage.tsx";

type RouteType = {
  path: string;
  name: string;
  nameKr: string;
  element: React.ReactNode;
  type: string;
};

export const APP_ROUTES: readonly RouteType[] = [
    /*
    * 메인 페이지
    * */
    { path: '/', name: 'main', nameKr:'홈', element: <MainPage/>, type: 'root'},

    /*
    * GNB tab
    * */
    { path: '/cocktail', name: 'cocktail list', nameKr: '레시피', element: <CocktailListPage/>, type: 'gnb'},
    { path: '/spirit', name: 'spirit list', nameKr: '기주', element: <SpiritProductListPage/>, type: 'gnb'},
    { path: '/ingredients', name: 'ingredients list', nameKr: '재료', element: <IngredientsListPage/>, type: 'gnb'},
    { path: '/tool', name: 'tool list', nameKr: '도구', element: <ToolListPage/>, type: 'gnb'},
    { path: '/technique', name: 'technique list', nameKr: '기법', element: <TechniqueListPage/>, type: 'gnb'},
    { path: '/glassware', name: 'glassware list', nameKr: '잔', element: <GlasswareListPage/>, type: 'gnb'},

    /*
    * GNB 재료 tab - 하위
    * */
    { path: '/ingredients/bitters', name: 'bitters list', nameKr: '비터스', element: <BittersListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/carbonated', name: 'carbonated list', nameKr: '탄산/소다', element: <CarbonatedListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/dairy-cream', name: 'dairy-cream list', nameKr: '유제품/크림', element: <DairyCreamListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/garnishes', name: 'garnishes list', nameKr: '가니쉬', element: <GarnishesListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/juice', name: 'juice list', nameKr: '주스', element: <JuiceListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/other', name: 'other-ingredients list', nameKr: '기타', element: <OtherListPage/>, type: 'gnb-ingredients'},
    { path: '/ingredients/syrup', name: 'syrup list', nameKr: '시럽', element: <SyrupListPage/>, type: 'gnb-ingredients'},

    /**********************************************************************************************************************************************************/
] as const;