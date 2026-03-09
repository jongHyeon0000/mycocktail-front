import { http, HttpResponse, delay } from 'msw'

const glasswareFullData = [
  {
    glassId: 1,
    glassName: "Coupe Glass",
    glassNameKr: "쿠프 글라스",
    glassType: "stemmed",
    image: "https://via.placeholder.com/200x200/E6E6FA/000000?text=Coupe",
    notes: "<p>1920년대 클래식 칵테일의 상징적인 잔입니다.</p><p>넓은 입구로 칵테일의 아로마를 즐기기에 적합하며, 우아한 스템 디자인이 특징입니다.</p>",
    primaryPurpose: "<p>스트레이트 업으로 서빙하는 클래식 칵테일에 주로 사용됩니다.</p><p>마티니, 맨해튼, 사이드카 등의 칵테일에 적합합니다.</p>",
    servingStyle: "straight_up",
    temperatureRetention: "moderate",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    availableCocktails: [
      { id: 1, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Manhattan" },
      { id: 2, name: "Sidecar", nameKr: "사이드카", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Sidecar" },
      { id: 3, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Daiquiri" }
    ]
  },
  {
    glassId: 2,
    glassName: "Martini Glass",
    glassNameKr: "마티니 글라스",
    glassType: "stemmed",
    image: "https://via.placeholder.com/200x200/87CEEB/000000?text=Martini",
    notes: "<p>V자 형태의 아이코닉한 칵테일 글라스입니다.</p><p>긴 스템이 손의 온도가 칵테일에 전달되는 것을 방지합니다.</p>",
    primaryPurpose: "<p>차갑게 서빙되는 스피릿 베이스 칵테일에 사용됩니다.</p><p>마티니, 코스모폴리탄 등의 클래식 칵테일에 완벽합니다.</p>",
    servingStyle: "straight_up",
    temperatureRetention: "good",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-19",
    availableCocktails: [
      { id: 4, name: "Martini", nameKr: "마티니", image: "https://via.placeholder.com/80x80/E6E6FA/000000?text=Martini" },
      { id: 5, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Cosmo" },
      { id: 6, name: "Aviation", nameKr: "에비에이션", image: "https://via.placeholder.com/80x80/9370DB/FFFFFF?text=Aviation" }
    ]
  },
  {
    glassId: 3,
    glassName: "Old Fashioned Glass",
    glassNameKr: "올드 패션드 글라스",
    glassType: "tumbler",
    image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=Rocks",
    notes: "<p>록스 글라스 또는 위스키 글라스로도 불리는 짧고 넓은 텀블러입니다.</p><p>두꺼운 유리로 제작되어 내구성이 뛰어나며, 얼음과 함께 서빙하기에 이상적입니다.</p>",
    primaryPurpose: "<p>온 더 락스 스타일의 스피릿 베이스 칵테일에 사용됩니다.</p><p>올드 패션드, 네그로니, 위스키 등을 서빙하는 데 적합합니다.</p>",
    servingStyle: "on_the_rocks",
    temperatureRetention: "excellent",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-18",
    availableCocktails: [
      { id: 7, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
      { id: 8, name: "Negroni", nameKr: "네그로니", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Negroni" },
      { id: 9, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Whiskey+Sour" }
    ]
  },
  {
    glassId: 4,
    glassName: "Highball Glass",
    glassNameKr: "하이볼 글라스",
    glassType: "tumbler",
    image: "https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Highball",
    notes: "<p>키가 크고 곧은 형태의 텀블러 글라스입니다.</p><p>롱 드링크 칵테일에 적합하며, 탄산음료와 함께 서빙하기 좋습니다.</p>",
    primaryPurpose: "<p>얼음과 탄산이 들어가는 롱 드링크 칵테일에 사용됩니다.</p><p>하이볼, 모히또, 진 토닉 등의 칵테일에 완벽합니다.</p>",
    servingStyle: "long",
    temperatureRetention: "good",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-17",
    availableCocktails: [
      { id: 10, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/7FFFD4/000000?text=Mojito" },
      { id: 11, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
      { id: 12, name: "Cuba Libre", nameKr: "쿠바 리브레", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Cuba+Libre" }
    ]
  },
  {
    glassId: 5,
    glassName: "Hurricane Glass",
    glassNameKr: "허리케인 글라스",
    glassType: "specialty",
    image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Hurricane",
    notes: "<p>허리케인 모양의 곡선형 특수 글라스입니다.</p><p>대용량 트로피컬 칵테일에 적합하며, 화려한 가니쉬를 돋보이게 합니다.</p>",
    primaryPurpose: "<p>프로즌 또는 트로피컬 롱 드링크 칵테일에 사용됩니다.</p><p>피냐 콜라다, 허리케인 등의 칵테일에 사용됩니다.</p>",
    servingStyle: "frozen",
    temperatureRetention: "moderate",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-16",
    availableCocktails: [
      { id: 13, name: "Piña Colada", nameKr: "피냐 콜라다", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=Pina+Colada" },
      { id: 14, name: "Hurricane", nameKr: "허리케인", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Hurricane" },
      { id: 15, name: "Zombie", nameKr: "좀비", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Zombie" }
    ]
  },
  {
    glassId: 6,
    glassName: "Irish Coffee Mug",
    glassNameKr: "아이리시 커피 머그",
    glassType: "mug",
    image: "https://via.placeholder.com/200x200/654321/FFFFFF?text=Irish+Coffee",
    notes: "<p>손잡이가 달린 내열 유리 머그입니다.</p><p>뜨거운 칵테일을 서빙하기에 적합하며, 층을 이루는 모습을 볼 수 있습니다.</p>",
    primaryPurpose: "<p>뜨거운 커피 베이스 칵테일에 사용됩니다.</p><p>아이리시 커피, 핫 토디 등의 온열 칵테일에 완벽합니다.</p>",
    servingStyle: "hot",
    temperatureRetention: "excellent",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    availableCocktails: [
      { id: 16, name: "Irish Coffee", nameKr: "아이리시 커피", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Irish+Coffee" },
      { id: 17, name: "Hot Toddy", nameKr: "핫 토디", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Hot+Toddy" },
      { id: 18, name: "Mulled Wine", nameKr: "멀드 와인", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Mulled+Wine" }
    ]
  }
]

export const glasswareHandlers = [
  /*
   * 서빙 잔 Glassware List
   */
  http.get('/api/glassware', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let sortedData = [...glasswareFullData]

    if (sort === 'name') {
      sortedData.sort((a, b) => a.glassName.localeCompare(b.glassName))
    }

    if (search) {
      sortedData = sortedData.filter(glass =>
        glass.glassName.toLowerCase().includes(search.toLowerCase()) ||
        glass.glassNameKr.includes(search)
      )
    }

    const startIndex = (page - 1) * limit
    const paginatedData = sortedData.slice(startIndex, startIndex + limit)

    return HttpResponse.json({ code: 'OK', message: '성공', data: paginatedData })
  }),

  /*
   * 서빙 잔 Detail (개별 조회)
   */
  http.get('/api/glassware/:id', async ({ params }) => {
    await delay(1000)
    const glassId = parseInt(params.id as string)
    const glassData = glasswareFullData.find(g => g.glassId === glassId)

    if (!glassData) {
      return HttpResponse.json({ code: 'NOT_FOUND', message: '글라스웨어를 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    return HttpResponse.json({ code: 'OK', message: '성공', data: glassData })
  }),
]
