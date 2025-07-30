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
  * 칵테일 Detail
  * */
  mock.onGet('/api/cocktail').reply((config) => {
    const cocktailId = config.params?.cocktailId || 1;
    
    const cocktailData = {
      cocktailId: cocktailId,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      cocktailName: `Test Cocktail ${cocktailId}`,
      cocktailNameKr: `테스트 칵테일 ${cocktailId}`,
      category: "Refreshing",
      abs_percentage: 10 + cocktailId,
      difficulty: 1,
      isVariation: false,
      profileNote: `테스트 칵테일 ${cocktailId}의 설명입니다.`,

      historyNote: "<p>모히토는 16세기 쿠바에서 시작된 칵테일로, 원래는 해적들이 마시던 음료였습니다.</p><p>현재의 형태는 20세기 초 하바나의 바에서 완성되었으며, 어니스트 헤밍웨이가 사랑했던 칵테일로도 유명합니다.</p>",
      note: "<p><strong>재료:</strong></p><ul><li>화이트 럼 60ml</li><li>신선한 민트 잎 10-12개</li><li>라임 1/2개</li><li>설탕 2티스푼</li><li>소다수</li><li>얼음</li></ul><p><strong>만드는 법:</strong></p><ol><li>하이볼 글라스에 민트 잎과 설탕을 넣고 가볍게 머들링</li><li>라임 조각을 추가하고 다시 머들링</li><li>럼을 넣고 얼음으로 채움</li><li>소다수로 탑업하고 가볍게 저어줌</li></ol>",
      tip_note: "<p><strong>완벽한 모히토를 위한 팁:</strong></p><ul><li>민트 잎을 너무 세게 머들링하지 마세요 - 쓴맛이 날 수 있습니다</li><li>신선한 라임 주스를 사용하세요</li><li>소다수는 마지막에 넣어 탄산이 빠지지 않도록 하세요</li><li>얼음은 큼직한 것을 사용하면 희석을 줄일 수 있습니다</li></ul>",

      ingredients: {
        spirits: [
          { id: 1, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", spiritName: "White Rum", spiritNameKr: "화이트 럼" },
          { id: 2, spiritName: "Dark Rum", spiritNameKr: "다크 럼" }
        ],
        juices: [
          { id: 1, image: "https://images.unsplash.com/photo-1557401279-8e8de6c4659b?w=100&h=100&fit=crop", juiceName: "Lime Juice", juiceNameKr: "라임 주스" },
          { id: 2, juiceName: "Lemon Juice", juiceNameKr: "레몬 주스" }
        ],
        bitters: [
          { id: 1, bitterName: "Angostura Bitters", bitterNameKr: "앙고스투라 비터스" }
        ],
        syrups: [
          { id: 1, image: "https://images.unsplash.com/photo-1572441755997-6a0e8b3c1d42?w=100&h=100&fit=crop", syrupName: "Simple Syrup", syrupNameKr: "심플 시럽" },
          { id: 2, syrupName: "Mint Syrup", syrupNameKr: "민트 시럽" }
        ],
        carbonated: [
          { id: 1, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop", carbonatedName: "Soda Water", carbonatedNameKr: "소다수" },
          { id: 2, carbonatedName: "Sparkling Water", carbonatedNameKr: "스파클링 워터" },
          { id: 3, carbonatedName: "Tonic Water", carbonatedNameKr: "토닉워터" }
        ],
        dairy: [],
        garnishes: [
          { id: 1, image: "https://images.unsplash.com/photo-1607103688605-8a06a4a4c4fc?w=100&h=100&fit=crop", garnishName: "Mint Leaves", garnishNameKr: "민트 잎" },
          { id: 2, garnishName: "Lime Wedge", garnishNameKr: "라임 웨지" },
          { id: 3, garnishName: "Cherry", garnishNameKr: "체리" }
        ],
        others: [
          { id: 1, image: "https://images.unsplash.com/photo-1571167025672-ca4cb3cd8af1?w=100&h=100&fit=crop", otherIngredientName: "Sugar", otherIngredientNameKr: "설탕" },
          { id: 2, otherIngredientName: "Ice Cubes", otherIngredientNameKr: "얼음" }
        ]
      },

      tools: [
        { id: 1, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", toolName: "Muddler", toolNameKr: "머들러" },
        { id: 2, toolName: "Bar Spoon", toolNameKr: "바 스푼" },
        { id: 3, toolName: "Jigger", toolNameKr: "지거" },
        { id: 4, toolName: "Shaker", toolNameKr: "셰이커" },
        { id: 5, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", toolName: "Strainer", toolNameKr: "스트레이너" },
        { id: 6, toolName: "Cocktail Strainer", toolNameKr: "칵테일 스트레이너" },
        { id: 7, toolName: "Muddling Spoon", toolNameKr: "머들링 스푼" },
        { id: 8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", toolName: "Cocktail Picker", toolNameKr: "칵테일 피커" }
      ],
      glassware: [
        { id: 1, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop", glassName: "Highball Glass", glassNameKr: "하이볼 글라스" },
        { id: 2, glassName: "Collins Glass", glassNameKr: "콜린스 글라스" }
      ],

      techniques: [
        { id: 1, techniqueName: "Muddling", techniqueNameKr: "머들링" },
        { id: 2, techniqueName: "Building", techniqueNameKr: "빌드" },
        { id: 3, techniqueName: "Stirring", techniqueNameKr: "스터링" },
        { id: 4, techniqueName: "Shaking", techniqueNameKr: "셰이킹" }
      ],

      personalNotes: "처음 만들어본 칵테일이에요. 생각보다 간단해서 놀랐고, 민트향이 정말 상쾌했습니다!",
      MakerTips: "민트를 너무 세게 으깨면 정말 쓴맛이 나더라고요. 살살 눌러주는 게 포인트인 것 같아요.",
      personalReview: "여름에 마시기 정말 좋은 칵테일이에요. 도수도 적당하고 상큼해서 자주 만들어 마시고 있습니다.",

      hashtags: {
        cocktailHashtagId: 1,
        cocktailHashtag: "모히토,쿠바,민트,상쾌한,여름칵테일,럼베이스,클래식"
      },

      likeCount: 1234,
      shareCount: 4312,

      comments: [
        {
          id: 1,
          username: "칵테일러버",
          content: "정말 맛있는 레시피네요! 민트의 양을 조절하는 게 포인트인 것 같아요.",
          createdDate: "2024-11-10",
          replies: [
            {
              id: 1,
              username: "작성자",
              content: "맞아요! 민트는 개인 취향에 따라 조절하시면 됩니다.",
              createdDate: "2024-11-10"
            }
          ]
        },
        {
          id: 2,
          username: "홈바텐더",
          content: "소다수 대신 토닉워터를 써봤는데도 괜찮더라고요!",
          createdDate: "2024-11-12"
        },
        {
          id: 3,
          username: "모히토마니아",
          content: "쿠바에서 직접 마셔본 모히토와 정말 비슷한 맛이에요. 감사합니다!",
          createdDate: "2024-11-14",
          replies: [
            {
              id: 1,
              username: "작성자",
              content: "와! 쿠바에서 드셔보신 분이 인정해주시니 정말 기쁘네요!",
              createdDate: "2024-11-14"
            },
            {
              id: 2,
              username: "여행가",
              content: "저도 쿠바 여행 때 마셔봤는데 정말 그 맛이에요!",
              createdDate: "2024-11-15"
            }
          ]
        }
      ],

      createAt: '2024-11-15',
      updatedAt: '2024-11-15',
    };

    // response.data.data 구조로 반환
    return [200, { data: cocktailData }];
  });
}