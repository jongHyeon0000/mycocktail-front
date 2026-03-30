import { http, HttpResponse, delay } from 'msw'

const toolFullData = [
  {
    toolId: 1,
    toolName: "Boston Shaker",
    toolNameKr: "보스턴 셰이커",
    notes: "<p>보스턴 셰이커는 금속 틴과 유리 틴으로 구성된 두 피스 구조의 셰이커입니다. 코블러 셰이커와 달리 내장 스트레이너가 없어 별도의 스트레이너가 필요하지만, 더 빠르고 효율적인 작업이 가능합니다.</p><p>금속 틴은 내구성이 뛰어나고 유리 틴은 재료의 색상과 양을 확인할 수 있어 실용적입니다. 대용량 제작에도 적합하여 바쁜 바 환경에서 특히 유용합니다.</p>",
    toolCategory: "shaker",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>셰이킹이 필요한 칵테일 제작 시 사용:</strong></p><ul><li>시트러스 주스가 포함된 칵테일 (사워류)</li><li>크림이나 계란이 들어간 칵테일</li><li>시럽이나 리큐어가 포함된 복합적인 칵테일</li><li>재료들을 강하게 혼합해야 하는 경우</li></ul><p><strong>사용하지 않는 경우:</strong></p><ul><li>스피릿만으로 구성된 칵테일 (마티니, 맨해튼 등)</li><li>스털링으로 만드는 칵테일</li><li>탄산이 들어간 칵테일</li></ul>",
    alternativeTools: "<p><strong>코블러 셰이커:</strong> 내장 스트레이너가 있는 3피스 셰이커로 초보자에게 사용하기 쉽지만, 속도와 효율성에서는 보스턴 셰이커에 비해 떨어집니다.</p><p><strong>프렌치 셰이커:</strong> 두 개의 금속 틴으로 구성된 셰이커로, 보스턴 셰이커와 유사하지만 분리가 더 어려울 수 있습니다.</p>",
    createAt: "2024-01-15",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 1, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d34?w=300", name: "Whiskey Sour", nameKr: "위스키 사워" },
      { id: 2, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=300", name: "Margarita", nameKr: "마가리타" },
      { id: 3, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300", name: "Daiquiri", nameKr: "다이키리" }
    ]
  },
  {
    toolId: 2,
    toolName: "Hawthorne Strainer",
    toolNameKr: "호손 스트레이너",
    notes: "<p>호손 스트레이너는 스프링이 달린 스트레이너로, 셰이킹이나 스털링 후 칵테일을 잔에 따를 때 얼음과 고형 재료를 걸러내는 데 사용됩니다.</p><p>특징적인 스프링 코일이 용기의 가장자리에 밀착되어 효과적으로 여과 작용을 합니다. 대부분의 바에서 필수적으로 사용하는 기본 도구 중 하나입니다.</p>",
    toolCategory: "strainer",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>사용하는 경우:</strong></p><ul><li>셰이킹한 칵테일을 잔에 따를 때</li><li>스털링한 칵테일에서 얼음을 걸러낼 때</li><li>과일 조각이나 허브가 들어간 칵테일 여과</li><li>더블 스트레이닝의 첫 번째 단계</li></ul><p><strong>주의사항:</strong></p><ul><li>미세한 찌꺼기까지 걸러내려면 파인 스트레이너와 함께 사용</li><li>크러쉬드 아이스 사용 시에는 특히 필요</li></ul>",
    alternativeTools: "<p><strong>줄리엣 스트레이너:</strong> 구멍이 뚫린 평평한 스트레이너로, 스털링 전용으로 사용되며 호손 스트레이너보다 여과 능력이 떨어집니다.</p><p><strong>파인 스트레이너:</strong> 더블 스트레이닝 시 함께 사용하는 미세한 망 스트레이너로, 단독 사용 시에는 효율성이 떨어집니다.</p>",
    createAt: "2024-01-20",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 4, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300", name: "Cosmopolitan", nameKr: "코스모폴리탄" },
      { id: 5, image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=300", name: "Manhattan", nameKr: "맨해튼" },
      { id: 6, image: "https://images.unsplash.com/photo-1618898909019-010e4e234c55?w=300", name: "Aviation", nameKr: "에비에이션" }
    ]
  },
  {
    toolId: 3,
    toolName: "Jigger",
    toolNameKr: "지거",
    notes: "<p>지거는 정확한 레시피 구현을 위해 술과 재료를 정밀하게 계량하는 도구입니다. 일반적으로 양쪽 끝이 다른 용량을 가지고 있어 다양한 레시피에 대응할 수 있습니다.</p><p>가장 일반적인 조합은 1oz(30ml)와 0.5oz(15ml)이며, 일부는 1.5oz와 0.75oz 조합도 있습니다. 정확한 계량은 일관된 맛의 칵테일을 만드는 핵심입니다.</p>",
    toolCategory: "measuring",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>항상 사용해야 하는 경우:</strong></p><ul><li>모든 칵테일 제작 시 재료 계량</li><li>레시피 테스트 및 개발</li><li>일관된 맛 유지가 필요한 상업적 환경</li><li>새로운 레시피 학습 시</li></ul><p><strong>특히 중요한 상황:</strong></p><ul><li>강한 술이 들어가는 칵테일</li><li>밸런스가 중요한 클래식 칵테일</li><li>비싼 재료를 사용하는 경우</li></ul>",
    alternativeTools: "<p><strong>바 스푼:</strong> 1 바 스푼 = 약 0.125oz(3.7ml)로 소량 계량에 사용할 수 있지만 정확도가 떨어집니다.</p><p><strong>계량컵:</strong> 큰 용량 계량에는 유용하지만 칵테일 제작에는 부정확하고 비효율적입니다.</p><p><strong>푸어러 카운트:</strong> 숙련된 바텐더의 방법이지만 정확도가 떨어지고 일관성을 보장하기 어렵습니다.</p>",
    createAt: "2024-02-01",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 7, image: "https://images.unsplash.com/photo-1560508619-e5d8c0f4e3e5?w=300", name: "Negroni", nameKr: "네그로니" },
      { id: 8, image: "https://images.unsplash.com/photo-1606657467752-46b5f1cd5b6c?w=300", name: "Martini", nameKr: "마티니" }
    ]
  },
  {
    toolId: 4,
    toolName: "Bar Spoon",
    toolNameKr: "바 스푼",
    notes: "<p>바 스푼은 긴 손잡이를 가진 스푼으로 칵테일을 저어 혼합하거나 가니쉬 작업에 사용합니다. 특징적인 트위스트된 손잡이는 효율적인 스털링을 위해 설계되었습니다.</p><p>길이는 보통 30-40cm이며, 끝부분이 다양한 형태(포크, 머들러, 플랫)로 되어 있어 다목적으로 사용 가능합니다. 스털링뿐만 아니라 레이어링, 가니쉬 배치 등에도 활용됩니다.</p>",
    toolCategory: "mixing",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>스털링이 필요한 칵테일:</strong></p><ul><li>스피릿 베이스 칵테일 (마티니, 맨해튼, 네그로니)</li><li>온더락 칵테일 (올드 패션드)</li><li>아이스가 많이 들어간 칵테일</li></ul><p><strong>가니쉬 작업:</strong></p><ul><li>체리나 올리브 올리기</li><li>레몬 트위스트 배치</li><li>레이어링 칵테일 제작</li></ul><p><strong>기타 용도:</strong></p><ul><li>소량 재료 계량 (1 바스푼 = 3.7ml)</li><li>재료 혼합 확인</li></ul>",
    alternativeTools: "<p><strong>일반 스푼:</strong> 길이가 짧아 깊은 글라스에서 사용하기 어렵고 효율성이 떨어집니다.</p><p><strong>젓가락:</strong> 임시 대용으로 사용 가능하지만 스털링 효과가 제한적입니다.</p><p><strong>나이프:</strong> 가니쉬 작업에는 사용할 수 있지만 스털링에는 부적합합니다.</p>",
    createAt: "2024-02-10",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 9, image: "https://images.unsplash.com/photo-1575285863652-e4b9e7b75a9c?w=300", name: "Old Fashioned", nameKr: "올드 패션드" },
      { id: 10, image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300", name: "Sazerac", nameKr: "새저랙" },
      { id: 11, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300", name: "Boulevardier", nameKr: "불러바디에" }
    ]
  },
  {
    toolId: 5,
    toolName: "Muddler",
    toolNameKr: "머들러",
    notes: "<p>머들러는 과일이나 허브를 으깨어 칵테일에 풍미를 더할 때 사용하는 도구입니다. 주로 목재나 스테인리스 스틸로 제작되며, 끝부분이 평평하게 되어 있어 효과적으로 재료를 으깰 수 있습니다.</p><p>목재 머들러는 허브에 부드럽고, 스테인리스 스틸은 과일에 효과적입니다. 적절한 압력으로 사용해야 쓴맛을 피할 수 있습니다.</p>",
    toolCategory: "muddling",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>허브류 (부드럽게):</strong></p><ul><li>모히또 - 민트 잎</li><li>바질 스매시 - 바질 잎</li><li>로즈마리 칵테일 - 로즈마리</li></ul><p><strong>과일류 (충분히):</strong></p><ul><li>카이피리냐 - 라임</li><li>올드 패션드 - 오렌지</li><li>위스키 스매시 - 레몬</li></ul><p><strong>주의사항:</strong></p><ul><li>허브는 과도하게 으깨면 쓴맛 발생</li><li>과일은 충분히 으깨야 과즙 추출</li><li>글라스 바닥에서만 작업</li></ul>",
    alternativeTools: "<p><strong>바 스푼 끝:</strong> 일부 바스푼 끝이 머들러 형태로 되어 있어 소량 작업에 사용 가능하지만 효율성이 떨어집니다.</p><p><strong>나무 스푼:</strong> 임시 대용으로 사용할 수 있지만 길이와 효율성에서 제한적입니다.</p><p><strong>포크:</strong> 라임 등 작은 과일에는 사용 가능하지만 허브류에는 부적합합니다.</p>",
    createAt: "2024-02-15",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 12, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300", name: "Mojito", nameKr: "모히또" },
      { id: 13, image: "https://images.unsplash.com/photo-1605270012917-bf3c5f575f85?w=300", name: "Caipirinha", nameKr: "카이피리냐" },
      { id: 14, image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=300", name: "Mint Julep", nameKr: "민트 줄렙" }
    ]
  },
  {
    toolId: 6,
    toolName: "Citrus Peeler",
    toolNameKr: "시트러스 필러",
    notes: "<p>시트러스 필러는 레몬, 라임, 오렌지 등의 껍질을 얇고 균일하게 벗겨 아름다운 트위스트 가니쉬를 만들 수 있게 해주는 전문 도구입니다.</p><p>날카로운 블레이드가 과일의 표면만을 얇게 벗겨내어 쓴맛이 나는 흰 부분(피스)을 피할 수 있습니다. 일정한 폭과 두께로 껍질을 벗길 수 있어 전문적인 가니쉬 제작이 가능합니다.</p>",
    toolCategory: "garnish",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
    whenToUseNotes: "<p><strong>트위스트 가니쉬가 필요한 칵테일:</strong></p><ul><li>마티니 - 레몬 트위스트</li><li>올드 패션드 - 오렌지 트위스트</li><li>네그로니 - 오렌지 필</li><li>사이드카 - 레몬 트위스트</li></ul><p><strong>작업 팁:</strong></p><ul><li>신선하고 껍질이 두꺼운 과일 선택</li><li>일정한 압력으로 길게 벗기기</li><li>사용 직전에 껍질 제작하여 신선도 유지</li></ul>",
    alternativeTools: "<p><strong>파링 나이프:</strong> 작은 날로 껍질을 벗길 수 있지만 일정한 두께를 유지하기 어렵고 기술이 필요합니다.</p><p><strong>감자깎이:</strong> 넓은 껍질을 만들 수 있지만 두께 조절이 어렵고 모양이 불규칙합니다.</p><p><strong>제스터:</strong> 잘게 간 제스트는 만들 수 있지만 트위스트 가니쉬용 긴 껍질은 만들 수 없습니다.</p>",
    createAt: "2024-02-20",
    updatedAt: new Date().toISOString().split('T')[0],
    availableCocktails: [
      { id: 15, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d34?w=300", name: "Sidecar", nameKr: "사이드카" },
      { id: 16, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=300", name: "Corpse Reviver", nameKr: "코프스 리바이버" }
    ]
  }
]

export const toolHandlers = [
  /*
   * 바 도구 List
   */
  http.get('/api/tool', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''
    const categorySort = url.searchParams.get('categorySort') ?? 'all'

    let sortedData = [...toolFullData]

    if (sort === 'name') {
      sortedData.sort((a, b) => a.toolName.localeCompare(b.toolName))
    }

    if (search) {
      sortedData = sortedData.filter(tool =>
        tool.toolName.toLowerCase().includes(search.toLowerCase()) ||
        tool.toolNameKr.includes(search) ||
        tool.notes.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (categorySort && categorySort !== 'all') {
      sortedData = sortedData.filter(tool => tool.toolCategory === categorySort)
    }

    const startIndex = (page - 1) * limit
    const paginatedData = sortedData.slice(startIndex, startIndex + limit)

    return HttpResponse.json({ code: 'OK', message: '성공', data: paginatedData })
  }),

  /*
   * Tool Detail (개별 조회)
   */
  http.get('/api/tool/:id', async ({ params }) => {
    await delay(1000)
    const toolId = parseInt(params.id as string)
    const toolData = toolFullData.find(t => t.toolId === toolId)

    if (!toolData) {
      return HttpResponse.json({ code: 'NOT_FOUND', message: '바 도구를 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    return HttpResponse.json({ code: 'OK', message: '성공', data: toolData })
  }),
]
