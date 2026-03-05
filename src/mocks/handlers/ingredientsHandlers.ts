/* eslint-disable @typescript-eslint/no-explicit-any */

import { http, HttpResponse, delay } from 'msw'

// ─── Bitters ────────────────────────────────────────────────────────────────

const bittersData = [
  {
    bittersId: 1, brandId: 1, brandName: "Angostura", brandNameKr: "앙고스투라", countryId: 1, countryName: "Trinidad and Tobago",
    bittersName: "Angostura Aromatic Bitters", bittersNameKr: "앙고스투라 아로마틱 비터스", abv: 44.7,
    image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Angostura",
    notes: "<p>1824년부터 생산된 세계에서 가장 유명한 비터스입니다.</p><p>겐티안 뿌리, 허브, 스파이스의 복합적인 향미가 특징입니다.</p>",
    storageType: "실온 보관, 직사광선 피함", shelfLifeDays: 1825,
    whenToUseNotes: "<p>위스키 베이스 클래식 칵테일에서 깊이와 복합성을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Peychaud's Bitters로 대체 가능하나 향미가 다릅니다.</p>",
    createdAt: "2024-01-15", updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 1, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
      { id: 2, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Manhattan" },
      { id: 3, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Whiskey+Sour" }
    ]
  },
  {
    bittersId: 2, brandId: 2, brandName: "Peychaud's", brandNameKr: "페이쇼즈", countryId: 2, countryName: "United States",
    bittersName: "Peychaud's Bitters", bittersNameKr: "페이쇼즈 비터스", abv: 35.0,
    image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Peychauds",
    notes: "<p>1830년대 뉴올리언스에서 탄생한 아니스 향의 비터스입니다.</p>",
    storageType: "실온 보관, 밀봉 보관", shelfLifeDays: 1460,
    whenToUseNotes: "<p>뉴올리언스 스타일 칵테일에서 아니스와 플로럴 노트를 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Angostura Bitters로 대체 가능하지만 색과 향이 다릅니다.</p>",
    createdAt: "2024-01-14", updatedAt: "2024-01-19",
    availableCocktails: [
      { id: 4, name: "Sazerac", nameKr: "사제락", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Sazerac" },
      { id: 5, name: "Vieux Carré", nameKr: "비외 카레", image: "https://via.placeholder.com/80x80/A0522D/FFFFFF?text=Vieux+Carre" }
    ]
  },
  {
    bittersId: 3, brandId: 3, brandName: "The Bitter Truth", brandNameKr: "더 비터 트루스", countryId: 3, countryName: "Germany",
    bittersName: "The Bitter Truth Orange Bitters", bittersNameKr: "더 비터 트루스 오렌지 비터스", abv: 39.0,
    image: "https://via.placeholder.com/200x200/FF8C00/000000?text=Orange+Bitters",
    notes: "<p>독일의 크래프트 비터스 브랜드에서 만든 오렌지 비터스입니다.</p>",
    storageType: "서늘한 곳에 보관, 개봉 후 냉장 권장", shelfLifeDays: 1095,
    whenToUseNotes: "<p>진 베이스 칵테일에서 시트러스 향을 강화하고 밝은 느낌을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Regan's Orange Bitters No.6로 대체 가능합니다.</p>",
    createdAt: "2024-01-13", updatedAt: "2024-01-18",
    availableCocktails: [
      { id: 7, name: "Martini", nameKr: "마티니", image: "https://via.placeholder.com/80x80/E6E6FA/000000?text=Martini" },
      { id: 8, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" }
    ]
  },
  {
    bittersId: 4, brandId: 4, brandName: "Fee Brothers", brandNameKr: "피 브라더스", countryId: 2, countryName: "United States",
    bittersName: "Fee Brothers Chocolate Bitters", bittersNameKr: "피 브라더스 초콜릿 비터스", abv: 2.7,
    image: "https://via.placeholder.com/200x200/654321/FFFFFF?text=Chocolate+Bitters",
    notes: "<p>1864년부터 이어온 전통의 비터스 브랜드에서 만든 초콜릿 비터스입니다.</p>",
    storageType: "실온 보관", shelfLifeDays: 730,
    whenToUseNotes: "<p>커피나 초콜릿 풍미가 들어간 디저트 칵테일에서 깊이와 리치함을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Aztec Chocolate Bitters로 대체 가능합니다.</p>",
    createdAt: "2024-01-12", updatedAt: "2024-01-17",
    availableCocktails: [
      { id: 10, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/3B2F2F/FFFFFF?text=Espresso" }
    ]
  },
  {
    bittersId: 5, brandId: 5, brandName: "Scrappy's", brandNameKr: "스크래피스", countryId: 2, countryName: "United States",
    bittersName: "Scrappy's Lavender Bitters", bittersNameKr: "스크래피스 라벤더 비터스", abv: 52.5,
    image: "https://via.placeholder.com/200x200/E6E6FA/000000?text=Lavender+Bitters",
    notes: "<p>시애틀 기반의 크래프트 비터스 브랜드입니다.</p>",
    storageType: "서늘하고 어두운 곳에 보관", shelfLifeDays: 1095,
    whenToUseNotes: "<p>진 베이스나 샴페인 칵테일에서 우아한 플로럴 노트를 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>The Bitter Truth Violet Bitters로 유사한 플로럴 느낌을 낼 수 있습니다.</p>",
    createdAt: "2024-01-11", updatedAt: "2024-01-16",
    availableCocktails: [
      { id: 13, name: "Aviation", nameKr: "에비에이션", image: "https://via.placeholder.com/80x80/9370DB/FFFFFF?text=Aviation" },
      { id: 14, name: "French 75", nameKr: "프렌치 75", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=French+75" }
    ]
  }
]

// ─── Carbonated ─────────────────────────────────────────────────────────────

const carbonatedData = [
  {
    carbonatedId: 1, brandId: 1, brandName: "Fever-Tree", brandNameKr: "피버트리", countryId: 1, countryName: "United Kingdom",
    carbonatedName: "Fever-Tree Indian Tonic Water", carbonatedNameKr: "피버트리 인디언 토닉워터", sugarLevel: 3,
    image: "https://via.placeholder.com/200x200/87CEEB/000000?text=Tonic+Water",
    notes: "<p>천연 퀴닌을 사용한 프리미엄 토닉워터입니다.</p>",
    shelfLifeDays: 730, storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
    whenToUseNotes: "<p>진 베이스 롱 드링크 칵테일에서 가장 많이 사용됩니다.</p>",
    substituteNotes: "<p>Schweppes Tonic Water로 대체 가능하나 단맛이 더 강합니다.</p>",
    createdAt: "2024-01-15", updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 1, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
      { id: 2, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Vodka+Tonic" }
    ]
  },
  {
    carbonatedId: 2, brandId: 2, brandName: "Fever-Tree", brandNameKr: "피버트리", countryId: 1, countryName: "United Kingdom",
    carbonatedName: "Fever-Tree Ginger Beer", carbonatedNameKr: "피버트리 진저비어", sugarLevel: 4,
    image: "https://via.placeholder.com/200x200/FFD700/000000?text=Ginger+Beer",
    notes: "<p>나이지리아산 생강을 사용한 강렬한 진저비어입니다.</p>",
    shelfLifeDays: 730, storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
    whenToUseNotes: "<p>럼 베이스 칵테일에서 스파이시한 킥을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Bundaberg Ginger Beer로 대체 가능하나 더 달고 부드럽습니다.</p>",
    createdAt: "2024-01-14", updatedAt: "2024-01-19",
    availableCocktails: [
      { id: 4, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Moscow+Mule" },
      { id: 5, name: "Dark 'n' Stormy", nameKr: "다크 앤 스토미", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Dark+Stormy" }
    ]
  },
  {
    carbonatedId: 3, brandId: 3, brandName: "Schweppes", brandNameKr: "슈웹스", countryId: 1, countryName: "United Kingdom",
    carbonatedName: "Schweppes Ginger Ale", carbonatedNameKr: "슈웹스 진저에일", sugarLevel: 3,
    image: "https://via.placeholder.com/200x200/F0E68C/000000?text=Ginger+Ale",
    notes: "<p>1870년부터 이어온 클래식 진저에일입니다.</p>",
    shelfLifeDays: 365, storageType: "실온 또는 냉장 보관, 개봉 후 냉장 보관",
    whenToUseNotes: "<p>위스키 베이스 하이볼에서 부드러운 생강 향을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Canada Dry Ginger Ale로 대체 가능하며 맛이 유사합니다.</p>",
    createdAt: "2024-01-13", updatedAt: "2024-01-18",
    availableCocktails: [
      { id: 7, name: "Whiskey Ginger", nameKr: "위스키 진저", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Whiskey+Ginger" }
    ]
  },
  {
    carbonatedId: 4, brandId: 4, brandName: "Coca-Cola", brandNameKr: "코카콜라", countryId: 2, countryName: "United States",
    carbonatedName: "Coca-Cola Classic", carbonatedNameKr: "코카콜라 클래식", sugarLevel: 5,
    image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Coca+Cola",
    notes: "<p>세계에서 가장 유명한 콜라 음료입니다.</p>",
    shelfLifeDays: 270, storageType: "실온 보관, 개봉 후 냉장 보관",
    whenToUseNotes: "<p>럼 베이스 칵테일에서 달콤함과 깊이를 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Pepsi Cola로 대체 가능하나 약간 더 달고 시트러스 향이 강합니다.</p>",
    createdAt: "2024-01-12", updatedAt: "2024-01-17",
    availableCocktails: [
      { id: 10, name: "Cuba Libre", nameKr: "쿠바 리브레", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Cuba+Libre" }
    ]
  },
  {
    carbonatedId: 5, brandId: 5, brandName: "San Pellegrino", brandNameKr: "산펠레그리노", countryId: 3, countryName: "Italy",
    carbonatedName: "San Pellegrino Sparkling Water", carbonatedNameKr: "산펠레그리노 탄산수", sugarLevel: 1,
    image: "https://via.placeholder.com/200x200/E0E0E0/000000?text=Sparkling+Water",
    notes: "<p>이탈리아 알프스에서 나오는 천연 미네랄 탄산수입니다.</p>",
    shelfLifeDays: 730, storageType: "실온 보관, 개봉 후 냉장 보관 및 즉시 소비",
    whenToUseNotes: "<p>스피릿의 맛을 희석하지 않으면서 청량감을 더하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Perrier나 Topo Chico로 대체 가능합니다.</p>",
    createdAt: "2024-01-11", updatedAt: "2024-01-16",
    availableCocktails: [
      { id: 13, name: "Aperol Spritz", nameKr: "아페롤 스프리츠", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Aperol+Spritz" }
    ]
  },
  {
    carbonatedId: 6, brandId: 6, brandName: "Fentimans", brandNameKr: "펜티먼스", countryId: 1, countryName: "United Kingdom",
    carbonatedName: "Fentimans Victorian Lemonade", carbonatedNameKr: "펜티먼스 빅토리안 레모네이드", sugarLevel: 3,
    image: "https://via.placeholder.com/200x200/FFFACD/000000?text=Lemonade",
    notes: "<p>전통 보타니컬 발효 방식으로 만든 프리미엄 레모네이드입니다.</p>",
    shelfLifeDays: 365, storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
    whenToUseNotes: "<p>보드카나 진 베이스 칵테일에서 시트러스 노트와 청량감을 동시에 제공하기 위해 사용됩니다.</p>",
    substituteNotes: "<p>Schweppes Lemonade나 7UP으로 대체 가능하나 향미가 단순합니다.</p>",
    createdAt: "2024-01-10", updatedAt: "2024-01-15",
    availableCocktails: [
      { id: 16, name: "Vodka Lemonade", nameKr: "보드카 레모네이드", image: "https://via.placeholder.com/80x80/FFFFE0/000000?text=Vodka+Lemonade" }
    ]
  }
]

// ─── Juice ──────────────────────────────────────────────────────────────────

const juiceData = [
  {
    juiceId: 1, brandId: 7, brandName: "Tropicana", brandNameKr: "트로피카나", countryId: 2, countryName: "United States", countryNameKr: "미국",
    juiceName: "Tropicana Pure Premium Orange Juice", juiceNameKr: "트로피카나 퓨어 프리미엄 오렌지 주스",
    sugarLevel: 4, acidityLevel: 3, image: "https://via.placeholder.com/200x200/FFA500/FFFFFF?text=Orange+Juice",
    notes: "<p>100% 착즙 오렌지 주스로 농축 환원 과정 없이 신선함을 유지합니다.</p>",
    shelfLifeDays: 14, storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
    whenToUseNotes: "<p>칵테일에 가장 많이 사용되는 기본 주스입니다.</p>",
    substituteNotes: "<p>Minute Maid나 Simply Orange로 대체 가능합니다.</p>",
    createdAt: "2024-01-15", updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 19, name: "Screwdriver", nameKr: "스크루드라이버", image: "https://via.placeholder.com/80x80/FFA500/FFFFFF?text=Screwdriver" },
      { id: 20, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" }
    ]
  },
  {
    juiceId: 2, brandId: 8, brandName: "Ocean Spray", brandNameKr: "오션 스프레이", countryId: 2, countryName: "United States", countryNameKr: "미국",
    juiceName: "Ocean Spray Cranberry Juice Cocktail", juiceNameKr: "오션 스프레이 크랜베리 주스 칵테일",
    sugarLevel: 4, acidityLevel: 4, image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Cranberry+Juice",
    notes: "<p>크랜베리 특유의 강한 산미와 떫은맛에 적당한 당분을 추가한 제품입니다.</p>",
    shelfLifeDays: 21, storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
    whenToUseNotes: "<p>보드카 베이스 칵테일의 필수 재료입니다.</p>",
    substituteNotes: "<p>100% 크랜베리 주스를 사용할 경우 당분 추가가 필요합니다.</p>",
    createdAt: "2024-01-14", updatedAt: "2024-01-19",
    availableCocktails: [
      { id: 22, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=Cosmopolitan" }
    ]
  }
]

// ─── Syrup ──────────────────────────────────────────────────────────────────

const syrupData = [
  {
    syrupId: 1, brandId: 13, brandName: "Monin", brandNameKr: "모닌", countryId: 5, countryName: "France", countryNameKr: "프랑스",
    syrupName: "Monin Grenadine Syrup", syrupNameKr: "모닌 그레나딘 시럽", sugarLevel: 65.0,
    image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Grenadine",
    notes: "<p>석류를 베이스로 한 진한 붉은색 시럽입니다.</p>",
    shelfLifeDays: 1095, storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
    whenToUseNotes: "<p>데킬라 선라이즈의 시그니처 레이어 효과를 만들 때 필수입니다.</p>",
    substituteNotes: "<p>Rose's Grenadine으로 대체 가능하나 인공적인 맛이 강합니다.</p>",
    createdAt: "2024-01-15", updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 37, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" }
    ]
  }
]

// ─── Garnishes ──────────────────────────────────────────────────────────────

const garnishesData = [
  {
    garnishId: 1, brandId: 17, brandName: "Fresh Produce", brandNameKr: "신선 농산물", countryId: 2, countryName: "United States", countryNameKr: "미국",
    garnishName: "Mint Leaves", garnishNameKr: "민트 잎", primaryFunction: "all",
    image: "https://via.placeholder.com/200x200/90EE90/000000?text=Mint",
    notes: "<p>가장 널리 사용되는 칵테일 가니쉬 중 하나입니다.</p>",
    shelfLifeDays: 7, storageType: "냉장 보관, 젖은 키친타월로 감싸 보관하면 더 오래 신선함 유지",
    whenToUseNotes: "<p>모히또에서 머들링하여 향을 내고 장식으로도 사용합니다.</p>",
    substituteNotes: "<p>페퍼민트나 스피어민트 모두 사용 가능하며, 각각 다른 향의 강도를 제공합니다.</p>",
    createdAt: "2024-02-15", updatedAt: "2024-02-20",
    availableCocktails: [
      { id: 1, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" },
      { id: 55, name: "Mint Julep", nameKr: "민트 줄렙", image: "https://via.placeholder.com/80x80/90EE90/000000?text=Mint+Julep" }
    ]
  }
]

// ─── Dairy & Cream ──────────────────────────────────────────────────────────

const dairyCreamData = [
  {
    dairyCreamId: 1, brandId: 22, brandName: "Organic Valley", brandNameKr: "오가닉 밸리", countryId: 2, countryName: "United States", countryNameKr: "미국",
    dairyCreamName: "Heavy Cream", dairyCreamNameKr: "헤비 크림", fatContent: 36.0, isDairyFree: false,
    image: "https://via.placeholder.com/200x200/FFF8DC/000000?text=Heavy+Cream",
    notes: null, shelfLifeDays: 14, storageType: "냉장 보관 (1-4°C)", substituteNotes: null,
    createdAt: "2024-02-15", updatedAt: "2024-02-20",
    availableCocktails: []
  }
]

// ─── Other Ingredients ──────────────────────────────────────────────────────

const otherIngredientsData = [
  {
    otherIngredientId: 1, brandId: 1, brandName: "Rose's", brandNameKr: "로즈", countryId: 1, countryName: "United Kingdom", countryNameKr: "영국",
    otherIngredientName: "Rose's Lime Juice Cordial", otherIngredientNameKr: "로즈 라임 주스 코디얼",
    notes: "1867년부터 생산된 전통적인 라임 코디얼로, 클래식 칵테일 Gimlet의 필수 재료입니다.",
    shelfLifeDays: 365, storageType: "개봉 후 냉장 보관",
    whenToUseNotes: "Gimlet, Kamikaze 등 라임의 달콤한 풍미가 필요한 칵테일에 사용됩니다.",
    substituteNotes: "신선한 라임 주스 + 심플 시럽으로 대체 가능하나, 전통적인 Gimlet의 맛을 원한다면 Rose's를 권장합니다.",
    createdAt: "2025-01-15T10:00:00Z", updatedAt: "2025-01-15T10:00:00Z",
    image: "https://example.com/images/roses-lime-cordial.jpg",
    availableCocktails: [
      { id: 1, name: "Gimlet", nameKr: "김렛", image: "https://example.com/cocktails/gimlet.jpg" }
    ]
  }
]

// ─── Unified Ingredients ────────────────────────────────────────────────────

const unifiedIngredientsData = [
  ...juiceData.map(d => ({ ...d, type: 'juice' })),
  ...bittersData.map(d => ({ ...d, type: 'bitters' })),
  ...carbonatedData.map(d => ({ ...d, type: 'carbonated' })),
  ...dairyCreamData.map(d => ({ ...d, type: 'dairyCream' })),
  ...garnishesData.map(d => ({ ...d, type: 'garnishes' })),
  ...syrupData.map(d => ({ ...d, type: 'syrup' })),
  ...otherIngredientsData.map(d => ({ ...d, type: 'other' })),
]

function getNameByType(item: any): string {
  switch (item.type) {
    case 'juice': return item.juiceName ?? ''
    case 'bitters': return item.bittersName ?? ''
    case 'carbonated': return item.carbonatedName ?? ''
    case 'dairyCream': return item.dairyCreamName ?? ''
    case 'garnishes': return item.garnishName ?? ''
    case 'syrup': return item.syrupName ?? ''
    case 'other': return item.otherIngredientName ?? ''
    default: return ''
  }
}

function getNameKrByType(item: any): string {
  switch (item.type) {
    case 'juice': return item.juiceNameKr ?? ''
    case 'bitters': return item.bittersNameKr ?? ''
    case 'carbonated': return item.carbonatedNameKr ?? ''
    case 'dairyCream': return item.dairyCreamNameKr ?? ''
    case 'garnishes': return item.garnishNameKr ?? ''
    case 'syrup': return item.syrupNameKr ?? ''
    case 'other': return item.otherIngredientNameKr ?? ''
    default: return ''
  }
}

function paginate<T>(data: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit
  return data.slice(start, start + limit)
}

export const ingredientsHandlers = [
  // Bitters List
  http.get('/api/bitters', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...bittersData]
    if (sort === 'name') result.sort((a, b) => a.bittersName.localeCompare(b.bittersName))
    if (search) result = result.filter(d => d.bittersName.toLowerCase().includes(search.toLowerCase()) || d.bittersNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Bitters Detail
  http.get('/api/bitters/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = bittersData.find(d => d.bittersId === id)
    if (!item) return HttpResponse.json({ error: 'Bitters not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Carbonated List
  http.get('/api/carbonated', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...carbonatedData]
    if (sort === 'name') result.sort((a, b) => a.carbonatedName.localeCompare(b.carbonatedName))
    if (search) result = result.filter(d => d.carbonatedName.toLowerCase().includes(search.toLowerCase()) || d.carbonatedNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Carbonated Detail
  http.get('/api/carbonated/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = carbonatedData.find(d => d.carbonatedId === id)
    if (!item) return HttpResponse.json({ error: 'Carbonated not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Juice List
  http.get('/api/juice', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...juiceData]
    if (sort === 'name') result.sort((a, b) => a.juiceName.localeCompare(b.juiceName))
    if (search) result = result.filter(d => d.juiceName.toLowerCase().includes(search.toLowerCase()) || d.juiceNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Juice Detail
  http.get('/api/juice/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = juiceData.find(d => d.juiceId === id)
    if (!item) return HttpResponse.json({ error: 'Juice not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Syrup List
  http.get('/api/syrup', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...syrupData]
    if (sort === 'name') result.sort((a, b) => a.syrupName.localeCompare(b.syrupName))
    if (search) result = result.filter(d => d.syrupName.toLowerCase().includes(search.toLowerCase()) || d.syrupNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Syrup Detail
  http.get('/api/syrup/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = syrupData.find(d => d.syrupId === id)
    if (!item) return HttpResponse.json({ error: 'Syrup not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Garnishes List
  http.get('/api/garnishes', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...garnishesData]
    if (sort === 'name') result.sort((a, b) => a.garnishName.localeCompare(b.garnishName))
    if (search) result = result.filter(d => d.garnishName.toLowerCase().includes(search.toLowerCase()) || d.garnishNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Garnishes Detail
  http.get('/api/garnishes/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = garnishesData.find(d => d.garnishId === id)
    if (!item) return HttpResponse.json({ error: 'Garnish not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Dairy & Cream List
  http.get('/api/dairy-cream', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...dairyCreamData]
    if (sort === 'name') result.sort((a, b) => a.dairyCreamName.localeCompare(b.dairyCreamName))
    if (search) result = result.filter(d => d.dairyCreamName.toLowerCase().includes(search.toLowerCase()) || d.dairyCreamNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Dairy & Cream Detail
  http.get('/api/dairy-cream/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = dairyCreamData.find(d => d.dairyCreamId === id)
    if (!item) return HttpResponse.json({ error: 'Dairy/Cream not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Other Ingredients List
  http.get('/api/other-ingredients', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...otherIngredientsData]
    if (sort === 'name') result.sort((a, b) => a.otherIngredientName.localeCompare(b.otherIngredientName))
    if (search) result = result.filter(d => d.otherIngredientName.toLowerCase().includes(search.toLowerCase()) || d.otherIngredientNameKr.includes(search) || d.brandName.toLowerCase().includes(search.toLowerCase()))
    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),

  // Other Ingredients Detail
  http.get('/api/other-ingredients/:id', async ({ params }) => {
    await delay(1000)
    const id = parseInt(params.id as string)
    const item = otherIngredientsData.find(d => d.otherIngredientId === id)
    if (!item) return HttpResponse.json({ error: 'Other ingredient not found' }, { status: 404 })
    return HttpResponse.json({ data: item })
  }),

  // Unified Ingredients List
  http.get('/api/ingredients', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let result = [...unifiedIngredientsData]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(item => {
        const name = getNameByType(item).toLowerCase()
        const nameKr = getNameKrByType(item).toLowerCase()
        const brandName = (item.brandName ?? '').toLowerCase()
        const brandNameKr = (item.brandNameKr ?? '').toLowerCase()
        return name.includes(searchLower) || nameKr.includes(searchLower) || brandName.includes(searchLower) || brandNameKr.includes(searchLower)
      })
    }

    if (sort === 'name') {
      result.sort((a, b) => getNameByType(a).localeCompare(getNameByType(b)))
    } else {
      result.reverse()
    }

    return HttpResponse.json({ data: paginate(result, page, limit) })
  }),
]
