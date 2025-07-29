import * as React from "react";
import MainPage from "../pages/user/main/page/MainPage.tsx";
import CocktailListPage from "../pages/user/cocktail/page/CocktailListPage.tsx";
import BittersListPage from "../pages/user/bitters/page/BittersListPage.tsx";
import CarbonatedListPage from "../pages/user/carbonated/page/CarbonatedListPage.tsx";
import DairyCreamListPage from "../pages/user/dairy_cream/page/DairyCreamListPage.tsx";
import GarnishesListPage from "../pages/user/garnishes/page/GarnishesListPage.tsx";
import JuiceListPage from "../pages/user/juice/page/JuiceListPage.tsx";
import OtherIngredientsListPage from "../pages/user/other_ingredients/page/OtherIngredientsListPage.tsx";
import SyrupListPage from "../pages/user/syrup/page/SyrupListPage.tsx";

type RouteType = {
  path: string;
  name: string;
  element: React.ReactNode;
};

export const APP_ROUTES: readonly RouteType[] = [
    /*
    * 메인 페이지
    * */
    { path: '/', name: 'main', element: <MainPage/>},

    /*
    * 리스트 페이지
    * */
    { path: '/cocktail', name: 'cocktail list', element: <CocktailListPage/>},
    { path: '/bitters', name: 'bitters list', element: <BittersListPage/>},
    { path: '/carbonated', name: 'carbonated list', element: <CarbonatedListPage/>},
    { path: '/dairy-cream', name: 'dairy-cream list', element: <DairyCreamListPage/>},
    { path: '/garnishes', name: 'garnishes list', element: <GarnishesListPage/>},
    { path: '/juice', name: 'juice list', element: <JuiceListPage/>},
    { path: '/other-ingredients', name: 'other-ingredients list', element: <OtherIngredientsListPage/>},
    { path: '/syrup', name: 'syrup list', element: <SyrupListPage/>},
] as const;
