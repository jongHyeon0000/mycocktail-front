import { http, HttpResponse, delay } from 'msw'

const cocktailFullData = [
  {
    cocktailId: 1,
    author: {
      userUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      username: '아야츠노 유니',
      thumbnailImage: 'https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj'
    },
    isNew: true,
    isActive: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    cocktailName: "Mojito",
    cocktailNameKr: "모히토",
    urlSlug: "mojito",
    category: "classic",
    spiritCategories: ["rum"],
    absPercentage: 10,
    servingSizeMl: 240,
    difficulty: 1,
    isVariation: false,
    profileNote: "상쾌한 민트와 라임의 조화가 완벽한 쿠바의 대표 칵테일",
    historyNote: "<p>모히토는 16세기 쿠바에서 시작된 칵테일로, 원래는 해적들이 마시던 음료였습니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>화이트 럼 60ml</li><li>신선한 민트 잎 10-12개</li><li>라임 1/2개</li><li>설탕 2티스푼</li><li>소다수</li><li>얼음</li></ul>",
    tipNote: "<p><strong>완벽한 모히토를 위한 팁:</strong></p><ul><li>민트 잎을 너무 세게 머들링하지 마세요</li></ul>",
    ingredients: {
      spirits: [
        { id: 1, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 2, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 3, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 4, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 5, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 6, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
        { id: 7, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", name: "White Rum", nameKr: "화이트 럼" },
      ],
      juices: [{ id: 1, image: "https://images.unsplash.com/photo-1557401279-8e8de6c4659b?w=100&h=100&fit=crop", name: "Lime Juice", nameKr: "라임 주스" }],
      bitters: [],
      syrups: [{ id: 1, image: "https://images.unsplash.com/photo-1572441755997-6a0e8b3c1d42?w=100&h=100&fit=crop", name: "Simple Syrup", nameKr: "심플 시럽" }],
      carbonated: [{ id: 1, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop", name: "Soda Water", nameKr: "소다수" }],
      dairy: [],
      garnishes: [{ id: 1, image: "https://images.unsplash.com/photo-1607103688605-8a06a4a4c4fc?w=100&h=100&fit=crop", name: "Mint Leaves", nameKr: "민트 잎" }],
      others: [{ id: 1, image: "https://images.unsplash.com/photo-1571167025672-ca4cb3cd8af1?w=100&h=100&fit=crop", name: "Sugar", nameKr: "설탕" }]
    },
    tools: [{ id: 1, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", name: "Muddler", nameKr: "머들러" }],
    glassware: [{ id: 1, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop", name: "Highball Glass", nameKr: "하이볼 글라스" }],
    techniques: [{ id: 1, techniqueName: "Muddling", techniqueNameKr: "머들링" }],
    personalNotes: "처음 만들어본 칵테일이에요. 생각보다 간단해서 놀랐고, 민트향이 정말 상쾌했습니다!",
    makerTips: "민트를 너무 세게 으깨면 정말 쓴맛이 나더라고요.",
    personalReview: "여름에 마시기 정말 좋은 칵테일이에요.",
    hashtags: { cocktailHashtagId: 1, cocktailHashtag: "모히토,쿠바,민트,상쾌한,여름칵테일,럼베이스,클래식" },
    viewCount: 542,
    likeCount: 127,
    shareCount: 45,
    comments: [
      {
        commentId: 1,
        author: {
          userId: 2,
          userUuid: 'b2c3d4e5-f6a7-8901-bcde-f01234567891',
          username: '아라하시 타비',
          thumbnailImage: 'https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/082/459/727/82459727_1714360862118_1_600x600.JPG'
        },
        cocktailId: 1,
        parentCommentId: undefined,
        content: '민트를 너무 세게 으깼다가 망했어;; 살살 눌러줘야대',
        depth: 0,
        isChildComment: false,
        sortOrder: 0,
        replies: [
          {
            commentId: 3,
            author: {
              userId: 1,
              userUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
              username: '아야츠노 유니',
              thumbnailImage: 'https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj'
            },
            cocktailId: 1,
            parentCommentId: 1,
            content: 'ㅇㅈㅇㅈ',
            depth: 1,
            isChildComment: true,
            sortOrder: 1,
            createdAt: '2024-11-16T10:30:00',
            updatedAt: '2024-11-16T10:30:00'
          },
          {
            commentId: 4,
            author: {
              userId: 1,
              userUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
              username: '아야츠노 유니',
              thumbnailImage: 'https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj'
            },
            cocktailId: 1,
            parentCommentId: 1,
            content: '나두 처음엔 너무 세게 눌렀다가 실패했어ㅎㅎ',
            depth: 1,
            isChildComment: true,
            sortOrder: 2,
            createdAt: '2024-11-16T12:00:00',
            updatedAt: '2024-11-16T12:00:00'
          }
        ],
        createdAt: '2024-11-16T09:00:00',
        updatedAt: '2024-11-16T09:00:00'
      },
      {
        commentId: 2,
        author: {
          userId: 3,
          userUuid: 'c3d4e5f6-a7b8-9012-cdef-012345678902',
          username: '아오쿠모 린',
          thumbnailImage: 'https://i.namu.wiki/i/2q4XJfx3uT9A-CxXVEkXjT4YwhXVAWIwYnFUmB3fmjkAZTEo78qOgRZldT-KAjwFW-30KDl4kdXLEGmmcCmBjg.webp'
        },
        cocktailId: 1,
        parentCommentId: undefined,
        content: '설탕 대신 아가베 시럽 써봤는데 훨씬 자연스러운 단맛이 나더라고요. 엣헴',
        depth: 0,
        isChildComment: false,
        sortOrder: 0,
        replies: [],
        createdAt: '2024-11-17T14:20:00',
        updatedAt: '2024-11-17T14:20:00'
      }
    ],
    createdAt: '2024-11-15',
    updatedAt: '2024-11-15'
  },
  {
    cocktailId: 2,
    author: {
      userUuid: 'b2c3d4e5-f6a7-8901-bcde-f01234567891',
      username: '아라하시 타비',
      thumbnailImage: 'https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/082/459/727/82459727_1714360862118_1_600x600.JPG'
    },
    isNew: false,
    isActive: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    cocktailName: "Margarita",
    cocktailNameKr: "마가리타",
    urlSlug: "margarita",
    category: "classic",
    spiritCategories: ["tequila"],
    absPercentage: 15,
    servingSizeMl: 150,
    difficulty: 2,
    isVariation: false,
    profileNote: "데킬라 베이스의 멕시코 전통 칵테일, 소금테 림이 특징",
    historyNote: "<p>마가리타는 1940년대 멕시코에서 탄생한 칵테일입니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>데킬라 60ml</li><li>라임 주스 30ml</li><li>트리플 섹 15ml</li><li>소금</li></ul>",
    tipNote: "<p><strong>완벽한 마가리타를 위한 팁:</strong></p><ul><li>글라스 림에 소금을 묻히는 것이 포인트입니다</li></ul>",
    ingredients: {
      spirits: [{ id: 1, name: "Tequila", nameKr: "데킬라" }],
      juices: [{ id: 1, name: "Lime Juice", nameKr: "라임 주스" }],
      bitters: [],
      syrups: [],
      carbonated: [],
      dairy: [],
      garnishes: [{ id: 1, name: "Lime Wheel", nameKr: "라임 휠" }],
      others: [{ id: 1, name: "Salt", nameKr: "소금" }, { id: 2, name: "Triple Sec", nameKr: "트리플 섹" }]
    },
    tools: [{ id: 1, name: "Shaker", nameKr: "셰이커" }],
    glassware: [{ id: 1, name: "Margarita Glass", nameKr: "마가리타 글라스" }],
    techniques: [{ id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹" }],
    personalNotes: "멕시코 여행에서 마셔본 그 맛!",
    makerTips: "소금 림을 만들 때 라임으로 글라스 가장자리를 적시면 소금이 잘 붙어요.",
    personalReview: "상큼하고 짭짤한 맛이 일품입니다.",
    hashtags: { cocktailHashtagId: 2, cocktailHashtag: "마가리타,데킬라,멕시코,소금림,상큼한" },
    viewCount: 381,
    likeCount: 89,
    shareCount: 32,
    comments: [],
    createdAt: '2024-10-28',
    updatedAt: '2024-10-28'
  },
  {
    cocktailId: 3,
    author: {
      userUuid: 'c3d4e5f6-a7b8-9012-cdef-012345678902',
      username: '아오쿠모 린',
      thumbnailImage: 'https://i.namu.wiki/i/2q4XJfx3uT9A-CxXVEkXjT4YwhXVAWIwYnFUmB3fmjkAZTEo78qOgRZldT-KAjwFW-30KDl4kdXLEGmmcCmBjg.webp'
    },
    isNew: false,
    isActive: true,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=500&fit=crop",
    cocktailName: "Old Fashioned",
    cocktailNameKr: "올드 패션드",
    urlSlug: "old-fashioned",
    category: "classic",
    spiritCategories: ["whiskey"],
    absPercentage: 35,
    servingSizeMl: 90,
    difficulty: 3,
    isVariation: false,
    profileNote: "위스키의 깊은 맛을 느낄 수 있는 클래식한 칵테일",
    historyNote: "<p>올드 패션드는 1880년대 미국에서 탄생한 가장 오래된 칵테일 중 하나입니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>버번 위스키 60ml</li><li>설탕 1티스푼</li><li>앙고스투라 비터스 2대시</li><li>오렌지 필</li></ul>",
    tipNote: "<p><strong>완벽한 올드 패션드를 위한 팁:</strong></p><ul><li>설탕을 완전히 녹이는 것이 중요합니다</li></ul>",
    ingredients: {
      spirits: [{ id: 1, name: "Bourbon Whiskey", nameKr: "버번 위스키" }],
      juices: [],
      bitters: [{ id: 1, bitterName: "Angostura Bitters", bitterNameKr: "앙고스투라 비터스" }],
      syrups: [],
      carbonated: [],
      dairy: [],
      garnishes: [{ id: 1, name: "Orange Peel", nameKr: "오렌지 필" }],
      others: [{ id: 1, name: "Sugar", nameKr: "설탕" }]
    },
    tools: [{ id: 1, name: "Bar Spoon", nameKr: "바 스푼" }],
    glassware: [{ id: 1, name: "Old Fashioned Glass", nameKr: "올드 패션드 글라스" }],
    techniques: [{ id: 1, techniqueName: "Stirring", techniqueNameKr: "스터링" }],
    personalNotes: "위스키 애호가라면 반드시 마셔봐야 할 칵테일.",
    makerTips: "오렌지 필을 짜서 향을 내는 것이 포인트예요.",
    personalReview: "진짜 어른의 맛이라고 할 수 있겠어요.",
    hashtags: { cocktailHashtagId: 3, cocktailHashtag: "올드패션드,위스키,클래식,버번,깊은맛" },
    viewCount: 897,
    likeCount: 203,
    shareCount: 67,
    comments: [],
    createdAt: '2024-10-12',
    updatedAt: '2024-10-12'
  },
  {
    cocktailId: 4,
    author: {
      userUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      username: '아야츠노 유니',
      thumbnailImage: 'https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj'
    },
    isNew: true,
    isActive: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    cocktailName: "Long Island Iced Tea",
    cocktailNameKr: "롱아일랜드 아이스티",
    urlSlug: "long-island-iced-tea",
    category: "classic",
    spiritCategories: ["vodka", "gin", "rum", "tequila", "liqueur"],
    absPercentage: 22,
    servingSizeMl: 350,
    difficulty: 3,
    isVariation: false,
    profileNote: "5가지 증류주가 들어가지만 아이스티처럼 마시기 쉬운 강력한 클래식 칵테일",
    historyNote: "<p>롱아일랜드 아이스티는 1970년대 미국 뉴욕 롱아일랜드에서 탄생한 것으로 알려져 있습니다.</p><p>보드카, 진, 럼, 데킬라, 트리플 섹 5가지 증류주가 들어가지만 콜라와 레몬 주스 덕분에 아이스티처럼 보이고 마시기 쉽습니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>보드카 15ml</li><li>진 15ml</li><li>화이트 럼 15ml</li><li>데킬라 15ml</li><li>트리플 섹 15ml</li><li>레몬 주스 25ml</li><li>심플 시럽 10ml</li><li>콜라 적당량</li><li>레몬 웨지</li></ul>",
    tipNote: "<p><strong>완벽한 롱아일랜드 아이스티를 위한 팁:</strong></p><ul><li>콜라는 마지막에 살짝만 넣어 색을 맞추는 것이 포인트입니다</li><li>증류주를 먼저 셰이킹한 뒤 콜라를 마지막에 넣으세요</li><li>얼음을 충분히 넣어 차갑게 마셔야 제맛입니다</li></ul>",
    ingredients: {
      spirits: [
        { id: 1, name: "Vodka", nameKr: "보드카" },
        { id: 2, name: "Gin", nameKr: "진" },
        { id: 3, name: "White Rum", nameKr: "화이트 럼" },
        { id: 4, name: "Tequila", nameKr: "데킬라" },
        { id: 5, name: "Triple Sec", nameKr: "트리플 섹" },
      ],
      juices: [{ id: 1, name: "Lemon Juice", nameKr: "레몬 주스" }],
      bitters: [],
      syrups: [{ id: 1, name: "Simple Syrup", nameKr: "심플 시럽" }],
      carbonated: [{ id: 1, name: "Cola", nameKr: "콜라" }],
      dairy: [],
      garnishes: [{ id: 1, name: "Lemon Wedge", nameKr: "레몬 웨지" }],
      others: []
    },
    tools: [{ id: 1, name: "Shaker", nameKr: "셰이커" }],
    glassware: [{ id: 1, name: "Highball Glass", nameKr: "하이볼 글라스" }],
    techniques: [{ id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹" }],
    personalNotes: "5가지 술이 들어가는데 생각보다 마시기 쉬워서 위험한 칵테일이에요.",
    makerTips: "콜라를 너무 많이 넣으면 도수가 느껴지지 않아서 과음할 수 있으니 주의하세요.",
    personalReview: "아이스티인 줄 알고 마시면 깜짝 놀랄 칵테일. 파티용으로 최고!",
    hashtags: { cocktailHashtagId: 4, cocktailHashtag: "롱아일랜드아이스티,5종기주,파티칵테일,강한칵테일,클래식" },
    viewCount: 834,
    likeCount: 201,
    shareCount: 87,
    comments: [],
    createdAt: '2024-09-30',
    updatedAt: '2024-09-30'
  },
  {
    cocktailId: 5,
    author: {
      userUuid: 'b2c3d4e5-f6a7-8901-bcde-f01234567891',
      username: '아라하시 타비',
      thumbnailImage: 'https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/082/459/727/82459727_1714360862118_1_600x600.JPG'
    },
    isNew: false,
    isActive: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    cocktailName: "Whiskey Sour",
    cocktailNameKr: "위스키 사워",
    urlSlug: "whiskey-sour",
    category: "classic",
    spiritCategories: ["whiskey"],
    absPercentage: 20,
    servingSizeMl: 120,
    difficulty: 2,
    isVariation: false,
    profileNote: "위스키의 강함과 레몬의 상큼함이 어우러진 칵테일",
    historyNote: "<p>위스키 사워는 1860년대 미국에서 탄생한 클래식 칵테일입니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>위스키 60ml</li><li>레몬 주스 30ml</li><li>심플 시럽 15ml</li><li>달걀 흰자 (선택)</li></ul>",
    tipNote: "<p><strong>완벽한 위스키 사워를 위한 팁:</strong></p><ul><li>달걀 흰자를 넣으면 부드러운 폼이 생깁니다</li></ul>",
    ingredients: {
      spirits: [{ id: 1, name: "Whiskey", nameKr: "위스키" }],
      juices: [{ id: 1, name: "Lemon Juice", nameKr: "레몬 주스" }],
      bitters: [],
      syrups: [{ id: 1, name: "Simple Syrup", nameKr: "심플 시럽" }],
      carbonated: [],
      dairy: [],
      garnishes: [{ id: 1, name: "Lemon Wheel", nameKr: "레몬 휠" }],
      others: [{ id: 1, name: "Egg White", nameKr: "달걀 흰자" }]
    },
    tools: [{ id: 1, name: "Shaker", nameKr: "셰이커" }],
    glassware: [{ id: 1, name: "Coupe Glass", nameKr: "쿠페 글라스" }],
    techniques: [{ id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹" }],
    personalNotes: "위스키를 잘 못 마시는데 이건 정말 맛있어요!",
    makerTips: "달걀 흰자 없이도 충분히 맛있으니 부담갖지 마세요.",
    personalReview: "상큼하면서도 위스키 특유의 깊은 맛이 살아있어요.",
    hashtags: { cocktailHashtagId: 5, cocktailHashtag: "위스키사워,상큼한,레몬,클래식,사워계열" },
    viewCount: 298,
    likeCount: 74,
    shareCount: 28,
    comments: [],
    createdAt: '2024-09-15',
    updatedAt: '2024-09-15'
  },
  {
    cocktailId: 6,
    author: {
      userUuid: 'c3d4e5f6-a7b8-9012-cdef-012345678902',
      username: '아오쿠모 린',
      thumbnailImage: 'https://i.namu.wiki/i/2q4XJfx3uT9A-CxXVEkXjT4YwhXVAWIwYnFUmB3fmjkAZTEo78qOgRZldT-KAjwFW-30KDl4kdXLEGmmcCmBjg.webp'
    },
    isNew: false,
    isActive: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    cocktailName: "Espresso Martini",
    cocktailNameKr: "에스프레소 마티니",
    urlSlug: "espresso-martini",
    category: "contemporary",
    spiritCategories: ["vodka"],
    absPercentage: 18.1,
    servingSizeMl: 120,
    difficulty: 3,
    isVariation: false,
    profileNote: "커피의 깊은 맛과 보드카가 만나는 모던 클래식",
    historyNote: "<p>에스프레소 마티니는 1980년대 런던에서 탄생한 모던 클래식 칵테일입니다.</p>",
    note: "<p><strong>재료:</strong></p><ul><li>보드카 50ml</li><li>커피 리큐어 20ml</li><li>에스프레소 1샷</li><li>심플 시럽 10ml</li></ul>",
    tipNote: "<p><strong>완벽한 에스프레소 마티니를 위한 팁:</strong></p><ul><li>갓 내린 에스프레소를 사용하는 것이 중요합니다</li></ul>",
    ingredients: {
      spirits: [{ id: 1, name: "Vodka", nameKr: "보드카" }],
      juices: [],
      bitters: [],
      syrups: [{ id: 1, name: "Simple Syrup", nameKr: "심플 시럽" }],
      carbonated: [],
      dairy: [],
      garnishes: [{ id: 1, name: "Coffee Beans", nameKr: "커피 원두" }],
      others: [{ id: 1, name: "Coffee Liqueur", nameKr: "커피 리큐어" }, { id: 2, name: "Espresso", nameKr: "에스프레소" }]
    },
    tools: [{ id: 1, name: "Shaker", nameKr: "셰이커" }],
    glassware: [{ id: 1, name: "Martini Glass", nameKr: "마티니 글라스" }],
    techniques: [{ id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹" }],
    personalNotes: "커피 좋아하는 사람이라면 꼭 마셔봐야 해요!",
    makerTips: "에스프레소가 뜨거우니 조심해서 셰이킹하세요.",
    personalReview: "달콤하면서도 쌉욀한 커피 맛이 정말 좋아요.",
    hashtags: { cocktailHashtagId: 6, cocktailHashtag: "에스프레소마티니,커피,보드카,모던클래식,카페인" },
    viewCount: 412,
    likeCount: 92,
    shareCount: 35,
    comments: [],
    createdAt: '2024-08-20',
    updatedAt: '2024-08-20'
  },
]

// 좋아요 상태 in-memory 저장: key = `${userId}-${cocktailId}`
const likedSet = new Set<string>()

export const cocktailHandlers = [
  /*
   * 칵테일 List
   */
  http.get('/api/cocktail', async ({ request }) => {
    await delay(1000)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '6')
    const sort = url.searchParams.get('sort') ?? 'recent'
    const search = url.searchParams.get('search') ?? ''

    let sortedData = [...cocktailFullData]

    if (sort === 'popular') {
      sortedData.sort((a, b) => b.likeCount - a.likeCount)
    } else if (sort === 'name') {
      sortedData.sort((a, b) => a.cocktailName.localeCompare(b.cocktailName))
    }

    if (search) {
      sortedData = sortedData.filter(cocktail =>
        cocktail.cocktailName.toLowerCase().includes(search.toLowerCase()) ||
        cocktail.cocktailNameKr.includes(search)
      )
    }

    const startIndex = (page - 1) * limit
    const paginatedData = sortedData.slice(startIndex, startIndex + limit)

    return HttpResponse.json({ code: 'OK', message: '성공', data: paginatedData })
  }),

  /*
   * 칵테일 좋아요
   */
  http.post('/api/cocktail/:id/like', async ({ request, params }) => {
    await delay(300)

    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ code: 'UNAUTHORIZED', message: '로그인이 필요합니다.', data: null }, { status: 401 })
    }

    // 토큰 형식: mock.jwt.token.{userId}.{timestamp}
    const token = authHeader.slice(7)
    const parts = token.split('.')
    const userId = parts[3]
    if (!userId) {
      return HttpResponse.json({ code: 'UNAUTHORIZED', message: '유효하지 않은 토큰입니다.', data: null }, { status: 401 })
    }

    const cocktailId = parseInt(params.id as string)
    const cocktail = cocktailFullData.find(c => c.cocktailId === cocktailId)
    if (!cocktail) {
      return HttpResponse.json({ code: 'NOT_FOUND', message: '칵테일을 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    const likeKey = `${userId}-${cocktailId}`
    if (likedSet.has(likeKey)) {
      return HttpResponse.json({ code: 'COCKTAIL_LIKE_CONFLICT', message: '이미 좋아요한 칵테일입니다.', data: null }, { status: 409 })
    }

    likedSet.add(likeKey)
    cocktail.likeCount += 1

    return HttpResponse.json({ code: 'OK', message: '성공', data: { likeCount: cocktail.likeCount } })
  }),

  /*
   * 칵테일 Detail (개별 조회)
   */
  http.get('/api/cocktail/:id', async ({ params }) => {
    await delay(1000)
    const cocktailId = parseInt(params.id as string)
    const cocktailData = cocktailFullData.find(c => c.cocktailId === cocktailId)

    if (!cocktailData) {
      return HttpResponse.json({ code: 'COCKTAIL_NOT_FOUND', message: '칵테일을 찾을 수 없습니다.', data: null }, { status: 404 })
    }

    return HttpResponse.json({ code: 'OK', message: '성공', data: cocktailData })
  }),
]
