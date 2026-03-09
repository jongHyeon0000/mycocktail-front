export type SpiritCategoryKey =
  | 'gin' | 'vodka' | 'rum' | 'tequila' | 'mezcal'
  | 'whiskey' | 'brandy' | 'liqueur' | 'vermouth'
  | 'sake' | 'non_alcoholic' | 'other';

export interface SpiritCategoryMeta {
  name: string;
  nameKr: string;
}

export const SPIRIT_CATEGORY_MAP: Record<SpiritCategoryKey, SpiritCategoryMeta> = {
  gin:           { name: 'Gin',           nameKr: '진'       },
  vodka:         { name: 'Vodka',         nameKr: '보드카'   },
  rum:           { name: 'Rum',           nameKr: '럼'       },
  tequila:       { name: 'Tequila',       nameKr: '데킬라'   },
  mezcal:        { name: 'Mezcal',        nameKr: '메스칼'   },
  whiskey:       { name: 'Whiskey',       nameKr: '위스키'   },
  brandy:        { name: 'Brandy',        nameKr: '브랜디'   },
  liqueur:       { name: 'Liqueur',       nameKr: '리큐어'   },
  vermouth:      { name: 'Vermouth',      nameKr: '베르무트' },
  sake:          { name: 'Sake',          nameKr: '사케'     },
  non_alcoholic: { name: 'Non-Alcoholic', nameKr: '무알콜'   },
  other:         { name: 'Other',         nameKr: '기타'     },
};
