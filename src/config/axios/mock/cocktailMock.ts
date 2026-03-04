// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import MockAdapter from "axios-mock-adapter";

export function setupCocktailMock(mock: MockAdapter): void {
  /*
  * 칵테일 List
  * */
  mock.onGet('/api/cocktail').reply((config) => {
    const {page = 1, limit = 6, sort = 'recent', search} = config.params || {};

    // 전체 Mock 데이터 (18개 → 6개만 사용)
    const fullData = [
      {
        cocktailId: 1,
        isNew: true,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Mojito",
        cocktailNameKr: "모히토",
        category: "Refreshing",
        absPercentage: 10,
        difficulty: 1,
        isVariation: false,
        profileNote: "상쾌한 민트와 라임의 조화가 완벽한 쿠바의 대표 칵테일",
        historyNote: "<p>모히토는 16세기 쿠바에서 시작된 칵테일로, 원래는 해적들이 마시던 음료였습니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>화이트 럼 60ml</li><li>신선한 민트 잎 10-12개</li><li>라임 1/2개</li><li>설탕 2티스푼</li><li>소다수</li><li>얼음</li></ul>",
        tip_note: "<p><strong>완벽한 모히토를 위한 팁:</strong></p><ul><li>민트 잎을 너무 세게 머들링하지 마세요</li></ul>",
        ingredients: {
          spirits: [
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 2,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 3,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 4,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 5,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 6,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 7,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
          ],
          juices: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1557401279-8e8de6c4659b?w=100&h=100&fit=crop",
            name: "Lime Juice",
            nameKr: "라임 주스"
          }],
          bitters: [],
          syrups: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1572441755997-6a0e8b3c1d42?w=100&h=100&fit=crop",
            name: "Simple Syrup",
            nameKr: "심플 시럽"
          }],
          carbonated: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop",
            name: "Soda Water",
            nameKr: "소다수"
          }],
          dairy: [],
          garnishes: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1607103688605-8a06a4a4c4fc?w=100&h=100&fit=crop",
            name: "Mint Leaves",
            nameKr: "민트 잎"
          }],
          others: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1571167025672-ca4cb3cd8af1?w=100&h=100&fit=crop",
            name: "Sugar",
            nameKr: "설탕"
          }]
        },
        tools: [{
          id: 1,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
          name: "Muddler",
          nameKr: "머들러"
        }],
        glassware: [{
          id: 1,
          image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop",
          name: "Highball Glass",
          nameKr: "하이볼 글라스"
        }],
        techniques: [{id: 1, techniqueName: "Muddling", techniqueNameKr: "머들링"}],
        personalNotes: "처음 만들어본 칵테일이에요. 생각보다 간단해서 놀랐고, 민트향이 정말 상쾌했습니다!",
        MakerTips: "민트를 너무 세게 으깨면 정말 쓴맛이 나더라고요.",
        personalReview: "여름에 마시기 정말 좋은 칵테일이에요.",
        hashtags: {cocktailHashtagId: 1, cocktailHashtag: "모히토,쿠바,민트,상쾌한,여름칵테일,럼베이스,클래식"},
        likeCount: 127,
        shareCount: 45,
        comments: [],
        createAt: '2024-11-15',
        updatedAt: '2024-11-15'
      },
      {
        cocktailId: 2,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Margarita",
        cocktailNameKr: "마가리타",
        category: "Sour",
        absPercentage: 15,
        difficulty: 2,
        isVariation: false,
        profileNote: "데킬라 베이스의 멕시코 전통 칵테일, 소금테 림이 특징",
        historyNote: "<p>마가리타는 1940년대 멕시코에서 탄생한 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>데킬라 60ml</li><li>라임 주스 30ml</li><li>트리플 섹 15ml</li><li>소금</li></ul>",
        tip_note: "<p><strong>완벽한 마가리타를 위한 팁:</strong></p><ul><li>글라스 림에 소금을 묻히는 것이 포인트입니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Tequila", nameKr: "데킬라"}],
          juices: [{id: 1, name: "Lime Juice", nameKr: "라임 주스"}],
          bitters: [],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Lime Wheel", nameKr: "라임 휠"}],
          others: [{id: 1, name: "Salt", nameKr: "소금"}, {
            id: 2,
            name: "Triple Sec",
            nameKr: "트리플 섹"
          }]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Margarita Glass", nameKr: "마가리타 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "멕시코 여행에서 마셔본 그 맛!",
        MakerTips: "소금 림을 만들 때 라임으로 글라스 가장자리를 적시면 소금이 잘 붙어요.",
        personalReview: "상큼하고 짭짤한 맛이 일품입니다.",
        hashtags: {cocktailHashtagId: 2, cocktailHashtag: "마가리타,데킬라,멕시코,소금림,상큼한"},
        likeCount: 89,
        shareCount: 32,
        comments: [],
        createAt: '2024-10-28',
        updatedAt: '2024-10-28'
      },
      {
        cocktailId: 3,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=500&fit=crop",
        cocktailName: "Old Fashioned",
        cocktailNameKr: "올드 패션드",
        category: "Spirit Forward",
        absPercentage: 35,
        difficulty: 3,
        isVariation: false,
        profileNote: "위스키의 깊은 맛을 느낄 수 있는 클래식한 칵테일",
        historyNote: "<p>올드 패션드는 1880년대 미국에서 탄생한 가장 오래된 칵테일 중 하나입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>버번 위스키 60ml</li><li>설탕 1티스푼</li><li>앙고스투라 비터스 2대시</li><li>오렌지 필</li></ul>",
        tip_note: "<p><strong>완벽한 올드 패션드를 위한 팁:</strong></p><ul><li>설탕을 완전히 녹이는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Bourbon Whiskey", nameKr: "버번 위스키"}],
          juices: [],
          bitters: [{id: 1, bitterName: "Angostura Bitters", bitterNameKr: "앙고스투라 비터스"}],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Orange Peel", nameKr: "오렌지 필"}],
          others: [{id: 1, name: "Sugar", nameKr: "설탕"}]
        },
        tools: [{id: 1, name: "Bar Spoon", nameKr: "바 스푼"}],
        glassware: [{id: 1, name: "Old Fashioned Glass", nameKr: "올드 패션드 글라스"}],
        techniques: [{id: 1, techniqueName: "Stirring", techniqueNameKr: "스터링"}],
        personalNotes: "위스키 애호가라면 반드시 마셔봐야 할 칵테일.",
        MakerTips: "오렌지 필을 짜서 향을 내는 것이 포인트예요.",
        personalReview: "진짜 어른의 맛이라고 할 수 있겠어요.",
        hashtags: {cocktailHashtagId: 3, cocktailHashtag: "올드패션드,위스키,클래식,버번,깊은맛"},
        likeCount: 203,
        shareCount: 67,
        comments: [],
        createAt: '2024-10-12',
        updatedAt: '2024-10-12'
      },
      {
        cocktailId: 4,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Negroni",
        cocktailNameKr: "네그로니",
        category: "Bitter",
        absPercentage: 24,
        difficulty: 2,
        isVariation: false,
        profileNote: "진, 캄파리, 스위트 베르무트의 완벽한 조화",
        historyNote: "<p>네그로니는 1919년 이탈리아 플로렌스에서 탄생했습니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>진 30ml</li><li>캄파리 30ml</li><li>스위트 베르무트 30ml</li><li>오렌지 필</li></ul>",
        tip_note: "<p><strong>완벽한 네그로니를 위한 팁:</strong></p><ul><li>모든 재료를 1:1:1 비율로 맞추는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Gin", nameKr: "진"}],
          juices: [],
          bitters: [{id: 1, bitterName: "Campari", bitterNameKr: "캄파리"}],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Orange Peel", nameKr: "오렌지 필"}],
          others: [{id: 1, name: "Sweet Vermouth", nameKr: "스위트 베르무트"}]
        },
        tools: [{id: 1, name: "Bar Spoon", nameKr: "바 스푼"}],
        glassware: [{id: 1, name: "Old Fashioned Glass", nameKr: "올드 패션드 글라스"}],
        techniques: [{id: 1, techniqueName: "Stirring", techniqueNameKr: "스터링"}],
        personalNotes: "처음엔 쓴맛이 강하다고 생각했는데 계속 마시니 중독적이에요.",
        MakerTips: "얼음을 크게 사용하면 희석이 적어져서 더 좋아요.",
        personalReview: "어른의 칵테일이라고 불리는 이유를 알겠어요.",
        hashtags: {cocktailHashtagId: 4, cocktailHashtag: "네그로니,진,캄파리,이탈리아,쓴맛,클래식"},
        likeCount: 156,
        shareCount: 43,
        comments: [],
        createAt: '2024-09-30',
        updatedAt: '2024-09-30'
      },
      {
        cocktailId: 5,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Whiskey Sour",
        cocktailNameKr: "위스키 사워",
        category: "Sour",
        absPercentage: 20,
        difficulty: 2,
        isVariation: false,
        profileNote: "위스키의 강함과 레몬의 상큼함이 어우러진 칵테일",
        historyNote: "<p>위스키 사워는 1860년대 미국에서 탄생한 클래식 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>위스키 60ml</li><li>레몬 주스 30ml</li><li>심플 시럽 15ml</li><li>달걀 흰자 (선택)</li></ul>",
        tip_note: "<p><strong>완벽한 위스키 사워를 위한 팁:</strong></p><ul><li>달걀 흰자를 넣으면 부드러운 폼이 생깁니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Whiskey", nameKr: "위스키"}],
          juices: [{id: 1, name: "Lemon Juice", nameKr: "레몬 주스"}],
          bitters: [],
          syrups: [{id: 1, name: "Simple Syrup", nameKr: "심플 시럽"}],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Lemon Wheel", nameKr: "레몬 휠"}],
          others: [{id: 1, name: "Egg White", nameKr: "달걀 흰자"}]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Coupe Glass", nameKr: "쿠페 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "위스키를 잘 못 마시는데 이건 정말 맛있어요!",
        MakerTips: "달걀 흰자 없이도 충분히 맛있으니 부담갖지 마세요.",
        personalReview: "상큼하면서도 위스키 특유의 깊은 맛이 살아있어요.",
        hashtags: {cocktailHashtagId: 5, cocktailHashtag: "위스키사워,상큼한,레몬,클래식,사워계열"},
        likeCount: 74,
        shareCount: 28,
        comments: [],
        createAt: '2024-09-15',
        updatedAt: '2024-09-15'
      },
      {
        cocktailId: 6,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Espresso Martini",
        cocktailNameKr: "에스프레소 마티니",
        category: "Coffee",
        absPercentage: 18.1,
        difficulty: 3,
        isVariation: false,
        profileNote: "커피의 깊은 맛과 보드카가 만나는 모던 클래식",
        historyNote: "<p>에스프레소 마티니는 1980년대 런던에서 탄생한 모던 클래식 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>보드카 50ml</li><li>커피 리큐어 20ml</li><li>에스프레소 1샷</li><li>심플 시럽 10ml</li></ul>",
        tip_note: "<p><strong>완벽한 에스프레소 마티니를 위한 팁:</strong></p><ul><li>갓 내린 에스프레소를 사용하는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Vodka", nameKr: "보드카"}],
          juices: [],
          bitters: [],
          syrups: [{id: 1, name: "Simple Syrup", nameKr: "심플 시럽"}],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Coffee Beans", nameKr: "커피 원두"}],
          others: [{id: 1, name: "Coffee Liqueur", nameKr: "커피 리큐어"}, {
            id: 2,
            name: "Espresso",
            nameKr: "에스프레소"
          }]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Martini Glass", nameKr: "마티니 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "커피 좋아하는 사람이라면 꼭 마셔봐야 해요!",
        MakerTips: "에스프레소가 뜨거우니 조심해서 셰이킹하세요.",
        personalReview: "달콤하면서도 쌉욀한 커피 맛이 정말 좋아요.",
        hashtags: {cocktailHashtagId: 6, cocktailHashtag: "에스프레소마티니,커피,보드카,모던클래식,카페인"},
        likeCount: 92,
        shareCount: 35,
        comments: [],
        createAt: '2024-08-20',
        updatedAt: '2024-08-20'
      },
    ];

    // 정렬 처리
    let sortedData = [...fullData];
    if (sort === 'popular') {
      sortedData.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sort === 'name') {
      sortedData.sort((a, b) => a.cocktailName.localeCompare(b.cocktailName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(cocktail =>
          cocktail.cocktailName.toLowerCase().includes(search.toLowerCase()) ||
          cocktail.cocktailNameKr.includes(search)
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, {data: paginatedData}];
  });

  /*
  * 칵테일 Detail (개별 조회)
  * */
  mock.onGet(/\/api\/cocktail\/\d+/).reply((config) => {
    const cocktailId = parseInt(config.url?.split('/').pop() || '1');

    // 칵테일 데이터 맵
    const cocktailDataMap: { [key: number]: any } = {
      1: {
        cocktailId: 1,
        isNew: true,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Mojito",
        cocktailNameKr: "모히토",
        category: "Refreshing",
        absPercentage: 10,
        difficulty: 1,
        isVariation: false,
        profileNote: "상쾌한 민트와 라임의 조화가 완벽한 쿠바의 대표 칵테일",
        historyNote: "<p>모히토는 16세기 쿠바에서 시작된 칵테일로, 원래는 해적들이 마시던 음료였습니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>화이트 럼 60ml</li><li>신선한 민트 잎 10-12개</li><li>라임 1/2개</li><li>설탕 2티스푼</li><li>소다수</li><li>얼음</li></ul>",
        tip_note: "<p><strong>완벽한 모히토를 위한 팁:</strong></p><ul><li>민트 잎을 너무 세게 머들링하지 마세요</li></ul>",
        ingredients: {
          spirits: [
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 2,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 3,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 4,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 5,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 6,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
            {
              id: 7,
              image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop",
              name: "White Rum",
              nameKr: "화이트 럼"
            },
          ],
          juices: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1557401279-8e8de6c4659b?w=100&h=100&fit=crop",
            name: "Lime Juice",
            nameKr: "라임 주스"
          }],
          bitters: [],
          syrups: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1572441755997-6a0e8b3c1d42?w=100&h=100&fit=crop",
            name: "Simple Syrup",
            nameKr: "심플 시럽"
          }],
          carbonated: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop",
            name: "Soda Water",
            nameKr: "소다수"
          }],
          dairy: [],
          garnishes: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1607103688605-8a06a4a4c4fc?w=100&h=100&fit=crop",
            name: "Mint Leaves",
            nameKr: "민트 잎"
          }],
          others: [{
            id: 1,
            image: "https://images.unsplash.com/photo-1571167025672-ca4cb3cd8af1?w=100&h=100&fit=crop",
            name: "Sugar",
            nameKr: "설탕"
          }]
        },
        tools: [{
          id: 1,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
          name: "Muddler",
          nameKr: "머들러"
        }],
        glassware: [{
          id: 1,
          image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop",
          name: "Highball Glass",
          nameKr: "하이볼 글라스"
        }],
        techniques: [{id: 1, techniqueName: "Muddling", techniqueNameKr: "머들링"}],
        personalNotes: "처음 만들어본 칵테일이에요. 생각보다 간단해서 놀랐고, 민트향이 정말 상쾌했습니다!",
        MakerTips: "민트를 너무 세게 으깨면 정말 쓴맛이 나더라고요.",
        personalReview: "여름에 마시기 정말 좋은 칵테일이에요.",
        hashtags: {cocktailHashtagId: 1, cocktailHashtag: "모히토,쿠바,민트,상쾌한,여름칵테일,럼베이스,클래식"},
        likeCount: 127,
        shareCount: 45,
        comments: [],
        createAt: '2024-11-15',
        updatedAt: '2024-11-15'
      },
      2: {
        cocktailId: 2,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Margarita",
        cocktailNameKr: "마가리타",
        category: "Sour",
        absPercentage: 15,
        difficulty: 2,
        isVariation: false,
        profileNote: "데킬라 베이스의 멕시코 전통 칵테일, 소금테 림이 특징",
        historyNote: "<p>마가리타는 1940년대 멕시코에서 탄생한 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>데킬라 60ml</li><li>라임 주스 30ml</li><li>트리플 섹 15ml</li><li>소금</li></ul>",
        tip_note: "<p><strong>완벽한 마가리타를 위한 팁:</strong></p><ul><li>글라스 림에 소금을 묻히는 것이 포인트입니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Tequila", nameKr: "데킬라"}],
          juices: [{id: 1, name: "Lime Juice", nameKr: "라임 주스"}],
          bitters: [],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Lime Wheel", nameKr: "라임 휠"}],
          others: [{id: 1, name: "Salt", nameKr: "소금"}, {
            id: 2,
            name: "Triple Sec",
            nameKr: "트리플 섹"
          }]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Margarita Glass", nameKr: "마가리타 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "멕시코 여행에서 마셔본 그 맛!",
        MakerTips: "소금 림을 만들 때 라임으로 글라스 가장자리를 적시면 소금이 잘 붙어요.",
        personalReview: "상큼하고 짭짤한 맛이 일품입니다.",
        hashtags: {cocktailHashtagId: 2, cocktailHashtag: "마가리타,데킬라,멕시코,소금림,상큼한"},
        likeCount: 89,
        shareCount: 32,
        comments: [],
        createAt: '2024-10-28',
        updatedAt: '2024-10-28'
      },
      3: {
        cocktailId: 3,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=500&fit=crop",
        cocktailName: "Old Fashioned",
        cocktailNameKr: "올드 패션드",
        category: "Spirit Forward",
        absPercentage: 35,
        difficulty: 3,
        isVariation: false,
        profileNote: "위스키의 깊은 맛을 느낄 수 있는 클래식한 칵테일",
        historyNote: "<p>올드 패션드는 1880년대 미국에서 탄생한 가장 오래된 칵테일 중 하나입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>버번 위스키 60ml</li><li>설탕 1티스푼</li><li>앙고스투라 비터스 2대시</li><li>오렌지 필</li></ul>",
        tip_note: "<p><strong>완벽한 올드 패션드를 위한 팁:</strong></p><ul><li>설탕을 완전히 녹이는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Bourbon Whiskey", nameKr: "버번 위스키"}],
          juices: [],
          bitters: [{id: 1, bitterName: "Angostura Bitters", bitterNameKr: "앙고스투라 비터스"}],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Orange Peel", nameKr: "오렌지 필"}],
          others: [{id: 1, name: "Sugar", nameKr: "설탕"}]
        },
        tools: [{id: 1, name: "Bar Spoon", nameKr: "바 스푼"}],
        glassware: [{id: 1, name: "Old Fashioned Glass", nameKr: "올드 패션드 글라스"}],
        techniques: [{id: 1, techniqueName: "Stirring", techniqueNameKr: "스터링"}],
        personalNotes: "위스키 애호가라면 반드시 마셔봐야 할 칵테일.",
        MakerTips: "오렌지 필을 짜서 향을 내는 것이 포인트예요.",
        personalReview: "진짜 어른의 맛이라고 할 수 있겠어요.",
        hashtags: {cocktailHashtagId: 3, cocktailHashtag: "올드패션드,위스키,클래식,버번,깊은맛"},
        likeCount: 203,
        shareCount: 67,
        comments: [],
        createAt: '2024-10-12',
        updatedAt: '2024-10-12'
      },
      4: {
        cocktailId: 4,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Negroni",
        cocktailNameKr: "네그로니",
        category: "Bitter",
        absPercentage: 24,
        difficulty: 2,
        isVariation: false,
        profileNote: "진, 캄파리, 스위트 베르무트의 완벽한 조화",
        historyNote: "<p>네그로니는 1919년 이탈리아 플로렌스에서 탄생했습니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>진 30ml</li><li>캄파리 30ml</li><li>스위트 베르무트 30ml</li><li>오렌지 필</li></ul>",
        tip_note: "<p><strong>완벽한 네그로니를 위한 팁:</strong></p><ul><li>모든 재료를 1:1:1 비율로 맞추는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Gin", nameKr: "진"}],
          juices: [],
          bitters: [{id: 1, bitterName: "Campari", bitterNameKr: "캄파리"}],
          syrups: [],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Orange Peel", nameKr: "오렌지 필"}],
          others: [{id: 1, name: "Sweet Vermouth", nameKr: "스위트 베르무트"}]
        },
        tools: [{id: 1, name: "Bar Spoon", nameKr: "바 스푼"}],
        glassware: [{id: 1, name: "Old Fashioned Glass", nameKr: "올드 패션드 글라스"}],
        techniques: [{id: 1, techniqueName: "Stirring", techniqueNameKr: "스터링"}],
        personalNotes: "처음엔 쓴맛이 강하다고 생각했는데 계속 마시니 중독적이에요.",
        MakerTips: "얼음을 크게 사용하면 희석이 적어져서 더 좋아요.",
        personalReview: "어른의 칵테일이라고 불리는 이유를 알겠어요.",
        hashtags: {cocktailHashtagId: 4, cocktailHashtag: "네그로니,진,캄파리,이탈리아,쓴맛,클래식"},
        likeCount: 156,
        shareCount: 43,
        comments: [],
        createAt: '2024-09-30',
        updatedAt: '2024-09-30'
      },
      5: {
        cocktailId: 5,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Whiskey Sour",
        cocktailNameKr: "위스키 사워",
        category: "Sour",
        absPercentage: 20,
        difficulty: 2,
        isVariation: false,
        profileNote: "위스키의 강함과 레몬의 상큼함이 어우러진 칵테일",
        historyNote: "<p>위스키 사워는 1860년대 미국에서 탄생한 클래식 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>위스키 60ml</li><li>레몬 주스 30ml</li><li>심플 시럽 15ml</li><li>달걀 흰자 (선택)</li></ul>",
        tip_note: "<p><strong>완벽한 위스키 사워를 위한 팁:</strong></p><ul><li>달걀 흰자를 넣으면 부드러운 폼이 생깁니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Whiskey", nameKr: "위스키"}],
          juices: [{id: 1, name: "Lemon Juice", nameKr: "레몬 주스"}],
          bitters: [],
          syrups: [{id: 1, name: "Simple Syrup", nameKr: "심플 시럽"}],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Lemon Wheel", nameKr: "레몬 휠"}],
          others: [{id: 1, name: "Egg White", nameKr: "달걀 흰자"}]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Coupe Glass", nameKr: "쿠페 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "위스키를 잘 못 마시는데 이건 정말 맛있어요!",
        MakerTips: "달걀 흰자 없이도 충분히 맛있으니 부담갖지 마세요.",
        personalReview: "상큼하면서도 위스키 특유의 깊은 맛이 살아있어요.",
        hashtags: {cocktailHashtagId: 5, cocktailHashtag: "위스키사워,상큼한,레몬,클래식,사워계열"},
        likeCount: 74,
        shareCount: 28,
        comments: [],
        createAt: '2024-09-15',
        updatedAt: '2024-09-15'
      },
      6: {
        cocktailId: 6,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
        cocktailName: "Espresso Martini",
        cocktailNameKr: "에스프레소 마티니",
        category: "Coffee",
        absPercentage: 18.1,
        difficulty: 3,
        isVariation: false,
        profileNote: "커피의 깊은 맛과 보드카가 만나는 모던 클래식",
        historyNote: "<p>에스프레소 마티니는 1980년대 런던에서 탄생한 모던 클래식 칵테일입니다.</p>",
        note: "<p><strong>재료:</strong></p><ul><li>보드카 50ml</li><li>커피 리큐어 20ml</li><li>에스프레소 1샷</li><li>심플 시럽 10ml</li></ul>",
        tip_note: "<p><strong>완벽한 에스프레소 마티니를 위한 팁:</strong></p><ul><li>갓 내린 에스프레소를 사용하는 것이 중요합니다</li></ul>",
        ingredients: {
          spirits: [{id: 1, name: "Vodka", nameKr: "보드카"}],
          juices: [],
          bitters: [],
          syrups: [{id: 1, name: "Simple Syrup", nameKr: "심플 시럽"}],
          carbonated: [],
          dairy: [],
          garnishes: [{id: 1, name: "Coffee Beans", nameKr: "커피 원두"}],
          others: [{id: 1, name: "Coffee Liqueur", nameKr: "커피 리큐어"}, {
            id: 2,
            name: "Espresso",
            nameKr: "에스프레소"
          }]
        },
        tools: [{id: 1, name: "Shaker", nameKr: "셰이커"}],
        glassware: [{id: 1, name: "Martini Glass", nameKr: "마티니 글라스"}],
        techniques: [{id: 1, techniqueName: "Shaking", techniqueNameKr: "셰이킹"}],
        personalNotes: "커피 좋아하는 사람이라면 꼭 마셔봐야 해요!",
        MakerTips: "에스프레소가 뜨거우니 조심해서 셰이킹하세요.",
        personalReview: "달콤하면서도 쌉욀한 커피 맛이 정말 좋아요.",
        hashtags: {cocktailHashtagId: 6, cocktailHashtag: "에스프레소마티니,커피,보드카,모던클래식,카페인"},
        likeCount: 92,
        shareCount: 35,
        comments: [],
        createAt: '2024-08-20',
        updatedAt: '2024-08-20'
      }
    };

    const cocktailData = cocktailDataMap[cocktailId];

    if (!cocktailData) {
      return [404, {error: 'Cocktail not found'}];
    }

    return [200, {data: cocktailData}];
  });
}
