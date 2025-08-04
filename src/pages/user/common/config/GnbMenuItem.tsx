type GnbMenuType = {
  path: string;
  name: string;
};

export const GNB_MENU_TYPE: readonly GnbMenuType[] = [
  { path: '/', name: '홈'},
  { path: '/cocktail', name: '레시피'},
  { path: '/spirit', name: '기주'},
  { path: '/ingredients', name: '재료'},
  { path: '/tool', name: '도구'},
  { path: '/technique', name: '기법'},
  { path: '/glassware', name: '잔'},
] as const;

export const GNB_SUBMENU_TYPE: readonly GnbMenuType[] = [
  { path: '/juice', name: '주스'},
  { path: '/bitters', name: '비터스'},
  { path: '/syrup', name: '시럽'},
  { path: '/carbonated', name: '탄산/소다'},
  { path: '/dairy_cream', name: '유제품/크림'},
  { path: '/garnishes', name: '가니쉬'},
  { path: '/other-ingredients', name: '기타'},
] as const;
