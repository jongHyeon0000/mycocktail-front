import { http, HttpResponse, delay } from 'msw'

const spiritFullData = [
  {
    spiritProductId: 1,
    spiritName: "Hennessy X.O",
    spiritNameKr: "헤네시 X.O",
    image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Hennessy+XO",
    profileNote: "깊고 복합적인 향미의 프리미엄 코냑",
    historyNote: "<p>헤네시 X.O는 1870년 Maurice Hennessy에 의해 창조된 세계 최초의 X.O 코냑입니다.</p><p>150년 넘는 전통을 자랑하며, 100개 이상의 오드비를 블렌딩하여 만들어집니다.</p>",
    note: "<p>헤네시 X.O는 깊고 강렬한 호박색을 띠며, 복합적이고 균형 잡힌 향미를 자랑합니다.</p><p>초콜릿, 건포도, 무화과 등의 풍부한 아로마가 특징입니다.</p>",
    personalNotes: "개인적으로 가장 좋아하는 코냑 중 하나입니다. 특별한 날에만 마시는 프리미엄 스피릿으로, 긴 여운과 복합적인 맛이 인상적입니다.",
    spiritCategory: "brandy",
    brand: { brandId: 1, brandName: "Hennessy", brandNameKr: "헤네시" },
    country: { countryId: 1, countryName: "France", countryNameKr: "프랑스" },
    absPercentage: 40,
    volumeMl: 700,
    sweetness: 4,
    citrus: 2,
    herbal: 1,
    createAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDiscontinued: false,
    price: 180000,
    availableCocktails: [
      { id: 1, name: "Sidecar", nameKr: "사이드카", image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Sidecar" },
      { id: 2, name: "French Connection", nameKr: "프렌치 커넥션", image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=French" },
      { id: 3, name: "Brandy Alexander", nameKr: "브랜디 알렉산더", image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Alexander" }
    ]
  },
  {
    spiritProductId: 2,
    spiritName: "Macallan 18 Years",
    spiritNameKr: "맥캘란 18년",
    image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=Macallan+18",
    profileNote: "셰리 캐스크에서 숙성된 싱글 몰트 스카치 위스키",
    historyNote: "<p>맥캘란은 1824년 스코틀랜드에서 창립된 유서 깊은 위스키 브랜드입니다.</p><p>18년 숙성 제품은 셰리 오크 캐스크에서만 숙성되어 독특한 풍미를 선사합니다.</p>",
    note: "<p>진한 마호가니 색상과 함께 건포도, 오렌지, 스파이시한 생강의 향이 어우러집니다.</p><p>부드럽고 풍부한 맛과 긴 여운이 특징입니다.</p>",
    personalNotes: "한정 생산으로 구하기 어려운 제품입니다. 위스키 애호가라면 반드시 시도해봐야 할 명품 위스키입니다.",
    spiritCategory: "whiskey",
    brand: { brandId: 2, brandName: "Macallan", brandNameKr: "맥캘란" },
    country: { countryId: 2, countryName: "Scotland", countryNameKr: "스코틀랜드" },
    absPercentage: 43,
    volumeMl: 700,
    sweetness: 3,
    citrus: 3,
    herbal: 2,
    createAt: "2024-01-10",
    updatedAt: "2024-01-18",
    isDiscontinued: true,
    price: 450000,
    availableCocktails: [
      { id: 4, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old" },
      { id: 5, name: "Whisky Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour" }
    ]
  },
  {
    spiritProductId: 3,
    spiritName: "Grey Goose",
    spiritNameKr: "그레이 구스",
    image: "https://via.placeholder.com/200x200/C0C0C0/000000?text=Grey+Goose",
    profileNote: "프랑스산 프리미엄 보드카",
    historyNote: "<p>그레이 구스는 1997년 프랑스에서 탄생한 프리미엄 보드카 브랜드입니다.</p><p>프랑스 피카르디 지역의 최고급 밀을 사용하여 제조됩니다.</p>",
    note: "<p>부드럽고 깔끔한 맛이 특징이며, 어떤 칵테일과도 잘 어울립니다.</p><p>5번의 증류 과정을 거쳐 순수함을 극대화했습니다.</p>",
    personalNotes: "마티니를 만들 때 항상 사용하는 보드카입니다. 깔끔하고 순수한 맛이 일품입니다.",
    spiritCategory: "vodka",
    brand: { brandId: 3, brandName: "Grey Goose", brandNameKr: "그레이 구스" },
    country: { countryId: 1, countryName: "France", countryNameKr: "프랑스" },
    absPercentage: 40,
    volumeMl: 750,
    sweetness: 1,
    citrus: 1,
    herbal: 1,
    createAt: "2024-01-12",
    updatedAt: "2024-01-16",
    isDiscontinued: false,
    price: 85000,
    availableCocktails: [
      { id: 6, name: "Vodka Martini", nameKr: "보드카 마티니", image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Martini" },
      { id: 7, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Cosmo" },
      { id: 8, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Mule" }
    ]
  },
  {
    spiritProductId: 4,
    spiritName: "Don Julio 1942",
    spiritNameKr: "돈 훌리오 1942",
    image: "https://via.placeholder.com/200x200/DAA520/000000?text=Don+Julio",
    profileNote: "아가베 100%로 만든 최고급 아네호 테킬라",
    historyNote: "<p>돈 훌리오는 1942년 돈 훌리오 곤잘레스가 설립한 테킬라 브랜드입니다.</p><p>최상급 블루 아가베만을 사용하여 전통 방식으로 제조합니다.</p>",
    note: "<p>2년 6개월 이상 오크통에서 숙성된 아네호 테킬라로, 부드럽고 복합적인 맛을 자랑합니다.</p><p>바닐라, 캐러멜, 스파이스의 조화로운 풍미가 특징입니다.</p>",
    personalNotes: "테킬라의 고정관념을 바꿔준 제품입니다. 스트레이트로 마셔도 전혀 부담스럽지 않은 프리미엄 스피릿입니다.",
    spiritCategory: "tequila",
    brand: { brandId: 4, brandName: "Don Julio", brandNameKr: "돈 훌리오" },
    country: { countryId: 3, countryName: "Mexico", countryNameKr: "멕시코" },
    absPercentage: 38,
    volumeMl: 750,
    sweetness: 3,
    citrus: 2,
    herbal: 3,
    createAt: "2024-01-08",
    updatedAt: "2024-01-14",
    isDiscontinued: false,
    price: 320000,
    availableCocktails: [
      { id: 9, name: "Margarita", nameKr: "마가리타", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita" },
      { id: 10, name: "Paloma", nameKr: "팔로마", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Paloma" }
    ]
  },
  {
    spiritProductId: 5,
    spiritName: "Bombay Sapphire",
    spiritNameKr: "봄베이 사파이어",
    image: "https://via.placeholder.com/200x200/4169E1/FFFFFF?text=Bombay+Sapphire",
    profileNote: "10가지 식물성 원료로 만든 프리미엄 진",
    historyNote: "<p>봄베이 사파이어는 1987년 출시된 프리미엄 진 브랜드입니다.</p><p>10가지 식물성 보태니컬을 사용하여 독특한 풍미를 만들어냅니다.</p>",
    note: "<p>주니퍼 베리를 중심으로 코리안더, 안젤리카 루트 등의 보태니컬이 조화롭게 어우러집니다.</p><p>깔끔하면서도 복합적인 맛이 특징입니다.</p>",
    personalNotes: "진 토닉을 만들 때 가장 선호하는 진입니다. 식물성 향이 풍부하면서도 균형잡힌 맛이 매력적입니다.",
    spiritCategory: "gin",
    brand: { brandId: 5, brandName: "Bombay Sapphire", brandNameKr: "봄베이 사파이어" },
    country: { countryId: 4, countryName: "England", countryNameKr: "영국" },
    absPercentage: 47,
    volumeMl: 750,
    sweetness: 1,
    citrus: 4,
    herbal: 5,
    createAt: "2024-01-05",
    updatedAt: "2024-01-12",
    isDiscontinued: false,
    price: 52000,
    availableCocktails: [
      { id: 11, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=G&T" },
      { id: 12, name: "Negroni", nameKr: "네그로니", image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni" },
      { id: 13, name: "Tom Collins", nameKr: "톰 콜린스", image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Collins" }
    ]
  },
  {
    spiritProductId: 6,
    spiritName: "Bacardi Gran Reserva Limitada",
    spiritNameKr: "바카디 그란 레세르바 리미타다",
    image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Bacardi+Gran",
    profileNote: "16년 숙성된 한정판 프리미엄 럼",
    historyNote: "<p>바카디는 1862년 쿠바에서 시작된 세계적인 럼 브랜드입니다.</p><p>그란 레세르바 리미타다는 16년간 오크통에서 숙성된 최고급 럼입니다.</p>",
    note: "<p>진한 호박색을 띠며, 바닐라, 꿀, 토피의 달콤한 향이 특징입니다.</p><p>부드럽고 깊은 맛과 긴 여운을 선사합니다.</p>",
    personalNotes: "단종된 제품이라 더욱 소중한 럼입니다. 스트레이트로 음미할 때의 깊은 맛이 잊히지 않습니다.",
    spiritCategory: "rum",
    brand: { brandId: 6, brandName: "Bacardi", brandNameKr: "바카디" },
    country: { countryId: 5, countryName: "Cuba", countryNameKr: "쿠바" },
    absPercentage: 40,
    volumeMl: 750,
    sweetness: 4,
    citrus: 1,
    herbal: 2,
    createAt: "2024-01-03",
    updatedAt: "2024-01-10",
    isDiscontinued: true,
    price: 280000,
    availableCocktails: [
      { id: 14, name: "Dark 'n' Stormy", nameKr: "다크 앤 스토미", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Dark" },
      { id: 15, name: "Rum Old Fashioned", nameKr: "럼 올드 패션드", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Rum+OF" }
    ]
  }
]

export const spiritHandlers = [
  /*
   * 스피릿 Product List
   */
  http.get('/api/spirit-product', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''
    const spiritCategory = url.searchParams.get('spiritCategory') ?? ''

    let sortedData = [...spiritFullData]

    if (sort === 'name') {
      sortedData.sort((a, b) => a.spiritName.localeCompare(b.spiritName))
    }

    if (spiritCategory) {
      sortedData = sortedData.filter(spirit => spirit.spiritCategory === spiritCategory)
    }

    if (search) {
      sortedData = sortedData.filter(spirit =>
        spirit.spiritName.toLowerCase().includes(search.toLowerCase()) ||
        spirit.spiritNameKr.includes(search)
      )
    }

    const startIndex = (page - 1) * limit
    const paginatedData = sortedData.slice(startIndex, startIndex + limit)

    return HttpResponse.json({ code: 'OK', message: '성공', data: paginatedData })
  }),

  /*
   * 스피릿 Product Detail (개별 조회)
   */
  http.get('/api/spirit-product/:id', async ({ params }) => {
    await delay(1000)
    const spiritProductId = parseInt(params.id as string)
    const spiritData = spiritFullData.find(s => s.spiritProductId === spiritProductId)

    if (!spiritData) {
      return HttpResponse.json({ code: 'NOT_FOUND', message: '스피릿 상품을 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    return HttpResponse.json({ code: 'OK', message: '성공', data: spiritData })
  }),
]
