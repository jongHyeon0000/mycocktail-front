import { http, HttpResponse, delay } from 'msw'

const techniqueFullData = [
  {
    techniqueId: 1,
    techniqueName: "Shaking",
    techniqueNameKr: "쉐이킹",
    techniqueCategory: "shaking",
    image: "https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Shaking",
    notes: "<p>쉐이커에 재료와 얼음을 넣고 강하게 흔드는 기법입니다.</p><p>재료를 빠르게 차갑게 만들고 혼합하며, 공기를 주입하여 부드러운 질감을 만듭니다.</p>",
    whenToUseNotes: "<p>과일 주스, 크림, 계란 흰자 등 무거운 재료를 포함한 칵테일에 사용합니다.</p><p>재료를 완전히 유화시키고 차갑게 만들어야 할 때 적합합니다.</p>",
    dilutionLevel: "medium",
    aerationLevel: "high",
    temperatureChange: "chill",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 1, name: "Margarita", nameKr: "마가리타", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Margarita" },
      { id: 2, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Cosmo" },
      { id: 3, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Daiquiri" }
    ]
  },
  {
    techniqueId: 2,
    techniqueName: "Stirring",
    techniqueNameKr: "스터링",
    techniqueCategory: "stirring",
    image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Stirring",
    notes: "<p>믹싱 글라스에 재료와 얼음을 넣고 바 스푼으로 부드럽게 저어주는 기법입니다.</p><p>재료를 차갑게 만들면서도 맑고 깨끗한 질감을 유지합니다.</p>",
    whenToUseNotes: "<p>스피릿 베이스의 투명한 칵테일에 사용합니다.</p><p>재료의 맑은 질감을 유지하면서 차갑게 만들고 싶을 때 적합합니다.</p>",
    dilutionLevel: "low",
    aerationLevel: "none",
    temperatureChange: "chill",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-19",
    availableCocktails: [
      { id: 4, name: "Martini", nameKr: "마티니", image: "https://via.placeholder.com/80x80/E6E6FA/000000?text=Martini" },
      { id: 5, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Manhattan" },
      { id: 6, name: "Negroni", nameKr: "네그로니", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Negroni" }
    ]
  },
  {
    techniqueId: 3,
    techniqueName: "Muddling",
    techniqueNameKr: "머들링",
    techniqueCategory: "muddling",
    image: "https://via.placeholder.com/200x200/228B22/FFFFFF?text=Muddling",
    notes: "<p>머들러를 사용하여 허브, 과일, 설탕 등을 으깨는 기법입니다.</p><p>재료의 에센셜 오일과 향을 추출하여 칵테일에 풍미를 더합니다.</p>",
    whenToUseNotes: "<p>민트, 바질 등의 허브나 신선한 과일의 향과 맛을 추출할 때 사용합니다.</p><p>재료의 본연의 향을 살리고 싶을 때 적합합니다.</p>",
    dilutionLevel: "none",
    aerationLevel: "low",
    temperatureChange: "none",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-18",
    availableCocktails: [
      { id: 7, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/7FFFD4/000000?text=Mojito" },
      { id: 8, name: "Caipirinha", nameKr: "까이삐리냐", image: "https://via.placeholder.com/80x80/32CD32/FFFFFF?text=Caipirinha" },
      { id: 9, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" }
    ]
  },
  {
    techniqueId: 4,
    techniqueName: "Building",
    techniqueNameKr: "빌딩",
    techniqueCategory: "building",
    image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Building",
    notes: "<p>글라스에 직접 재료를 순서대로 붓는 가장 간단한 기법입니다.</p><p>별도의 도구 없이 글라스에서 바로 칵테일을 완성합니다.</p>",
    whenToUseNotes: "<p>간단한 롱 드링크나 탄산이 들어가는 칵테일에 사용합니다.</p><p>재료의 층을 만들거나 탄산의 기포를 유지하고 싶을 때 적합합니다.</p>",
    dilutionLevel: "low",
    aerationLevel: "none",
    temperatureChange: "none",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-17",
    availableCocktails: [
      { id: 10, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
      { id: 11, name: "Cuba Libre", nameKr: "쿠바 리브레", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Cuba+Libre" },
      { id: 12, name: "Screwdriver", nameKr: "스크류드라이버", image: "https://via.placeholder.com/80x80/FFA500/000000?text=Screwdriver" }
    ]
  },
  {
    techniqueId: 5,
    techniqueName: "Layering",
    techniqueNameKr: "레이어링",
    techniqueCategory: "layering",
    image: "https://via.placeholder.com/200x200/9370DB/FFFFFF?text=Layering",
    notes: "<p>비중이 다른 재료들을 층층이 쌓아 올리는 기법입니다.</p><p>바 스푼의 뒷면을 이용하여 천천히 부어 재료가 섞이지 않도록 합니다.</p>",
    whenToUseNotes: "<p>시각적으로 아름다운 칵테일을 만들 때 사용합니다.</p><p>재료의 비중 차이를 이용하여 색다른 음용 경험을 제공하고 싶을 때 적합합니다.</p>",
    dilutionLevel: "none",
    aerationLevel: "none",
    temperatureChange: "none",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-16",
    availableCocktails: [
      { id: 13, name: "B-52", nameKr: "B-52", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=B-52" },
      { id: 14, name: "Pousse Café", nameKr: "푸스 카페", image: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=Pousse+Cafe" },
      { id: 15, name: "Irish Coffee", nameKr: "아이리시 커피", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Irish+Coffee" }
    ]
  },
  {
    techniqueId: 6,
    techniqueName: "Blending",
    techniqueNameKr: "블렌딩",
    techniqueCategory: "blending",
    image: "https://via.placeholder.com/200x200/00CED1/FFFFFF?text=Blending",
    notes: "<p>블렌더를 사용하여 재료와 얼음을 함께 갈아서 만드는 기법입니다.</p><p>슬러시 형태의 부드럽고 시원한 질감을 만들어냅니다.</p>",
    whenToUseNotes: "<p>프로즌 칵테일이나 과일을 으깨야 하는 칵테일에 사용합니다.</p><p>더운 날씨에 시원하고 부드러운 질감의 칵테일을 만들고 싶을 때 적합합니다.</p>",
    dilutionLevel: "high",
    aerationLevel: "medium",
    temperatureChange: "chill",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    availableCocktails: [
      { id: 16, name: "Frozen Margarita", nameKr: "프로즌 마가리타", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Frozen+Marg" },
      { id: 17, name: "Piña Colada", nameKr: "피냐 콜라다", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=Pina+Colada" },
      { id: 18, name: "Frozen Daiquiri", nameKr: "프로즌 다이키리", image: "https://via.placeholder.com/80x80/FFB6C1/000000?text=Frozen+Daiq" }
    ]
  }
]

export const techniqueHandlers = [
  /*
   * 제조 기법 Technique List
   */
  http.get('/api/technique', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let sortedData = [...techniqueFullData]

    if (sort === 'name') {
      sortedData.sort((a, b) => a.techniqueName.localeCompare(b.techniqueName))
    }

    if (search) {
      sortedData = sortedData.filter(technique =>
        technique.techniqueName.toLowerCase().includes(search.toLowerCase()) ||
        technique.techniqueNameKr.includes(search)
      )
    }

    const startIndex = (page - 1) * limit
    const paginatedData = sortedData.slice(startIndex, startIndex + limit)

    return HttpResponse.json({ code: 'OK', message: '성공', data: paginatedData })
  }),

  /*
   * 제조 기법 Detail (개별 조회)
   */
  http.get('/api/technique/:id', async ({ params }) => {
    await delay(1000)
    const techniqueId = parseInt(params.id as string)
    const techniqueData = techniqueFullData.find(t => t.techniqueId === techniqueId)

    if (!techniqueData) {
      return HttpResponse.json({ code: 'NOT_FOUND', message: '제조 기법을 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    return HttpResponse.json({ code: 'OK', message: '성공', data: techniqueData })
  }),
]
