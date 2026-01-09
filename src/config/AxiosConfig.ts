import axios, {type AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";

export const BASE_URL = import.meta.env.MODE === 'development'
    /*
    * local path
    * */
    ? 'http://localhost:3002'
    /*
    * 실서버
    * */
    : 'http://192.168.1.91:8080/';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

/*
* Axios mock 사용 여부
*
* development 환경에서만 mock 사용 (npm run dev)
*/
const USE_MOCK: boolean = import.meta.env.DEV;

if(USE_MOCK) {
  const mock = new MockAdapter(api, {delayResponse: 1000});

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

  /*
  * 스피릿 Product List
  * */
  mock.onGet('/api/spirit-product').reply((config) => {
    const {page = 1, limit = 6, sort = 'recent', search} = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
      {
        spiritProductId: 1,
        spiritName: "Hennessy X.O",
        spiritNameKr: "헤네시 X.O",
        image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Hennessy+XO",
        profileNote: "깊고 복합적인 향미의 프리미엄 코냑",
        historyNote: "<p>헤네시 X.O는 1870년 Maurice Hennessy에 의해 창조된 세계 최초의 X.O 코냑입니다.</p><p>150년 넘는 전통을 자랑하며, 100개 이상의 오드비를 블렌딩하여 만들어집니다.</p>",
        note: "<p>헤네시 X.O는 깊고 강렬한 호박색을 띠며, 복합적이고 균형 잡힌 향미를 자랑합니다.</p><p>초콜릿, 건포도, 무화과 등의 풍부한 아로마가 특징입니다.</p>",
        personalNotes: "개인적으로 가장 좋아하는 코냑 중 하나입니다. 특별한 날에만 마시는 프리미엄 스피릿으로, 긴 여운과 복합적인 맛이 인상적입니다.",
        spirit: {
          spiritId: 1,
          spiritName: "Cognac",
          spiritNameKr: "꼬냑"
        },
        brand: {
          brandId: 1,
          brandName: "Hennessy",
          brandNameKr: "헤네시"
        },
        country: {
          countryId: 1,
          countryName: "France",
          countryNameKr: "프랑스"
        },
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
          {
            id: 1,
            name: "Sidecar",
            nameKr: "사이드카",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Sidecar"
          },
          {
            id: 2,
            name: "French Connection",
            nameKr: "프렌치 커넥션",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=French"
          },
          {
            id: 3,
            name: "Brandy Alexander",
            nameKr: "브랜디 알렉산더",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Alexander"
          }
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
        spirit: {
          spiritId: 2,
          spiritName: "Whisky",
          spiritNameKr: "위스키"
        },
        brand: {
          brandId: 2,
          brandName: "Macallan",
          brandNameKr: "맥캘란"
        },
        country: {
          countryId: 2,
          countryName: "Scotland",
          countryNameKr: "스코틀랜드"
        },
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
          {
            id: 4,
            name: "Old Fashioned",
            nameKr: "올드 패션드",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old"
          },
          {
            id: 5,
            name: "Whisky Sour",
            nameKr: "위스키 사워",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour"
          }
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
        spirit: {
          spiritId: 3,
          spiritName: "Vodka",
          spiritNameKr: "보드카"
        },
        brand: {
          brandId: 3,
          brandName: "Grey Goose",
          brandNameKr: "그레이 구스"
        },
        country: {
          countryId: 1,
          countryName: "France",
          countryNameKr: "프랑스"
        },
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
          {
            id: 6,
            name: "Vodka Martini",
            nameKr: "보드카 마티니",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Martini"
          },
          {
            id: 7,
            name: "Cosmopolitan",
            nameKr: "코스모폴리탄",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Cosmo"
          },
          {
            id: 8,
            name: "Moscow Mule",
            nameKr: "모스코 뮬",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Mule"
          }
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
        spirit: {
          spiritId: 4,
          spiritName: "Tequila",
          spiritNameKr: "테킬라"
        },
        brand: {
          brandId: 4,
          brandName: "Don Julio",
          brandNameKr: "돈 훌리오"
        },
        country: {
          countryId: 3,
          countryName: "Mexico",
          countryNameKr: "멕시코"
        },
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
          {
            id: 9,
            name: "Margarita",
            nameKr: "마가리타",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita"
          },
          {
            id: 10,
            name: "Paloma",
            nameKr: "팔로마",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Paloma"
          }
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
        personalNotes: "진 토닉을 만들 때 가장 선호하는 진입니다. 식물성 향이 풍부하면서도 균길잡힌 맛이 매력적입니다.",
        spirit: {
          spiritId: 5,
          spiritName: "Gin",
          spiritNameKr: "진"
        },
        brand: {
          brandId: 5,
          brandName: "Bombay Sapphire",
          brandNameKr: "봄베이 사파이어"
        },
        country: {
          countryId: 4,
          countryName: "England",
          countryNameKr: "영국"
        },
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
          {
            id: 11,
            name: "Gin & Tonic",
            nameKr: "진 토닉",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=G&T"
          },
          {
            id: 12,
            name: "Negroni",
            nameKr: "네그로니",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni"
          },
          {
            id: 13,
            name: "Tom Collins",
            nameKr: "톰 콜린스",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Collins"
          }
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
        spirit: {
          spiritId: 6,
          spiritName: "Rum",
          spiritNameKr: "럼"
        },
        brand: {
          brandId: 6,
          brandName: "Bacardi",
          brandNameKr: "바카디"
        },
        country: {
          countryId: 5,
          countryName: "Cuba",
          countryNameKr: "쿠바"
        },
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
          {
            id: 14,
            name: "Dark 'n' Stormy",
            nameKr: "다크 앤 스토미",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Dark"
          },
          {
            id: 15,
            name: "Rum Old Fashioned",
            nameKr: "럼 올드 패션드",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Rum+OF"
          }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.spiritName.localeCompare(b.spiritName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(spirit =>
          spirit.spiritName.toLowerCase().includes(search.toLowerCase()) ||
          spirit.spiritNameKr.includes(search)
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, {data: paginatedData}];
  });

  /*
  * 바 도구 List
  * */
  mock.onGet('/api/tool').reply((config) => {
    const {page = 1, limit = 6, sort = 'recent', search, categorySort = 'all'} = config.params || {};

    // 전체 Mock 데이터
    const fullData = [
      {
        toolId: 1,
        toolName: "Boston Shaker",
        toolNameKr: "보스턴 셰이커",
        notes: "<p>보스턴 셰이커는 금속 틴과 유리 틴으로 구성된 두 피스 구조의 셰이커입니다. 코블러 셰이커와 달리 내장 스트레이너가 없어 별도의 스트레이너가 필요하지만, 더 빠르고 효율적인 작업이 가능합니다.</p><p>금속 틴은 내구성이 뛰어나고 유리 틴은 재료의 색상과 양을 확인할 수 있어 실용적입니다. 대용량 제작에도 적합하여 바쁜 바 환경에서 특히 유용합니다.</p>",
        toolCategory: "shaker" as const,
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
        toolCategory: "strainer" as const,
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
        toolCategory: "measuring" as const,
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
        toolCategory: "mixing" as const,
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
        toolCategory: "muddling" as const,
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
        toolCategory: "garnish" as const,
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
    ];
    // 정렬 처리
    let sortedData = [...fullData];
    if (sort === 'name') {
      sortedData.sort((a, b) => a.toolName.localeCompare(b.toolName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(tool =>
          tool.toolName.toLowerCase().includes(search.toLowerCase()) ||
          tool.toolNameKr.includes(search) ||
          tool.notes.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 카테고리 필터링 처리
    if (categorySort && categorySort !== 'all') {
      sortedData = sortedData.filter(tool => tool.toolCategory === categorySort);
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, {data: paginatedData}];
  });

  /*
 * Tool Detail (개별 조회)
 * */
  mock.onGet(/\/api\/tool\/\d+/).reply((config) => {
    const toolId = parseInt(config.url?.split('/').pop() || '1');

    // Tool 상세 데이터 맵
    const toolDataMap: { [key: number]: any } = {
      1: {
        toolId: 1,
        toolName: "Boston Shaker",
        toolNameKr: "보스턴 셰이커",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        notes: "<p>보스턴 셰이커는 금속 틴과 유리 틴으로 구성된 두 피스 구조의 셰이커입니다. 코블러 셰이커와 달리 내장 스트레이너가 없어 별도의 스트레이너가 필요하지만, 더 빠르고 효율적인 작업이 가능합니다.</p><p>금속 틴은 내구성이 뛰어나고 유리 틴은 재료의 색상과 양을 확인할 수 있어 실용적입니다. 대용량 제작에도 적합하여 바쁜 바 환경에서 특히 유용합니다.</p>",
        whenToUseNotes: "<p><strong>셰이킹이 필요한 칵테일 제작 시 사용:</strong></p><ul><li>시트러스 주스가 포함된 칵테일 (사워류)</li><li>크림이나 계란이 들어간 칵테일</li><li>시럽이나 리큐어가 포함된 복합적인 칵테일</li><li>재료들을 강하게 혼합해야 하는 경우</li></ul><p><strong>사용하지 않는 경우:</strong></p><ul><li>스피릿만으로 구성된 칵테일 (마티니, 맨해튼 등)</li><li>스털링으로 만드는 칵테일</li><li>탄산이 들어간 칵테일</li></ul>",
        alternativeTools: "<p><strong>코블러 셰이커:</strong> 내장 스트레이너가 있는 3피스 셰이커로 초보자에게 사용하기 쉽지만, 속도와 효율성에서는 보스턴 셰이커에 비해 떨어집니다.</p><p><strong>프렌치 셰이커:</strong> 두 개의 금속 틴으로 구성된 셰이커로, 보스턴 셰이커와 유사하지만 분리가 더 어려울 수 있습니다.</p>",
        toolCategory: "shaker" as const,
        createAt: "2024-01-15",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 1,
            name: "Whiskey Sour",
            nameKr: "위스키 사워",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour"
          },
          {
            id: 2,
            name: "Margarita",
            nameKr: "마가리타",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita"
          },
          {
            id: 3,
            name: "Daiquiri",
            nameKr: "다이키리",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Daiquiri"
          },
          {
            id: 4,
            name: "Cosmopolitan",
            nameKr: "코스모폴리탄",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Cosmo"
          }
        ]
      },
      2: {
        toolId: 2,
        toolName: "Hawthorne Strainer",
        toolNameKr: "호손 스트레이너",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
        notes: "<p>호손 스트레이너는 스프링이 달린 스트레이너로, 셰이킹이나 스털링 후 칵테일을 잔에 따를 때 얼음과 고형 재료를 걸러내는 데 사용됩니다.</p><p>특징적인 스프링 코일이 용기의 가장자리에 밀착되어 효과적으로 여과 작용을 합니다. 대부분의 바에서 필수적으로 사용하는 기본 도구 중 하나입니다.</p>",
        whenToUseNotes: "<p><strong>사용하는 경우:</strong></p><ul><li>셰이킹한 칵테일을 잔에 따를 때</li><li>스털링한 칵테일에서 얼음을 걸러낼 때</li><li>과일 조각이나 허브가 들어간 칵테일 여과</li><li>더블 스트레이닝의 첫 번째 단계</li></ul><p><strong>주의사항:</strong></p><ul><li>미세한 찌꺼기까지 걸러내려면 파인 스트레이너와 함께 사용</li><li>크러쉬드 아이스 사용 시에는 특히 필요</li></ul>",
        alternativeTools: "<p><strong>줄리엣 스트레이너:</strong> 구멍이 뚫린 평평한 스트레이너로, 스털링 전용으로 사용되며 호손 스트레이너보다 여과 능력이 떨어집니다.</p><p><strong>파인 스트레이너:</strong> 더블 스트레이닝 시 함께 사용하는 미세한 망 스트레이너로, 단독 사용 시에는 효율성이 떨어집니다.</p>",
        toolCategory: "strainer" as const,
        createAt: "2024-01-20",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 1,
            name: "Whiskey Sour",
            nameKr: "위스키 사워",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour"
          },
          {
            id: 2,
            name: "Margarita",
            nameKr: "마가리타",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita"
          },
          {
            id: 5,
            name: "Clover Club",
            nameKr: "클로버 클럽",
            image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Clover"
          }
        ]
      },
      3: {
        toolId: 3,
        toolName: "Jigger",
        toolNameKr: "지거",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        notes: "<p>지거는 정확한 레시피 구현을 위해 술과 재료를 정밀하게 계량하는 도구입니다. 일반적으로 양쪽 끝이 다른 용량을 가지고 있어 다양한 레시피에 대응할 수 있습니다.</p><p>가장 일반적인 조합은 1oz(30ml)와 0.5oz(15ml)이며, 일부는 1.5oz와 0.75oz 조합도 있습니다. 정확한 계량은 일관된 맛의 칵테일을 만드는 핵심입니다.</p>",
        whenToUseNotes: "<p><strong>항상 사용해야 하는 경우:</strong></p><ul><li>모든 칵테일 제작 시 재료 계량</li><li>레시피 테스트 및 개발</li><li>일관된 맛 유지가 필요한 상업적 환경</li><li>새로운 레시피 학습 시</li></ul><p><strong>특히 중요한 상황:</strong></p><ul><li>강한 술이 들어가는 칵테일</li><li>밸런스가 중요한 클래식 칵테일</li><li>비싼 재료를 사용하는 경우</li></ul>",
        alternativeTools: "<p><strong>바 스푼:</strong> 1 바 스푼 = 약 0.125oz(3.7ml)로 소량 계량에 사용할 수 있지만 정확도가 떨어집니다.</p><p><strong>계량컵:</strong> 큰 용량 계량에는 유용하지만 칵테일 제작에는 부정확하고 비효율적입니다.</p><p><strong>푸어러 카운트:</strong> 숙련된 바텐더의 방법이지만 정확도가 떨어지고 일관성을 보장하기 어렵습니다.</p>",
        toolCategory: "measuring" as const,
        createAt: "2024-02-01",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 1,
            name: "Whiskey Sour",
            nameKr: "위스키 사워",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour"
          },
          {
            id: 2,
            name: "Margarita",
            nameKr: "마가리타",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita"
          },
          {
            id: 3,
            name: "Daiquiri",
            nameKr: "다이키리",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Daiquiri"
          },
          {
            id: 6,
            name: "Negroni",
            nameKr: "네그로니",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni"
          }
        ]
      },
      4: {
        toolId: 4,
        toolName: "Bar Spoon",
        toolNameKr: "바 스푼",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
        notes: "<p>바 스푼은 긴 손잡이를 가진 스푼으로 칵테일을 저어 혼합하거나 가니쉬 작업에 사용합니다. 특징적인 트위스트된 손잡이는 효율적인 스털링을 위해 설계되었습니다.</p><p>길이는 보통 30-40cm이며, 끝부분이 다양한 형태(포크, 머들러, 플랫)로 되어 있어 다목적으로 사용 가능합니다. 스털링뿐만 아니라 레이어링, 가니쉬 배치 등에도 활용됩니다.</p>",
        whenToUseNotes: "<p><strong>스털링이 필요한 칵테일:</strong></p><ul><li>스피릿 베이스 칵테일 (마티니, 맨해튼, 네그로니)</li><li>온더락 칵테일 (올드 패션드)</li><li>아이스가 많이 들어간 칵테일</li></ul><p><strong>가니쉬 작업:</strong></p><ul><li>체리나 올리브 올리기</li><li>레몬 트위스트 배치</li><li>레이어링 칵테일 제작</li></ul><p><strong>기타 용도:</strong></p><ul><li>소량 재료 계량 (1 바스푼 = 3.7ml)</li><li>재료 혼합 확인</li></ul>",
        alternativeTools: "<p><strong>일반 스푼:</strong> 길이가 짧아 깊은 글라스에서 사용하기 어렵고 효율성이 떨어집니다.</p><p><strong>젓가락:</strong> 임시 대용으로 사용 가능하지만 스털링 효과가 제한적입니다.</p><p><strong>나이프:</strong> 가니쉬 작업에는 사용할 수 있지만 스털링에는 부적합합니다.</p>",
        toolCategory: "mixing" as const,
        createAt: "2024-02-10",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 6,
            name: "Negroni",
            nameKr: "네그로니",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni"
          },
          {
            id: 7,
            name: "Manhattan",
            nameKr: "맨해튼",
            image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Manhattan"
          },
          {
            id: 8,
            name: "Martini",
            nameKr: "마티니",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Martini"
          },
          {
            id: 9,
            name: "Old Fashioned",
            nameKr: "올드 패션드",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old"
          }
        ]
      },
      5: {
        toolId: 5,
        toolName: "Muddler",
        toolNameKr: "머들러",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        notes: "<p>머들러는 과일이나 허브를 으깨어 칵테일에 풍미를 더할 때 사용하는 도구입니다. 주로 목재나 스테인리스 스틸로 제작되며, 끝부분이 평평하게 되어 있어 효과적으로 재료를 으깰 수 있습니다.</p><p>목재 머들러는 허브에 부드럽고, 스테인리스 스틸은 과일에 효과적입니다. 적절한 압력으로 사용해야 쓴맛을 피할 수 있습니다.</p>",
        whenToUseNotes: "<p><strong>허브류 (부드럽게):</strong></p><ul><li>모히또 - 민트 잎</li><li>바질 스매시 - 바질 잎</li><li>로즈마리 칵테일 - 로즈마리</li></ul><p><strong>과일류 (충분히):</strong></p><ul><li>카이피리냐 - 라임</li><li>올드 패션드 - 오렌지</li><li>위스키 스매시 - 레몬</li></ul><p><strong>주의사항:</strong></p><ul><li>허브는 과도하게 으깨면 쓴맛 발생</li><li>과일은 충분히 으깨야 과즙 추출</li><li>글라스 바닥에서만 작업</li></ul>",
        alternativeTools: "<p><strong>바 스푼 끝:</strong> 일부 바스푼 끝이 머들러 형태로 되어 있어 소량 작업에 사용 가능하지만 효율성이 떨어집니다.</p><p><strong>나무 스푼:</strong> 임시 대용으로 사용할 수 있지만 길이와 효율성에서 제한적입니다.</p><p><strong>포크:</strong> 라임 등 작은 과일에는 사용 가능하지만 허브류에는 부적합합니다.</p>",
        toolCategory: "muddling" as const,
        createAt: "2024-02-15",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 10,
            name: "Mojito",
            nameKr: "모히또",
            image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito"
          },
          {
            id: 11,
            name: "Caipirinha",
            nameKr: "카이피리냐",
            image: "https://via.placeholder.com/80x80/32CD32/FFFFFF?text=Caipirinha"
          },
          {
            id: 9,
            name: "Old Fashioned",
            nameKr: "올드 패션드",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old"
          }
        ]
      },
      6: {
        toolId: 6,
        toolName: "Citrus Peeler",
        toolNameKr: "시트러스 필러",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
        notes: "<p>시트러스 필러는 레몬, 라임, 오렌지 등의 껍질을 얇고 균일하게 벗겨 아름다운 트위스트 가니쉬를 만들 수 있게 해주는 전문 도구입니다.</p><p>날카로운 블레이드가 과일의 표면만을 얇게 벗겨내어 쓴맛이 나는 흰 부분(피스)을 피할 수 있습니다. 일정한 폭과 두께로 껍질을 벗길 수 있어 전문적인 가니쉬 제작이 가능합니다.</p>",
        whenToUseNotes: "<p><strong>트위스트 가니쉬가 필요한 칵테일:</strong></p><ul><li>마티니 - 레몬 트위스트</li><li>올드 패션드 - 오렌지 트위스트</li><li>네그로니 - 오렌지 필</li><li>사이드카 - 레몬 트위스트</li></ul><p><strong>작업 팁:</strong></p><ul><li>신선하고 껍질이 두꺼운 과일 선택</li><li>일정한 압력으로 길게 벗기기</li><li>사용 직전에 껍질 제작하여 신선도 유지</li></ul>",
        alternativeTools: "<p><strong>파링 나이프:</strong> 작은 날로 껍질을 벗길 수 있지만 일정한 두께를 유지하기 어렵고 기술이 필요합니다.</p><p><strong>감자깎이:</strong> 넓은 껍질을 만들 수 있지만 두께 조절이 어렵고 모양이 불규칙합니다.</p><p><strong>제스터:</strong> 잘게 간 제스트는 만들 수 있지만 트위스트 가니쉬용 긴 껍질은 만들 수 없습니다.</p>",
        toolCategory: "garnish" as const,
        createAt: "2024-02-20",
        updatedAt: new Date().toISOString().split('T')[0],
        availableCocktails: [
          {
            id: 8,
            name: "Martini",
            nameKr: "마티니",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Martini"
          },
          {
            id: 9,
            name: "Old Fashioned",
            nameKr: "올드 패션드",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old"
          },
          {
            id: 6,
            name: "Negroni",
            nameKr: "네그로니",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni"
          },
          {
            id: 12,
            name: "Sidecar",
            nameKr: "사이드카",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Sidecar"
          }
        ]
      }
    };

    const toolData = toolDataMap[toolId];

    if (!toolData) {
      return [404, {error: 'Tool not found'}];
    }

    return [200, {data: toolData}];
  });

  /*
  * 스피릿 Product Detail (개별 조회)
  * */
  mock.onGet(/\/api\/spirit-product\/\d+/).reply((config) => {
    const spiritProductId = parseInt(config.url?.split('/').pop() || '1');

    // 스피릿 상세 데이터 맵
    const spiritProductDataMap: { [key: number]: any } = {
      1: {
        spiritProductId: 1,
        spiritName: "Hennessy X.O",
        spiritNameKr: "헤네시 X.O",
        image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Hennessy+XO",
        profileNote: "깊고 복합적인 향미의 프리미엄 코냑",
        historyNote: "<p>헤네시 X.O는 1870년 Maurice Hennessy에 의해 창조된 세계 최초의 X.O 코냑입니다.</p><p>150년 넘는 전통을 자랑하며, 100개 이상의 오드비를 블렌딩하여 만들어집니다.</p>",
        note: "<p>헤네시 X.O는 깊고 강렬한 호박색을 띠며, 복합적이고 균형 잡힌 향미를 자랑합니다.</p><p>초콜릿, 건포도, 무화과 등의 풍부한 아로마가 특징입니다.</p>",
        personalNotes: "개인적으로 가장 좋아하는 코냑 중 하나입니다. 특별한 날에만 마시는 프리미엄 스피릿으로, 긴 여운과 복합적인 맛이 인상적입니다.",
        spirit: {
          spiritId: 1,
          spiritName: "Cognac",
          spiritNameKr: "꼬냑"
        },
        brand: {
          brandId: 1,
          brandName: "Hennessy",
          brandNameKr: "헤네시"
        },
        country: {
          countryId: 1,
          countryName: "France",
          countryNameKr: "프랑스"
        },
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
          {
            id: 1,
            name: "Sidecar",
            nameKr: "사이드카",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Sidecar"
          },
          {
            id: 2,
            name: "French Connection",
            nameKr: "프렌치 커넥션",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=French"
          },
          {
            id: 3,
            name: "Brandy Alexander",
            nameKr: "브랜디 알렉산더",
            image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Alexander"
          }
        ]
      },
      2: {
        spiritProductId: 2,
        spiritName: "Macallan 18 Years",
        spiritNameKr: "맥캘란 18년",
        image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=Macallan+18",
        profileNote: "셰리 캐스크에서 숙성된 싱글 몰트 스카치 위스키",
        historyNote: "<p>맥캘란은 1824년 스코틀랜드에서 창립된 유서 깊은 위스키 브랜드입니다.</p><p>18년 숙성 제품은 셰리 오크 캐스크에서만 숙성되어 독특한 풍미를 선사합니다.</p>",
        note: "<p>진한 마호가니 색상과 함께 건포도, 오렌지, 스파이시한 생강의 향이 어우러집니다.</p><p>부드럽고 풍부한 맛과 긴 여운이 특징입니다.</p>",
        personalNotes: "한정 생산으로 구하기 어려운 제품입니다. 위스키 애호가라면 반드시 시도해봐야 할 명품 위스키입니다.",
        spirit: {
          spiritId: 2,
          spiritName: "Whisky",
          spiritNameKr: "위스키"
        },
        brand: {
          brandId: 2,
          brandName: "Macallan",
          brandNameKr: "맥캘란"
        },
        country: {
          countryId: 2,
          countryName: "Scotland",
          countryNameKr: "스코틀랜드"
        },
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
          {
            id: 4,
            name: "Old Fashioned",
            nameKr: "올드 패션드",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old"
          },
          {
            id: 5,
            name: "Whisky Sour",
            nameKr: "위스키 사워",
            image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Sour"
          }
        ]
      },
      3: {
        spiritProductId: 3,
        spiritName: "Grey Goose",
        spiritNameKr: "그레이 구스",
        image: "https://via.placeholder.com/200x200/C0C0C0/000000?text=Grey+Goose",
        profileNote: "프랑스산 프리미엄 보드카",
        historyNote: "<p>그레이 구스는 1997년 프랑스에서 탄생한 프리미엄 보드카 브랜드입니다.</p><p>프랑스 피카르디 지역의 최고급 밀을 사용하여 제조됩니다.</p>",
        note: "<p>부드럽고 깔끔한 맛이 특징이며, 어떤 칵테일과도 잘 어울립니다.</p><p>5번의 증류 과정을 거쳐 순수함을 극대화했습니다.</p>",
        personalNotes: "마티니를 만들 때 항상 사용하는 보드카입니다. 깔끔하고 순수한 맛이 일품입니다.",
        spirit: {
          spiritId: 3,
          spiritName: "Vodka",
          spiritNameKr: "보드카"
        },
        brand: {
          brandId: 3,
          brandName: "Grey Goose",
          brandNameKr: "그레이 구스"
        },
        country: {
          countryId: 1,
          countryName: "France",
          countryNameKr: "프랑스"
        },
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
          {
            id: 6,
            name: "Vodka Martini",
            nameKr: "보드카 마티니",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Martini"
          },
          {
            id: 7,
            name: "Cosmopolitan",
            nameKr: "코스모폴리탄",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Cosmo"
          },
          {
            id: 8,
            name: "Moscow Mule",
            nameKr: "모스코 뮬",
            image: "https://via.placeholder.com/80x80/C0C0C0/000000?text=Mule"
          }
        ]
      },
      4: {
        spiritProductId: 4,
        spiritName: "Don Julio 1942",
        spiritNameKr: "돈 훌리오 1942",
        image: "https://via.placeholder.com/200x200/DAA520/000000?text=Don+Julio",
        profileNote: "아가베 100%로 만든 최고급 아네호 테킬라",
        historyNote: "<p>돈 훌리오는 1942년 돈 훌리오 곤잘레스가 설립한 테킬라 브랜드입니다.</p><p>최상급 블루 아가베만을 사용하여 전통 방식으로 제조합니다.</p>",
        note: "<p>2년 6개월 이상 오크통에서 숙성된 아네호 테킬라로, 부드럽고 복합적인 맛을 자랑합니다.</p><p>바닐라, 캐러멜, 스파이스의 조화로운 풍미가 특징입니다.</p>",
        personalNotes: "테킬라의 고정관념을 바꿔준 제품입니다. 스트레이트로 마셔도 전혀 부담스럽지 않은 프리미엄 스피릿입니다.",
        spirit: {
          spiritId: 4,
          spiritName: "Tequila",
          spiritNameKr: "테킬라"
        },
        brand: {
          brandId: 4,
          brandName: "Don Julio",
          brandNameKr: "돈 훌리오"
        },
        country: {
          countryId: 3,
          countryName: "Mexico",
          countryNameKr: "멕시코"
        },
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
          {
            id: 9,
            name: "Margarita",
            nameKr: "마가리타",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Margarita"
          },
          {
            id: 10,
            name: "Paloma",
            nameKr: "팔로마",
            image: "https://via.placeholder.com/80x80/DAA520/000000?text=Paloma"
          }
        ]
      },
      5: {
        spiritProductId: 5,
        spiritName: "Bombay Sapphire",
        spiritNameKr: "봄베이 사파이어",
        image: "https://via.placeholder.com/200x200/4169E1/FFFFFF?text=Bombay+Sapphire",
        profileNote: "10가지 식물성 원료로 만든 프리미엄 진",
        historyNote: "<p>봄베이 사파이어는 1987년 출시된 프리미엄 진 브랜드입니다.</p><p>10가지 식물성 보태니컬을 사용하여 독특한 풍미를 만들어냅니다.</p>",
        note: "<p>주니퍼 베리를 중심으로 코리안더, 안젤리카 루트 등의 보태니컬이 조화롭게 어우러집니다.</p><p>깔끔하면서도 복합적인 맛이 특징입니다.</p>",
        personalNotes: "진 토닉을 만들 때 가장 선호하는 진입니다. 식물성 향이 풍부하면서도 균형잡힌 맛이 매력적입니다.",
        spirit: {
          spiritId: 5,
          spiritName: "Gin",
          spiritNameKr: "진"
        },
        brand: {
          brandId: 5,
          brandName: "Bombay Sapphire",
          brandNameKr: "봄베이 사파이어"
        },
        country: {
          countryId: 4,
          countryName: "England",
          countryNameKr: "영국"
        },
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
          {
            id: 11,
            name: "Gin & Tonic",
            nameKr: "진 토닉",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=G&T"
          },
          {
            id: 12,
            name: "Negroni",
            nameKr: "네그로니",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Negroni"
          },
          {
            id: 13,
            name: "Tom Collins",
            nameKr: "톰 콜린스",
            image: "https://via.placeholder.com/80x80/4169E1/FFFFFF?text=Collins"
          }
        ]
      },
      6: {
        spiritProductId: 6,
        spiritName: "Bacardi Gran Reserva Limitada",
        spiritNameKr: "바카디 그란 레세르바 리미타다",
        image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Bacardi+Gran",
        profileNote: "16년 숙성된 한정판 프리미엄 럼",
        historyNote: "<p>바카디는 1862년 쿠바에서 시작된 세계적인 럼 브랜드입니다.</p><p>그란 레세르바 리미타다는 16년간 오크통에서 숙성된 최고급 럼입니다.</p>",
        note: "<p>진한 호박색을 띠며, 바닐라, 꿀, 토피의 달콤한 향이 특징입니다.</p><p>부드럽고 깊은 맛과 긴 여운을 선사합니다.</p>",
        personalNotes: "단종된 제품이라 더욱 소중한 럼입니다. 스트레이트로 음미할 때의 깊은 맛이 잊히지 않습니다.",
        spirit: {
          spiritId: 6,
          spiritName: "Rum",
          spiritNameKr: "럼"
        },
        brand: {
          brandId: 6,
          brandName: "Bacardi",
          brandNameKr: "바카디"
        },
        country: {
          countryId: 5,
          countryName: "Cuba",
          countryNameKr: "쿠바"
        },
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
          {
            id: 14,
            name: "Dark 'n' Stormy",
            nameKr: "다크 앤 스토미",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Dark"
          },
          {
            id: 15,
            name: "Rum Old Fashioned",
            nameKr: "럼 올드 패션드",
            image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Rum+OF"
          }
        ]
      }
    };

    const spiritProductData = spiritProductDataMap[spiritProductId];

    if (!spiritProductData) {
      return [404, {error: 'Spirit product not found'}];
    }

    return [200, {data: spiritProductData}];
  });

  /*
 * 제조 기법 Technique List
 * */
  mock.onGet('/api/technique').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
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
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.techniqueName.localeCompare(b.techniqueName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(technique =>
          technique.techniqueName.toLowerCase().includes(search.toLowerCase()) ||
          technique.techniqueNameKr.includes(search)
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 제조 기법 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/technique\/\d+/).reply((config) => {
    const techniqueId = parseInt(config.url?.split('/').pop() || '1');

    // 제조 기법 데이터 맵
    const techniqueDataMap: { [key: number]: any } = {
      1: {
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
      2: {
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
      3: {
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
      4: {
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
      5: {
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
      6: {
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
    };

    const techniqueData = techniqueDataMap[techniqueId];

    if (!techniqueData) {
      return [404, { error: 'Technique not found' }];
    }

    return [200, { data: techniqueData }];
  });

  /*
 * 서빙 잔 Glassware List
 * */
  mock.onGet('/api/glassware').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
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
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.glassName.localeCompare(b.glassName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(glass =>
          glass.glassName.toLowerCase().includes(search.toLowerCase()) ||
          glass.glassNameKr.includes(search)
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
 * 서빙 잔 Detail (개별 조회)
 * */
  mock.onGet(/\/api\/glassware\/\d+/).reply((config) => {
    const glassId = parseInt(config.url?.split('/').pop() || '1');

    // 서빙 잔 데이터 맵
    const glasswareDataMap: { [key: number]: any } = {
      1: {
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
      2: {
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
      3: {
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
      4: {
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
      5: {
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
      6: {
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
    };

    const glasswareData = glasswareDataMap[glassId];

    if (!glasswareData) {
      return [404, { error: 'Glassware not found' }];
    }

    return [200, { data: glasswareData }];
  });

  /*
   * 비터스 Bitters List
   * */
  mock.onGet('/api/bitters').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (5개)
    const fullData = [
      {
        bittersId: 1,
        brandId: 1,
        brandName: "Angostura",
        countryId: 1,
        countryName: "Trinidad and Tobago",
        bittersName: "Angostura Aromatic Bitters",
        bittersNameKr: "앙고스투라 아로마틱 비터스",
        abv: 44.7,
        image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Angostura",
        notes: "<p>1824년부터 생산된 세계에서 가장 유명한 비터스입니다.</p><p>겐티안 뿌리, 허브, 스파이스의 복합적인 향미가 특징입니다.</p>",
        storageType: "실온 보관, 직사광선 피함",
        shelfLifeDays: 1825, // 약 5년
        whenToUseNotes: "<p>위스키 베이스 클래식 칵테일에서 깊이와 복합성을 더하기 위해 사용됩니다.</p><p>올드 패션드에서는 설탕과 함께 비터스윗한 밸런스를, 맨해튼에서는 베르무트의 허브 노트를 강화하는 역할을 합니다.</p><p>2~3대시 정도가 적당하며, 과하게 사용하면 쓴맛이 지배적이 됩니다.</p>",
        substituteNotes: "<p>Peychaud's Bitters로 대체 가능하나 향미가 다릅니다.</p><p>자체 제작 아로마틱 비터스로도 대체할 수 있습니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 1, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 2, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Manhattan" },
          { id: 3, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Whiskey+Sour" }
        ]
      },
      {
        bittersId: 2,
        brandId: 2,
        brandName: "Peychaud's",
        countryId: 2,
        countryName: "United States",
        bittersName: "Peychaud's Bitters",
        bittersNameKr: "페이쇼즈 비터스",
        abv: 35.0,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Peychauds",
        notes: "<p>1830년대 뉴올리언스에서 탄생한 아니스 향의 비터스입니다.</p><p>밝은 붉은색이 특징이며, 달콤하고 꽃향기가 나는 프로필을 가지고 있습니다.</p>",
        storageType: "실온 보관, 밀봉 보관",
        shelfLifeDays: 1460, // 약 4년
        whenToUseNotes: "<p>뉴올리언스 스타일 칵테일에서 아니스와 플로럴 노트를 더하기 위해 사용됩니다.</p><p>사제락에서는 압생트와 조화를 이루며 독특한 향미 프로필을 만들어냅니다.</p><p>앙고스투라보다 부드럽고 달콤한 느낌으로, 라이 위스키 베이스 칵테일과 특히 잘 어울립니다.</p>",
        substituteNotes: "<p>Angostura Bitters로 대체 가능하지만 색과 향이 다릅니다.</p><p>아니스나 펜넬을 넣은 자체 비터스로 유사하게 만들 수 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 4, name: "Sazerac", nameKr: "사제락", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Sazerac" },
          { id: 5, name: "Vieux Carré", nameKr: "비외 카레", image: "https://via.placeholder.com/80x80/A0522D/FFFFFF?text=Vieux+Carre" },
          { id: 6, name: "Creole Cocktail", nameKr: "크리올 칵테일", image: "https://via.placeholder.com/80x80/CD5C5C/FFFFFF?text=Creole" }
        ]
      },
      {
        bittersId: 3,
        brandId: 3,
        brandName: "The Bitter Truth",
        countryId: 3,
        countryName: "Germany",
        bittersName: "The Bitter Truth Orange Bitters",
        bittersNameKr: "더 비터 트루스 오렌지 비터스",
        abv: 39.0,
        image: "https://via.placeholder.com/200x200/FF8C00/000000?text=Orange+Bitters",
        notes: "<p>독일의 크래프트 비터스 브랜드에서 만든 오렌지 비터스입니다.</p><p>신선한 오렌지 껍질과 스파이스의 조화로운 향미가 특징입니다.</p>",
        storageType: "서늘한 곳에 보관, 개봉 후 냉장 권장",
        shelfLifeDays: 1095, // 약 3년
        whenToUseNotes: "<p>진 베이스 칵테일에서 시트러스 향을 강화하고 밝은 느낌을 더하기 위해 사용됩니다.</p><p>마티니에 1~2대시 추가하면 복합적인 아로마를 더해주며, 진 토닉에서는 토닉워터의 쓴맛과 조화를 이룹니다.</p><p>베르무트나 캄파리 같은 재료와도 잘 어울려 이탈리아 스타일 칵테일에도 적합합니다.</p>",
        substituteNotes: "<p>Regan's Orange Bitters No.6로 대체 가능합니다.</p><p>오렌지 필과 스파이스로 자체 제작도 가능합니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 7, name: "Martini", nameKr: "마티니", image: "https://via.placeholder.com/80x80/E6E6FA/000000?text=Martini" },
          { id: 8, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
          { id: 9, name: "Brooklyn", nameKr: "브루클린", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Brooklyn" }
        ]
      },
      {
        bittersId: 4,
        brandId: 4,
        brandName: "Fee Brothers",
        countryId: 2,
        countryName: "United States",
        bittersName: "Fee Brothers Chocolate Bitters",
        bittersNameKr: "피 브라더스 초콜릿 비터스",
        abv: 2.7,
        image: "https://via.placeholder.com/200x200/654321/FFFFFF?text=Chocolate+Bitters",
        notes: "<p>1864년부터 이어온 전통의 비터스 브랜드에서 만든 초콜릿 비터스입니다.</p><p>진한 다크 초콜릿과 카카오의 풍미가 특징입니다.</p>",
        storageType: "실온 보관",
        shelfLifeDays: 730, // 약 2년
        whenToUseNotes: "<p>커피나 초콜릿 풍미가 들어간 디저트 칵테일에서 깊이와 리치함을 더하기 위해 사용됩니다.</p><p>에스프레소 마티니에서는 커피의 로스티한 맛을 강화하고, 위스키나 럼 베이스 칵테일에서는 다크 초콜릿 노트를 추가합니다.</p><p>저도수라서 비교적 많이 사용해도 안전하며, 3~4대시 정도가 적당합니다.</p>",
        substituteNotes: "<p>Aztec Chocolate Bitters로 대체 가능합니다.</p><p>카카오 닙을 이용한 자체 비터스로 만들 수도 있습니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 10, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/3B2F2F/FFFFFF?text=Espresso" },
          { id: 11, name: "Revolver", nameKr: "리볼버", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Revolver" },
          { id: 12, name: "Brandy Alexander", nameKr: "브랜디 알렉산더", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Alexander" }
        ]
      },
      {
        bittersId: 5,
        brandId: 5,
        brandName: "Scrappy's",
        countryId: 2,
        countryName: "United States",
        bittersName: "Scrappy's Lavender Bitters",
        bittersNameKr: "스크래피스 라벤더 비터스",
        abv: 52.5,
        image: "https://via.placeholder.com/200x200/E6E6FA/000000?text=Lavender+Bitters",
        notes: "<p>시애틀 기반의 크래프트 비터스 브랜드입니다.</p><p>유기농 라벤더를 사용하여 섬세한 꽃향기와 허브 노트가 특징입니다.</p>",
        storageType: "서늘하고 어두운 곳에 보관",
        shelfLifeDays: 1095, // 약 3년
        whenToUseNotes: "<p>진 베이스나 샴페인 칵테일에서 우아한 플로럴 노트를 더하기 위해 사용됩니다.</p><p>에비에이션이나 프렌치 75 같은 섬세한 칵테일에 1~2대시만으로도 꽃향기를 선사합니다.</p><p>과하게 사용하면 비누 같은 향이 날 수 있으니 주의가 필요하며, 레몬이나 바이올렛 리큐르와 특히 잘 어울립니다.</p>",
        substituteNotes: "<p>The Bitter Truth Violet Bitters로 유사한 플로럴 느낌을 낼 수 있습니다.</p><p>건조 라벤더로 자체 틴크처를 만들어 사용 가능합니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 13, name: "Aviation", nameKr: "에비에이션", image: "https://via.placeholder.com/80x80/9370DB/FFFFFF?text=Aviation" },
          { id: 14, name: "French 75", nameKr: "프렌치 75", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=French+75" },
          { id: 15, name: "Bee's Knees", nameKr: "비즈 니즈", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Bees+Knees" }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.bittersName.localeCompare(b.bittersName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(bitters =>
          bitters.bittersName.toLowerCase().includes(search.toLowerCase()) ||
          bitters.bittersNameKr.includes(search) ||
          bitters.brandName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 비터스 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/bitters\/\d+/).reply((config) => {
    const bittersId = parseInt(config.url?.split('/').pop() || '1');

    // 비터스 데이터 맵
    const bittersDataMap: { [key: number]: any } = {
      1: {
        bittersId: 1,
        brandId: 1,
        brandName: "Angostura",
        countryId: 1,
        countryName: "Trinidad and Tobago",
        bittersName: "Angostura Aromatic Bitters",
        bittersNameKr: "앙고스투라 아로마틱 비터스",
        abv: 44.7,
        image: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Angostura",
        notes: "<p>1824년부터 생산된 세계에서 가장 유명한 비터스입니다.</p><p>겐티안 뿌리, 허브, 스파이스의 복합적인 향미가 특징입니다.</p>",
        storageType: "실온 보관, 직사광선 피함",
        shelfLifeDays: 1825, // 약 5년
        whenToUseNotes: "<p>위스키 베이스 클래식 칵테일에서 깊이와 복합성을 더하기 위해 사용됩니다.</p><p>올드 패션드에서는 설탕과 함께 비터스윗한 밸런스를, 맨해튼에서는 베르무트의 허브 노트를 강화하는 역할을 합니다.</p><p>2~3대시 정도가 적당하며, 과하게 사용하면 쓴맛이 지배적이 됩니다.</p>",
        substituteNotes: "<p>Peychaud's Bitters로 대체 가능하나 향미가 다릅니다.</p><p>자체 제작 아로마틱 비터스로도 대체할 수 있습니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 1, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 2, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Manhattan" },
          { id: 3, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Whiskey+Sour" }
        ]
      },
      2: {
        bittersId: 2,
        brandId: 2,
        brandName: "Peychaud's",
        countryId: 2,
        countryName: "United States",
        bittersName: "Peychaud's Bitters",
        bittersNameKr: "페이쇼즈 비터스",
        abv: 35.0,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Peychauds",
        notes: "<p>1830년대 뉴올리언스에서 탄생한 아니스 향의 비터스입니다.</p><p>밝은 붉은색이 특징이며, 달콤하고 꽃향기가 나는 프로필을 가지고 있습니다.</p>",
        storageType: "실온 보관, 밀봉 보관",
        shelfLifeDays: 1460, // 약 4년
        whenToUseNotes: "<p>뉴올리언스 스타일 칵테일에서 아니스와 플로럴 노트를 더하기 위해 사용됩니다.</p><p>사제락에서는 압생트와 조화를 이루며 독특한 향미 프로필을 만들어냅니다.</p><p>앙고스투라보다 부드럽고 달콤한 느낌으로, 라이 위스키 베이스 칵테일과 특히 잘 어울립니다.</p>",
        substituteNotes: "<p>Angostura Bitters로 대체 가능하지만 색과 향이 다릅니다.</p><p>아니스나 펜넬을 넣은 자체 비터스로 유사하게 만들 수 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 4, name: "Sazerac", nameKr: "사제락", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Sazerac" },
          { id: 5, name: "Vieux Carré", nameKr: "비외 카레", image: "https://via.placeholder.com/80x80/A0522D/FFFFFF?text=Vieux+Carre" },
          { id: 6, name: "Creole Cocktail", nameKr: "크리올 칵테일", image: "https://via.placeholder.com/80x80/CD5C5C/FFFFFF?text=Creole" }
        ]
      },
      3: {
        bittersId: 3,
        brandId: 3,
        brandName: "The Bitter Truth",
        countryId: 3,
        countryName: "Germany",
        bittersName: "The Bitter Truth Orange Bitters",
        bittersNameKr: "더 비터 트루스 오렌지 비터스",
        abv: 39.0,
        image: "https://via.placeholder.com/200x200/FF8C00/000000?text=Orange+Bitters",
        notes: "<p>독일의 크래프트 비터스 브랜드에서 만든 오렌지 비터스입니다.</p><p>신선한 오렌지 껍질과 스파이스의 조화로운 향미가 특징입니다.</p>",
        storageType: "서늘한 곳에 보관, 개봉 후 냉장 권장",
        shelfLifeDays: 1095, // 약 3년
        whenToUseNotes: "<p>진 베이스 칵테일에서 시트러스 향을 강화하고 밝은 느낌을 더하기 위해 사용됩니다.</p><p>마티니에 1~2대시 추가하면 복합적인 아로마를 더해주며, 진 토닉에서는 토닉워터의 쓴맛과 조화를 이룹니다.</p><p>베르무트나 캄파리 같은 재료와도 잘 어울려 이탈리아 스타일 칵테일에도 적합합니다.</p>",
        substituteNotes: "<p>Regan's Orange Bitters No.6로 대체 가능합니다.</p><p>오렌지 필과 스파이스로 자체 제작도 가능합니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 7, name: "Martini", nameKr: "마티니", image: "https://via.placeholder.com/80x80/E6E6FA/000000?text=Martini" },
          { id: 8, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
          { id: 9, name: "Brooklyn", nameKr: "브루클린", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Brooklyn" }
        ]
      },
      4: {
        bittersId: 4,
        brandId: 4,
        brandName: "Fee Brothers",
        countryId: 2,
        countryName: "United States",
        bittersName: "Fee Brothers Chocolate Bitters",
        bittersNameKr: "피 브라더스 초콜릿 비터스",
        abv: 2.7,
        image: "https://via.placeholder.com/200x200/654321/FFFFFF?text=Chocolate+Bitters",
        notes: "<p>1864년부터 이어온 전통의 비터스 브랜드에서 만든 초콜릿 비터스입니다.</p><p>진한 다크 초콜릿과 카카오의 풍미가 특징입니다.</p>",
        storageType: "실온 보관",
        shelfLifeDays: 730, // 약 2년
        whenToUseNotes: "<p>커피나 초콜릿 풍미가 들어간 디저트 칵테일에서 깊이와 리치함을 더하기 위해 사용됩니다.</p><p>에스프레소 마티니에서는 커피의 로스티한 맛을 강화하고, 위스키나 럼 베이스 칵테일에서는 다크 초콜릿 노트를 추가합니다.</p><p>저도수라서 비교적 많이 사용해도 안전하며, 3~4대시 정도가 적당합니다.</p>",
        substituteNotes: "<p>Aztec Chocolate Bitters로 대체 가능합니다.</p><p>카카오 닙을 이용한 자체 비터스로 만들 수도 있습니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 10, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/3B2F2F/FFFFFF?text=Espresso" },
          { id: 11, name: "Revolver", nameKr: "리볼버", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Revolver" },
          { id: 12, name: "Brandy Alexander", nameKr: "브랜디 알렉산더", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Alexander" }
        ]
      },
      5: {
        bittersId: 5,
        brandId: 5,
        brandName: "Scrappy's",
        countryId: 2,
        countryName: "United States",
        bittersName: "Scrappy's Lavender Bitters",
        bittersNameKr: "스크래피스 라벤더 비터스",
        abv: 52.5,
        image: "https://via.placeholder.com/200x200/E6E6FA/000000?text=Lavender+Bitters",
        notes: "<p>시애틀 기반의 크래프트 비터스 브랜드입니다.</p><p>유기농 라벤더를 사용하여 섬세한 꽃향기와 허브 노트가 특징입니다.</p>",
        storageType: "서늘하고 어두운 곳에 보관",
        shelfLifeDays: 1095, // 약 3년
        whenToUseNotes: "<p>진 베이스나 샴페인 칵테일에서 우아한 플로럴 노트를 더하기 위해 사용됩니다.</p><p>에비에이션이나 프렌치 75 같은 섬세한 칵테일에 1~2대시만으로도 꽃향기를 선사합니다.</p><p>과하게 사용하면 비누 같은 향이 날 수 있으니 주의가 필요하며, 레몬이나 바이올렛 리큐르와 특히 잘 어울립니다.</p>",
        substituteNotes: "<p>The Bitter Truth Violet Bitters로 유사한 플로럴 느낌을 낼 수 있습니다.</p><p>건조 라벤더로 자체 틴크처를 만들어 사용 가능합니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 13, name: "Aviation", nameKr: "에비에이션", image: "https://via.placeholder.com/80x80/9370DB/FFFFFF?text=Aviation" },
          { id: 14, name: "French 75", nameKr: "프렌치 75", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=French+75" },
          { id: 15, name: "Bee's Knees", nameKr: "비즈 니즈", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Bees+Knees" }
        ]
      }
    };

    const bittersData = bittersDataMap[bittersId];

    if (!bittersData) {
      return [404, { error: 'Bitters not found' }];
    }

    return [200, { data: bittersData }];
  });

  /*
   * 탄산/소다 Carbonated List
   * */
  mock.onGet('/api/carbonated').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
      {
        carbonatedId: 1,
        brandId: 1,
        brandName: "Fever-Tree",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fever-Tree Indian Tonic Water",
        carbonatedNameKr: "피버트리 인디언 토닉워터",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/87CEEB/000000?text=Tonic+Water",
        notes: "<p>천연 퀴닌을 사용한 프리미엄 토닉워터입니다.</p><p>은은한 쓴맛과 시트러스 노트가 특징이며, 진 앤 토닉의 표준으로 자리잡았습니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>진 베이스 롱 드링크 칵테일에서 가장 많이 사용됩니다.</p><p>진 앤 토닉에서는 진의 보타니컬을 강조하며, 보드카 토닉에서는 깔끔한 청량감을 제공합니다.</p><p>퀴닌의 쓴맛이 스피릿의 알코올감을 부드럽게 만들어줍니다.</p>",
        substituteNotes: "<p>Schweppes Tonic Water로 대체 가능하나 단맛이 더 강합니다.</p><p>Q Tonic이나 Fentimans Tonic Water도 좋은 대안입니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 1, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
          { id: 2, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Vodka+Tonic" },
          { id: 3, name: "Elderflower Tonic", nameKr: "엘더플라워 토닉", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Elderflower" }
        ]
      },
      {
        carbonatedId: 2,
        brandId: 2,
        brandName: "Fever-Tree",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fever-Tree Ginger Beer",
        carbonatedNameKr: "피버트리 진저비어",
        sugarLevel: 4,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Ginger+Beer",
        notes: "<p>나이지리아산 생강을 사용한 강렬한 진저비어입니다.</p><p>매콤하고 스파이시한 생강 향이 두드러지며, 적당한 단맛이 조화를 이룹니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>럼 베이스 칵테일에서 스파이시한 킥을 더하기 위해 사용됩니다.</p><p>모스코 뮬에서는 보드카와 라임의 상큼함에 생강의 매운맛을 더해주며, 다크 앤 스토미에서는 다크 럼의 깊은 맛을 끌어올립니다.</p><p>진저에일보다 생강 맛이 훨씬 강해 칵테일에 캐릭터를 부여합니다.</p>",
        substituteNotes: "<p>Bundaberg Ginger Beer로 대체 가능하나 더 달고 부드럽습니다.</p><p>Gosling's Ginger Beer는 다크 앤 스토미의 클래식 선택입니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 4, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Moscow+Mule" },
          { id: 5, name: "Dark 'n' Stormy", nameKr: "다크 앤 스토미", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Dark+Stormy" },
          { id: 6, name: "Jamaican Mule", nameKr: "자메이칸 뮬", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Jamaican" }
        ]
      },
      {
        carbonatedId: 3,
        brandId: 3,
        brandName: "Schweppes",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Schweppes Ginger Ale",
        carbonatedNameKr: "슈웹스 진저에일",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/F0E68C/000000?text=Ginger+Ale",
        notes: "<p>1870년부터 이어온 클래식 진저에일입니다.</p><p>진저비어보다 부드러운 생강 향과 달콤한 맛이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "실온 또는 냉장 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "<p>위스키 베이스 하이볼에서 부드러운 생강 향을 더하기 위해 사용됩니다.</p><p>위스키 진저에서는 위스키의 풍미를 해치지 않으면서 청량감을 제공하며, 호스넥에서는 브랜디와 완벽한 조화를 이룹니다.</p><p>진저비어보다 순하고 달콤해 대중적으로 선호됩니다.</p>",
        substituteNotes: "<p>Canada Dry Ginger Ale로 대체 가능하며 맛이 유사합니다.</p><p>Fever-Tree Ginger Ale은 프리미엄 대안입니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 7, name: "Whiskey Ginger", nameKr: "위스키 진저", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Whiskey+Ginger" },
          { id: 8, name: "Horse's Neck", nameKr: "호스넥", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Horses+Neck" },
          { id: 9, name: "Presbyterian", nameKr: "프레스비테리안", image: "https://via.placeholder.com/80x80/F4A460/000000?text=Presbyterian" }
        ]
      },
      {
        carbonatedId: 4,
        brandId: 4,
        brandName: "Coca-Cola",
        countryId: 2,
        countryName: "United States",
        carbonatedName: "Coca-Cola Classic",
        carbonatedNameKr: "코카콜라 클래식",
        sugarLevel: 5,
        image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Coca+Cola",
        notes: "<p>세계에서 가장 유명한 콜라 음료입니다.</p><p>바닐라, 시나몬, 시트러스의 복합적인 향미와 높은 당도가 특징입니다.</p>",
        shelfLifeDays: 270, // 약 9개월
        storageType: "실온 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "<p>럼 베이스 칵테일에서 달콤함과 깊이를 더하기 위해 사용됩니다.</p><p>쿠바 리브레에서는 럼과 라임에 콜라의 캐러멜 노트를 더해주며, 롱 아일랜드 아이스티에서는 여러 스피릿을 하나로 묶어주는 역할을 합니다.</p><p>위스키 콕에서는 위스키의 오크 향과 조화를 이룹니다.</p>",
        substituteNotes: "<p>Pepsi Cola로 대체 가능하나 약간 더 달고 시트러스 향이 강합니다.</p><p>RC Cola나 Mexican Coke(사탕수수 설탕 사용)도 대안입니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 10, name: "Cuba Libre", nameKr: "쿠바 리브레", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Cuba+Libre" },
          { id: 11, name: "Long Island Iced Tea", nameKr: "롱 아일랜드 아이스티", image: "https://via.placeholder.com/80x80/A0522D/FFFFFF?text=LIIT" },
          { id: 12, name: "Whiskey Coke", nameKr: "위스키 콕", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Whiskey+Coke" }
        ]
      },
      {
        carbonatedId: 5,
        brandId: 5,
        brandName: "San Pellegrino",
        countryId: 3,
        countryName: "Italy",
        carbonatedName: "San Pellegrino Sparkling Water",
        carbonatedNameKr: "산펠레그리노 탄산수",
        sugarLevel: 1,
        image: "https://via.placeholder.com/200x200/E0E0E0/000000?text=Sparkling+Water",
        notes: "<p>이탈리아 알프스에서 나오는 천연 미네랄 탄산수입니다.</p><p>미세한 탄산과 깔끔한 맛이 특징이며, 칵테일의 본래 맛을 해치지 않습니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "실온 보관, 개봉 후 냉장 보관 및 즉시 소비",
        whenToUseNotes: "<p>스피릿의 맛을 희석하지 않으면서 청량감을 더하기 위해 사용됩니다.</p><p>하이볼이나 스프리츠 계열에서 탄산감만 제공하며, 베네치안 스프리츠에서는 아페롤과 프로세코에 가벼움을 더해줍니다.</p><p>무설탕이라 칵테일의 당도 조절이 용이합니다.</p>",
        substituteNotes: "<p>Perrier나 Topo Chico로 대체 가능합니다.</p><p>일반 탄산수(Club Soda)도 사용 가능하나 미네랄 풍미가 적습니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 13, name: "Aperol Spritz", nameKr: "아페롤 스프리츠", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Aperol+Spritz" },
          { id: 14, name: "Highball", nameKr: "하이볼", image: "https://via.placeholder.com/80x80/F5DEB3/000000?text=Highball" },
          { id: 15, name: "Tom Collins", nameKr: "톰 콜린스", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Tom+Collins" }
        ]
      },
      {
        carbonatedId: 6,
        brandId: 6,
        brandName: "Fentimans",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fentimans Victorian Lemonade",
        carbonatedNameKr: "펜티먼스 빅토리안 레모네이드",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/FFFACD/000000?text=Lemonade",
        notes: "<p>전통 보타니컬 발효 방식으로 만든 프리미엄 레모네이드입니다.</p><p>레몬과 허브의 복합적인 향미, 적당한 단맛과 탄산이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>보드카나 진 베이스 칵테일에서 시트러스 노트와 청량감을 동시에 제공하기 위해 사용됩니다.</p><p>리네이드 스프리츠에서는 화이트 와인과 조화를 이루며, 섄디에서는 맥주에 상큼함을 더해줍니다.</p><p>일반 레몬 사이다보다 허브 향이 있어 복합적인 맛을 만들어냅니다.</p>",
        substituteNotes: "<p>Schweppes Lemonade나 7UP으로 대체 가능하나 향미가 단순합니다.</p><p>직접 만든 레모네이드에 탄산수를 섞어도 좋습니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 16, name: "Vodka Lemonade", nameKr: "보드카 레모네이드", image: "https://via.placeholder.com/80x80/FFFFE0/000000?text=Vodka+Lemonade" },
          { id: 17, name: "Shandy", nameKr: "섄디", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=Shandy" },
          { id: 18, name: "Lynchburg Lemonade", nameKr: "린치버그 레모네이드", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Lynchburg" }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.carbonatedName.localeCompare(b.carbonatedName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(carbonated =>
          carbonated.carbonatedName.toLowerCase().includes(search.toLowerCase()) ||
          carbonated.carbonatedNameKr.includes(search) ||
          carbonated.brandName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 탄산/소다 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/carbonated\/\d+/).reply((config) => {
    const carbonatedId = parseInt(config.url?.split('/').pop() || '1');

    // 탄산/소다 데이터 맵
    const carbonatedDataMap: { [key: number]: any } = {
      1: {
        carbonatedId: 1,
        brandId: 1,
        brandName: "Fever-Tree",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fever-Tree Indian Tonic Water",
        carbonatedNameKr: "피버트리 인디언 토닉워터",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/87CEEB/000000?text=Tonic+Water",
        notes: "<p>천연 퀴닌을 사용한 프리미엄 토닉워터입니다.</p><p>은은한 쓴맛과 시트러스 노트가 특징이며, 진 앤 토닉의 표준으로 자리잡았습니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>진 베이스 롱 드링크 칵테일에서 가장 많이 사용됩니다.</p><p>진 앤 토닉에서는 진의 보타니컬을 강조하며, 보드카 토닉에서는 깔끔한 청량감을 제공합니다.</p><p>퀴닌의 쓴맛이 스피릿의 알코올감을 부드럽게 만들어줍니다.</p>",
        substituteNotes: "<p>Schweppes Tonic Water로 대체 가능하나 단맛이 더 강합니다.</p><p>Q Tonic이나 Fentimans Tonic Water도 좋은 대안입니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 1, name: "Gin & Tonic", nameKr: "진 토닉", image: "https://via.placeholder.com/80x80/87CEEB/000000?text=G&T" },
          { id: 2, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Vodka+Tonic" },
          { id: 3, name: "Elderflower Tonic", nameKr: "엘더플라워 토닉", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Elderflower" }
        ]
      },
      2: {
        carbonatedId: 2,
        brandId: 2,
        brandName: "Fever-Tree",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fever-Tree Ginger Beer",
        carbonatedNameKr: "피버트리 진저비어",
        sugarLevel: 4,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Ginger+Beer",
        notes: "<p>나이지리아산 생강을 사용한 강렬한 진저비어입니다.</p><p>매콤하고 스파이시한 생강 향이 두드러지며, 적당한 단맛이 조화를 이룹니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>럼 베이스 칵테일에서 스파이시한 킥을 더하기 위해 사용됩니다.</p><p>모스코 뮬에서는 보드카와 라임의 상큼함에 생강의 매운맛을 더해주며, 다크 앤 스토미에서는 다크 럼의 깊은 맛을 끌어올립니다.</p><p>진저에일보다 생강 맛이 훨씬 강해 칵테일에 캐릭터를 부여합니다.</p>",
        substituteNotes: "<p>Bundaberg Ginger Beer로 대체 가능하나 더 달고 부드럽습니다.</p><p>Gosling's Ginger Beer는 다크 앤 스토미의 클래식 선택입니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 4, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Moscow+Mule" },
          { id: 5, name: "Dark 'n' Stormy", nameKr: "다크 앤 스토미", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Dark+Stormy" },
          { id: 6, name: "Jamaican Mule", nameKr: "자메이칸 뮬", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Jamaican" }
        ]
      },
      3: {
        carbonatedId: 3,
        brandId: 3,
        brandName: "Schweppes",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Schweppes Ginger Ale",
        carbonatedNameKr: "슈웹스 진저에일",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/F0E68C/000000?text=Ginger+Ale",
        notes: "<p>1870년부터 이어온 클래식 진저에일입니다.</p><p>진저비어보다 부드러운 생강 향과 달콤한 맛이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "실온 또는 냉장 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "<p>위스키 베이스 하이볼에서 부드러운 생강 향을 더하기 위해 사용됩니다.</p><p>위스키 진저에서는 위스키의 풍미를 해치지 않으면서 청량감을 제공하며, 호스넥에서는 브랜디와 완벽한 조화를 이룹니다.</p><p>진저비어보다 순하고 달콤해 대중적으로 선호됩니다.</p>",
        substituteNotes: "<p>Canada Dry Ginger Ale로 대체 가능하며 맛이 유사합니다.</p><p>Fever-Tree Ginger Ale은 프리미엄 대안입니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 7, name: "Whiskey Ginger", nameKr: "위스키 진저", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Whiskey+Ginger" },
          { id: 8, name: "Horse's Neck", nameKr: "호스넥", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Horses+Neck" },
          { id: 9, name: "Presbyterian", nameKr: "프레스비테리안", image: "https://via.placeholder.com/80x80/F4A460/000000?text=Presbyterian" }
        ]
      },
      4: {
        carbonatedId: 4,
        brandId: 4,
        brandName: "Coca-Cola",
        countryId: 2,
        countryName: "United States",
        carbonatedName: "Coca-Cola Classic",
        carbonatedNameKr: "코카콜라 클래식",
        sugarLevel: 5,
        image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Coca+Cola",
        notes: "<p>세계에서 가장 유명한 콜라 음료입니다.</p><p>바닐라, 시나몬, 시트러스의 복합적인 향미와 높은 당도가 특징입니다.</p>",
        shelfLifeDays: 270, // 약 9개월
        storageType: "실온 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "<p>럼 베이스 칵테일에서 달콤함과 깊이를 더하기 위해 사용됩니다.</p><p>쿠바 리브레에서는 럼과 라임에 콜라의 캐러멜 노트를 더해주며, 롱 아일랜드 아이스티에서는 여러 스피릿을 하나로 묶어주는 역할을 합니다.</p><p>위스키 콕에서는 위스키의 오크 향과 조화를 이룹니다.</p>",
        substituteNotes: "<p>Pepsi Cola로 대체 가능하나 약간 더 달고 시트러스 향이 강합니다.</p><p>RC Cola나 Mexican Coke(사탕수수 설탕 사용)도 대안입니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 10, name: "Cuba Libre", nameKr: "쿠바 리브레", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Cuba+Libre" },
          { id: 11, name: "Long Island Iced Tea", nameKr: "롱 아일랜드 아이스티", image: "https://via.placeholder.com/80x80/A0522D/FFFFFF?text=LIIT" },
          { id: 12, name: "Whiskey Coke", nameKr: "위스키 콕", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Whiskey+Coke" }
        ]
      },
      5: {
        carbonatedId: 5,
        brandId: 5,
        brandName: "San Pellegrino",
        countryId: 3,
        countryName: "Italy",
        carbonatedName: "San Pellegrino Sparkling Water",
        carbonatedNameKr: "산펠레그리노 탄산수",
        sugarLevel: 1,
        image: "https://via.placeholder.com/200x200/E0E0E0/000000?text=Sparkling+Water",
        notes: "<p>이탈리아 알프스에서 나오는 천연 미네랄 탄산수입니다.</p><p>미세한 탄산과 깔끔한 맛이 특징이며, 칵테일의 본래 맛을 해치지 않습니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "실온 보관, 개봉 후 냉장 보관 및 즉시 소비",
        whenToUseNotes: "<p>스피릿의 맛을 희석하지 않으면서 청량감을 더하기 위해 사용됩니다.</p><p>하이볼이나 스프리츠 계열에서 탄산감만 제공하며, 베네치안 스프리츠에서는 아페롤과 프로세코에 가벼움을 더해줍니다.</p><p>무설탕이라 칵테일의 당도 조절이 용이합니다.</p>",
        substituteNotes: "<p>Perrier나 Topo Chico로 대체 가능합니다.</p><p>일반 탄산수(Club Soda)도 사용 가능하나 미네랄 풍미가 적습니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 13, name: "Aperol Spritz", nameKr: "아페롤 스프리츠", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Aperol+Spritz" },
          { id: 14, name: "Highball", nameKr: "하이볼", image: "https://via.placeholder.com/80x80/F5DEB3/000000?text=Highball" },
          { id: 15, name: "Tom Collins", nameKr: "톰 콜린스", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Tom+Collins" }
        ]
      },
      6: {
        carbonatedId: 6,
        brandId: 6,
        brandName: "Fentimans",
        countryId: 1,
        countryName: "United Kingdom",
        carbonatedName: "Fentimans Victorian Lemonade",
        carbonatedNameKr: "펜티먼스 빅토리안 레모네이드",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/FFFACD/000000?text=Lemonade",
        notes: "<p>전통 보타니컬 발효 방식으로 만든 프리미엄 레모네이드입니다.</p><p>레몬과 허브의 복합적인 향미, 적당한 단맛과 탄산이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "냉장 보관 권장, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>보드카나 진 베이스 칵테일에서 시트러스 노트와 청량감을 동시에 제공하기 위해 사용됩니다.</p><p>리네이드 스프리츠에서는 화이트 와인과 조화를 이루며, 섄디에서는 맥주에 상큼함을 더해줍니다.</p><p>일반 레몬 사이다보다 허브 향이 있어 복합적인 맛을 만들어냅니다.</p>",
        substituteNotes: "<p>Schweppes Lemonade나 7UP으로 대체 가능하나 향미가 단순합니다.</p><p>직접 만든 레모네이드에 탄산수를 섞어도 좋습니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 16, name: "Vodka Lemonade", nameKr: "보드카 레모네이드", image: "https://via.placeholder.com/80x80/FFFFE0/000000?text=Vodka+Lemonade" },
          { id: 17, name: "Shandy", nameKr: "섄디", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=Shandy" },
          { id: 18, name: "Lynchburg Lemonade", nameKr: "린치버그 레모네이드", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Lynchburg" }
        ]
      }
    };

    const carbonatedData = carbonatedDataMap[carbonatedId];

    if (!carbonatedData) {
      return [404, { error: 'Carbonated not found' }];
    }

    return [200, { data: carbonatedData }];
  });
}
