// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import MockAdapter from "axios-mock-adapter";

export function setupIngredientsMock(mock: MockAdapter): void {
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

  /*
 * 주스 Juice List
 * */
  mock.onGet('/api/juice').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
      {
        juiceId: 1,
        brandId: 7,
        brandName: "Tropicana",
        brandNameKr: "트로피카나",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Tropicana Pure Premium Orange Juice",
        juiceNameKr: "트로피카나 퓨어 프리미엄 오렌지 주스",
        sugarLevel: 4,
        acidityLevel: 3,
        image: "https://via.placeholder.com/200x200/FFA500/FFFFFF?text=Orange+Juice",
        notes: "<p>100% 착즙 오렌지 주스로 농축 환원 과정 없이 신선함을 유지합니다.</p><p>자연스러운 단맛과 상큼한 산미가 균형을 이루며, 과육이 살아있습니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>칵테일에 가장 많이 사용되는 기본 주스입니다.</p><p>신선한 오렌지 향이 스피릿의 알코올감을 부드럽게 만들어줍니다.</p>",
        substituteNotes: "<p>Minute Maid나 Simply Orange로 대체 가능합니다.</p><p>생과일 직접 착즙이 가장 이상적이지만 편의성이 떨어집니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 19, name: "Screwdriver", nameKr: "스크루드라이버", image: "https://via.placeholder.com/80x80/FFA500/FFFFFF?text=Screwdriver" },
          { id: 20, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" },
          { id: 21, name: "Mimosa", nameKr: "미모사", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Mimosa" }
        ]
      },
      {
        juiceId: 2,
        brandId: 8,
        brandName: "Ocean Spray",
        brandNameKr: "오션 스프레이",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Ocean Spray Cranberry Juice Cocktail",
        juiceNameKr: "오션 스프레이 크랜베리 주스 칵테일",
        sugarLevel: 4,
        acidityLevel: 4,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Cranberry+Juice",
        notes: "<p>크랜베리 특유의 강한 산미와 떫은맛에 적당한 당분을 추가한 제품입니다.</p><p>진한 루비 색상과 타르트한 풍미가 칵테일에 깊이를 더해줍니다.</p>",
        shelfLifeDays: 21,
        storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
        whenToUseNotes: "<p>보드카 베이스 칵테일의 필수 재료입니다.</p><p>강한 산미가 알코올의 무게감을 줄여주고 칵테일을 가볍게 만들어줍니다.</p>",
        substituteNotes: "<p>100% 크랜베리 주스를 사용할 경우 당분 추가가 필요합니다.</p><p>석류 주스로 대체 시 비슷한 색감과 산미를 얻을 수 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 22, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=Cosmopolitan" },
          { id: 23, name: "Sea Breeze", nameKr: "씨 브리즈", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Sea+Breeze" },
          { id: 24, name: "Cape Codder", nameKr: "케이프 코더", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Cape+Codder" }
        ]
      },
      {
        juiceId: 3,
        brandId: 9,
        brandName: "Dole",
        brandNameKr: "돌",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Dole Pineapple Juice",
        juiceNameKr: "돌 파인애플 주스",
        sugarLevel: 5,
        acidityLevel: 3,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Pineapple+Juice",
        notes: "<p>100% 파인애플 착즙 주스로 진한 열대 과일 풍미를 제공합니다.</p><p>높은 당도와 적당한 산미, 그리고 트로피컬한 향이 특징입니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>티키 칵테일의 핵심 재료입니다.</p><p>달콤하면서도 상큼한 맛이 럼의 풍미와 완벽하게 조화를 이룹니다.</p>",
        substituteNotes: "<p>생 파인애플 블렌딩이 가장 좋지만 준비가 번거롭습니다.</p><p>Del Monte나 다른 브랜드로 대체 가능하나 당도 차이가 있을 수 있습니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 25, name: "Piña Colada", nameKr: "피나 콜라다", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Pina+Colada" },
          { id: 26, name: "Mai Tai", nameKr: "마이타이", image: "https://via.placeholder.com/80x80/FF8C00/FFFFFF?text=Mai+Tai" },
          { id: 27, name: "Jungle Bird", nameKr: "정글 버드", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Jungle+Bird" }
        ]
      },
      {
        juiceId: 4,
        brandId: 10,
        brandName: "Ceres",
        brandNameKr: "세레스",
        countryId: 4,
        countryName: "South Africa",
        countryNameKr: "남아프리카공화국",
        juiceName: "Ceres Passion Fruit Juice",
        juiceNameKr: "세레스 패션프루트 주스",
        sugarLevel: 4,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Passion+Fruit",
        notes: "<p>농축 패션프루트 과즙으로 만든 진한 열대 과일 주스입니다.</p><p>강렬한 향과 신맛, 그리고 씨앗의 크런치한 식감이 특징입니다.</p>",
        shelfLifeDays: 180,
        storageType: "실온 보관 가능, 개봉 후 냉장 보관하며 7일 이내 소비",
        whenToUseNotes: "<p>트로피컬 칵테일에 강렬한 향과 신맛을 더해줍니다.</p><p>소량만 사용해도 칵테일의 캐릭터를 확실하게 바꿔줍니다.</p>",
        substituteNotes: "<p>생 패션프루트를 으깨서 사용하면 더 신선한 맛을 낼 수 있습니다.</p><p>Rubicon이나 Tamek 브랜드로도 대체 가능합니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 28, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Pornstar" },
          { id: 29, name: "Hurricane", nameKr: "허리케인", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Hurricane" },
          { id: 30, name: "Passion Fruit Caipirinha", nameKr: "패션프루트 카이피리냐", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Caipirinha" }
        ]
      },
      {
        juiceId: 5,
        brandId: 11,
        brandName: "Lakewood Organic",
        brandNameKr: "레이크우드 오가닉",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Lakewood Organic Pure Grapefruit Juice",
        juiceNameKr: "레이크우드 오가닉 퓨어 자몽 주스",
        sugarLevel: 2,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/FFB6C1/000000?text=Grapefruit+Juice",
        notes: "<p>유기농 자몽으로 만든 100% 착즙 주스입니다.</p><p>강한 쓴맛과 산미, 그리고 시트러스 향이 특징이며 당분이 거의 없습니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>클래식 칵테일에 깊이와 복잡함을 더해주는 주스입니다.</p><p>강한 쓴맛이 스피릿의 풍미를 더욱 강조해줍니다.</p>",
        substituteNotes: "<p>Ocean Spray Ruby Red Grapefruit Juice는 더 달지만 대중적입니다.</p><p>생 자몽 직접 착즙이 가장 이상적입니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 31, name: "Paloma", nameKr: "팔로마", image: "https://via.placeholder.com/80x80/FFC0CB/000000?text=Paloma" },
          { id: 32, name: "Greyhound", nameKr: "그레이하운드", image: "https://via.placeholder.com/80x80/FFB6C1/000000?text=Greyhound" },
          { id: 33, name: "Salty Dog", nameKr: "솔티 독", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Salty+Dog" }
        ]
      },
      {
        juiceId: 6,
        brandId: 12,
        brandName: "Pressed Juicery",
        brandNameKr: "프레스드 주서리",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Pressed Juicery Cold-Pressed Lime Juice",
        juiceNameKr: "프레스드 주서리 콜드 프레스 라임 주스",
        sugarLevel: 1,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=Lime+Juice",
        notes: "<p>저온 압착 방식으로 만든 100% 라임 주스입니다.</p><p>신선한 라임의 강렬한 산미와 향이 그대로 살아있으며, 당분이 전혀 없습니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관 필수, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>거의 모든 칵테일에 필수적인 재료입니다.</p><p>생 라임 착즙에 가장 가까운 제품으로, 바에서 빠르게 사용하기 좋습니다.</p>",
        substituteNotes: "<p>생 라임 직접 착즙이 항상 최선이지만 시간이 많이 걸립니다.</p><p>병입 라임 주스는 보존제가 있어 맛이 달라질 수 있습니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 34, name: "Margarita", nameKr: "마르가리타", image: "https://via.placeholder.com/80x80/7FFF00/000000?text=Margarita" },
          { id: 35, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Daiquiri" },
          { id: 36, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.juiceName.localeCompare(b.juiceName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(juice =>
          juice.juiceName.toLowerCase().includes(search.toLowerCase()) ||
          juice.juiceNameKr.includes(search) ||
          juice.brandName.toLowerCase().includes(search.toLowerCase()) ||
          (juice.brandNameKr && juice.brandNameKr.includes(search))
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 주스 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/juice\/\d+/).reply((config) => {
    const juiceId = parseInt(config.url?.split('/').pop() || '1');

    // 주스 데이터 맵
    const juiceDataMap: { [key: number]: any } = {
      1: {
        juiceId: 1,
        brandId: 7,
        brandName: "Tropicana",
        brandNameKr: "트로피카나",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Tropicana Pure Premium Orange Juice",
        juiceNameKr: "트로피카나 퓨어 프리미엄 오렌지 주스",
        sugarLevel: 4,
        acidityLevel: 3,
        image: "https://via.placeholder.com/200x200/FFA500/FFFFFF?text=Orange+Juice",
        notes: "<p>100% 착즙 오렌지 주스로 농축 환원 과정 없이 신선함을 유지합니다.</p><p>자연스러운 단맛과 상큼한 산미가 균형을 이루며, 과육이 살아있습니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>칵테일에 가장 많이 사용되는 기본 주스입니다.</p><p>신선한 오렌지 향이 스피릿의 알코올감을 부드럽게 만들어줍니다.</p>",
        substituteNotes: "<p>Minute Maid나 Simply Orange로 대체 가능합니다.</p><p>생과일 직접 착즙이 가장 이상적이지만 편의성이 떨어집니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 19, name: "Screwdriver", nameKr: "스크루드라이버", image: "https://via.placeholder.com/80x80/FFA500/FFFFFF?text=Screwdriver" },
          { id: 20, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" },
          { id: 21, name: "Mimosa", nameKr: "미모사", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Mimosa" }
        ]
      },
      2: {
        juiceId: 2,
        brandId: 8,
        brandName: "Ocean Spray",
        brandNameKr: "오션 스프레이",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Ocean Spray Cranberry Juice Cocktail",
        juiceNameKr: "오션 스프레이 크랜베리 주스 칵테일",
        sugarLevel: 4,
        acidityLevel: 4,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Cranberry+Juice",
        notes: "<p>크랜베리 특유의 강한 산미와 떫은맛에 적당한 당분을 추가한 제품입니다.</p><p>진한 루비 색상과 타르트한 풍미가 칵테일에 깊이를 더해줍니다.</p>",
        shelfLifeDays: 21,
        storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
        whenToUseNotes: "<p>보드카 베이스 칵테일의 필수 재료입니다.</p><p>강한 산미가 알코올의 무게감을 줄여주고 칵테일을 가볍게 만들어줍니다.</p>",
        substituteNotes: "<p>100% 크랜베리 주스를 사용할 경우 당분 추가가 필요합니다.</p><p>석류 주스로 대체 시 비슷한 색감과 산미를 얻을 수 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 22, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=Cosmopolitan" },
          { id: 23, name: "Sea Breeze", nameKr: "씨 브리즈", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Sea+Breeze" },
          { id: 24, name: "Cape Codder", nameKr: "케이프 코더", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Cape+Codder" }
        ]
      },
      3: {
        juiceId: 3,
        brandId: 9,
        brandName: "Dole",
        brandNameKr: "돌",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Dole Pineapple Juice",
        juiceNameKr: "돌 파인애플 주스",
        sugarLevel: 5,
        acidityLevel: 3,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Pineapple+Juice",
        notes: "<p>100% 파인애플 착즙 주스로 진한 열대 과일 풍미를 제공합니다.</p><p>높은 당도와 적당한 산미, 그리고 트로피컬한 향이 특징입니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>티키 칵테일의 핵심 재료입니다.</p><p>달콤하면서도 상큼한 맛이 럼의 풍미와 완벽하게 조화를 이룹니다.</p>",
        substituteNotes: "<p>생 파인애플 블렌딩이 가장 좋지만 준비가 번거롭습니다.</p><p>Del Monte나 다른 브랜드로 대체 가능하나 당도 차이가 있을 수 있습니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 25, name: "Piña Colada", nameKr: "피나 콜라다", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Pina+Colada" },
          { id: 26, name: "Mai Tai", nameKr: "마이타이", image: "https://via.placeholder.com/80x80/FF8C00/FFFFFF?text=Mai+Tai" },
          { id: 27, name: "Jungle Bird", nameKr: "정글 버드", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Jungle+Bird" }
        ]
      },
      4: {
        juiceId: 4,
        brandId: 10,
        brandName: "Ceres",
        brandNameKr: "세레스",
        countryId: 4,
        countryName: "South Africa",
        countryNameKr: "남아프리카공화국",
        juiceName: "Ceres Passion Fruit Juice",
        juiceNameKr: "세레스 패션프루트 주스",
        sugarLevel: 4,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Passion+Fruit",
        notes: "<p>농축 패션프루트 과즙으로 만든 진한 열대 과일 주스입니다.</p><p>강렬한 향과 신맛, 그리고 씨앗의 크런치한 식감이 특징입니다.</p>",
        shelfLifeDays: 180,
        storageType: "실온 보관 가능, 개봉 후 냉장 보관하며 7일 이내 소비",
        whenToUseNotes: "<p>트로피컬 칵테일에 강렬한 향과 신맛을 더해줍니다.</p><p>소량만 사용해도 칵테일의 캐릭터를 확실하게 바꿔줍니다.</p>",
        substituteNotes: "<p>생 패션프루트를 으깨서 사용하면 더 신선한 맛을 낼 수 있습니다.</p><p>Rubicon이나 Tamek 브랜드로도 대체 가능합니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 28, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Pornstar" },
          { id: 29, name: "Hurricane", nameKr: "허리케인", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Hurricane" },
          { id: 30, name: "Passion Fruit Caipirinha", nameKr: "패션프루트 카이피리냐", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Caipirinha" }
        ]
      },
      5: {
        juiceId: 5,
        brandId: 11,
        brandName: "Lakewood Organic",
        brandNameKr: "레이크우드 오가닉",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Lakewood Organic Pure Grapefruit Juice",
        juiceNameKr: "레이크우드 오가닉 퓨어 자몽 주스",
        sugarLevel: 2,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/FFB6C1/000000?text=Grapefruit+Juice",
        notes: "<p>유기농 자몽으로 만든 100% 착즙 주스입니다.</p><p>강한 쓴맛과 산미, 그리고 시트러스 향이 특징이며 당분이 거의 없습니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
        whenToUseNotes: "<p>클래식 칵테일에 깊이와 복잡함을 더해주는 주스입니다.</p><p>강한 쓴맛이 스피릿의 풍미를 더욱 강조해줍니다.</p>",
        substituteNotes: "<p>Ocean Spray Ruby Red Grapefruit Juice는 더 달지만 대중적입니다.</p><p>생 자몽 직접 착즙이 가장 이상적입니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 31, name: "Paloma", nameKr: "팔로마", image: "https://via.placeholder.com/80x80/FFC0CB/000000?text=Paloma" },
          { id: 32, name: "Greyhound", nameKr: "그레이하운드", image: "https://via.placeholder.com/80x80/FFB6C1/000000?text=Greyhound" },
          { id: 33, name: "Salty Dog", nameKr: "솔티 독", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Salty+Dog" }
        ]
      },
      6: {
        juiceId: 6,
        brandId: 12,
        brandName: "Pressed Juicery",
        brandNameKr: "프레스드 주서리",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        juiceName: "Pressed Juicery Cold-Pressed Lime Juice",
        juiceNameKr: "프레스드 주서리 콜드 프레스 라임 주스",
        sugarLevel: 1,
        acidityLevel: 5,
        image: "https://via.placeholder.com/200x200/32CD32/FFFFFF?text=Lime+Juice",
        notes: "<p>저온 압착 방식으로 만든 100% 라임 주스입니다.</p><p>신선한 라임의 강렬한 산미와 향이 그대로 살아있으며, 당분이 전혀 없습니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관 필수, 개봉 후 3일 이내 소비",
        whenToUseNotes: "<p>거의 모든 칵테일에 필수적인 재료입니다.</p><p>생 라임 착즙에 가장 가까운 제품으로, 바에서 빠르게 사용하기 좋습니다.</p>",
        substituteNotes: "<p>생 라임 직접 착즙이 항상 최선이지만 시간이 많이 걸립니다.</p><p>병입 라임 주스는 보존제가 있어 맛이 달라질 수 있습니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 34, name: "Margarita", nameKr: "마르가리타", image: "https://via.placeholder.com/80x80/7FFF00/000000?text=Margarita" },
          { id: 35, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Daiquiri" },
          { id: 36, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" }
        ]
      }
    };

    const juiceData = juiceDataMap[juiceId];

    if (!juiceData) {
      return [404, { error: 'Juice not found' }];
    }

    return [200, { data: juiceData }];
  });

  /*
 * 시럽 Syrup List
 * */
  mock.onGet('/api/syrup').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
      {
        syrupId: 1,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Grenadine Syrup",
        syrupNameKr: "모닌 그레나딘 시럽",
        sugarLevel: 65.0,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Grenadine",
        notes: "<p>석류를 베이스로 한 진한 붉은색 시럽입니다.</p><p>달콤하고 프루티한 맛과 함께 아름다운 레이어 효과를 만들어냅니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>데킬라 선라이즈의 시그니처 레이어 효과를 만들 때 필수입니다.</p><p>셜리 템플이나 로이 로저스 같은 논알콜 칵테일에도 많이 사용됩니다.</p><p>색감과 단맛을 동시에 제공하여 시각적 효과가 중요한 칵테일에 적합합니다.</p>",
        substituteNotes: "<p>Rose's Grenadine으로 대체 가능하나 인공적인 맛이 강합니다.</p><p>석류 주스에 설탕을 섞어 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 37, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" },
          { id: 38, name: "Shirley Temple", nameKr: "셜리 템플", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Shirley+Temple" },
          { id: 39, name: "Planter's Punch", nameKr: "플랜터스 펀치", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Planters+Punch" }
        ]
      },
      {
        syrupId: 2,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Vanilla Syrup",
        syrupNameKr: "모닌 바닐라 시럽",
        sugarLevel: 1,
        image: "https://via.placeholder.com/200x200/F5DEB3/000000?text=Vanilla",
        notes: "<p>마다가스카르 바닐라 빈 추출물로 만든 프리미엄 바닐라 시럽입니다.</p><p>부드럽고 크리미한 바닐라 향과 적당한 단맛이 특징입니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>에스프레소 마티니에 깊이와 부드러움을 더합니다.</p><p>프렌치 마티니나 알렉산더 같은 크리미한 칵테일과 잘 어울립니다.</p><p>바닐라 향이 위스키나 럼의 오크 풍미를 더욱 강조해줍니다.</p>",
        substituteNotes: "<p>Torani Vanilla나 DaVinci Vanilla로 대체 가능합니다.</p><p>바닐라 익스트랙과 심플 시럽을 섞어 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 40, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Espresso" },
          { id: 41, name: "French Martini", nameKr: "프렌치 마티니", image: "https://via.placeholder.com/80x80/8B008B/FFFFFF?text=French+Martini" },
          { id: 42, name: "Vanilla Old Fashioned", nameKr: "바닐라 올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Vanilla+OF" }
        ]
      },
      {
        syrupId: 3,
        brandId: 14,
        brandName: "Giffard",
        brandNameKr: "지파드",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Giffard Orgeat Syrup",
        syrupNameKr: "지파드 오르지아 시럽",
        sugarLevel: 2,
        image: "https://via.placeholder.com/200x200/FAEBD7/000000?text=Orgeat",
        notes: "<p>아몬드와 오렌지 블로썸 워터로 만든 프랑스 전통 시럽입니다.</p><p>고소하고 달콤한 아몬드 향과 은은한 플로럴 노트가 특징입니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "개봉 전 실온 보관, 개봉 후 냉장 보관 필수",
        whenToUseNotes: "<p>마이타이의 필수 재료로 럼의 풍미를 더욱 풍부하게 만듭니다.</p><p>티키 칵테일에서 고소하고 부드러운 질감을 제공합니다.</p><p>일본식 위스키 칵테일에서도 자주 사용되어 복잡한 풍미를 더합니다.</p>",
        substituteNotes: "<p>Monin Orgeat나 Small Hand Foods Orgeat로 대체 가능합니다.</p><p>아몬드 밀크에 설탕과 오렌지 블로썸 워터를 섞어 직접 만들 수 있습니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 43, name: "Mai Tai", nameKr: "마이타이", image: "https://via.placeholder.com/80x80/FF8C00/FFFFFF?text=Mai+Tai" },
          { id: 44, name: "Japanese Cocktail", nameKr: "재패니즈 칵테일", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Japanese" },
          { id: 45, name: "Fog Cutter", nameKr: "포그 커터", image: "https://via.placeholder.com/80x80/FFA07A/000000?text=Fog+Cutter" }
        ]
      },
      {
        syrupId: 4,
        brandId: 15,
        brandName: "BG Reynolds",
        brandNameKr: "비지 레이놀즈",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        syrupName: "BG Reynolds Passion Fruit Syrup",
        syrupNameKr: "비지 레이놀즈 패션프루트 시럽",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Passion+Fruit",
        notes: "<p>천연 패션프루트로 만든 진한 열대 과일 시럽입니다.</p><p>강렬한 패션프루트 향과 적당한 산미, 농축된 단맛이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "개봉 후 냉장 보관 필수, 3개월 이내 소비 권장",
        whenToUseNotes: "<p>허리케인에서 열대 과일의 복잡한 풍미를 더합니다.</p><p>패션프루트 마티니나 트로피컬 칵테일의 핵심 재료입니다.</p><p>주스보다 농축되어 있어 소량으로도 강한 풍미를 낼 수 있습니다.</p>",
        substituteNotes: "<p>패션프루트 퓨레에 설탕을 섞어 직접 만들 수 있습니다.</p><p>Monin Passion Fruit로 대체 가능하나 덜 진합니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 46, name: "Hurricane", nameKr: "허리케인", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Hurricane" },
          { id: 47, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Pornstar" },
          { id: 48, name: "Zombie", nameKr: "좀비", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Zombie" }
        ]
      },
      {
        syrupId: 5,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Honey Syrup",
        syrupNameKr: "모닌 허니 시럽",
        sugarLevel: 4,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Honey",
        notes: "<p>천연 꿀을 베이스로 만든 시럽으로 물에 잘 녹도록 조정되었습니다.</p><p>은은한 꽃향기와 부드러운 단맛, 그리고 독특한 깊이가 특징입니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 결정화 방지를 위해 서늘한 곳에 보관",
        whenToUseNotes: "<p>비즈니즈에서 위스키의 스파이시함과 레몬의 산미를 부드럽게 연결합니다.</p><p>페니실린이나 골드 러시 같은 현대 클래식 칵테일의 핵심입니다.</p><p>일반 설탕보다 복잡한 풍미를 제공하여 칵테일에 깊이를 더합니다.</p>",
        substituteNotes: "<p>생꿀을 따뜻한 물과 1:1로 섞어 직접 만들 수 있습니다.</p><p>아카시아 꿀이나 클로버 꿀이 가장 중성적인 맛을 냅니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 49, name: "Bees Knees", nameKr: "비즈 니즈", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Bees+Knees" },
          { id: 50, name: "Penicillin", nameKr: "페니실린", image: "https://via.placeholder.com/80x80/F4A460/000000?text=Penicillin" },
          { id: 51, name: "Gold Rush", nameKr: "골드 러시", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Gold+Rush" }
        ]
      },
      {
        syrupId: 6,
        brandId: 16,
        brandName: "Finest Call",
        brandNameKr: "파이니스트 콜",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        syrupName: "Finest Call Simple Syrup",
        syrupNameKr: "파이니스트 콜 심플 시럽",
        sugarLevel: 5,
        image: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Simple+Syrup",
        notes: "<p>순수 설탕과 물을 1:1 비율로 만든 가장 기본적인 시럽입니다.</p><p>중성적인 단맛만을 제공하며 칵테일의 다른 풍미를 해치지 않습니다.</p>",
        shelfLifeDays: 180, // 약 6개월
        storageType: "냉장 보관 필수, 개봉 후 1개월 이내 소비",
        whenToUseNotes: "<p>거의 모든 클래식 칵테일에 사용되는 기본 재료입니다.</p><p>다이키리, 모히또, 위스키 사워 등 수많은 칵테일의 베이스 단맛을 제공합니다.</p><p>다른 재료의 풍미를 방해하지 않아 가장 많이 사용됩니다.</p>",
        substituteNotes: "<p>설탕과 물을 1:1로 섞어 직접 만들 수 있습니다.</p><p>Rich Simple Syrup(2:1)은 더 진하고 부드러운 질감을 원할 때 사용합니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 52, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Daiquiri" },
          { id: 53, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" },
          { id: 54, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Whiskey+Sour" }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.syrupName.localeCompare(b.syrupName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(syrup =>
          syrup.syrupName.toLowerCase().includes(search.toLowerCase()) ||
          syrup.syrupNameKr.includes(search) ||
          syrup.brandName.toLowerCase().includes(search.toLowerCase()) ||
          (syrup.brandNameKr && syrup.brandNameKr.includes(search))
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 시럽 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/syrup\/\d+/).reply((config) => {
    const syrupId = parseInt(config.url?.split('/').pop() || '1');

    // 시럽 데이터 맵
    const syrupDataMap: { [key: number]: any } = {
      1: {
        syrupId: 1,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Grenadine Syrup",
        syrupNameKr: "모닌 그레나딘 시럽",
        sugarLevel: 1,
        image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Grenadine",
        notes: "<p>석류를 베이스로 한 진한 붉은색 시럽입니다.</p><p>달콤하고 프루티한 맛과 함께 아름다운 레이어 효과를 만들어냅니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>데킬라 선라이즈의 시그니처 레이어 효과를 만들 때 필수입니다.</p><p>셜리 템플이나 로이 로저스 같은 논알콜 칵테일에도 많이 사용됩니다.</p><p>색감과 단맛을 동시에 제공하여 시각적 효과가 중요한 칵테일에 적합합니다.</p>",
        substituteNotes: "<p>Rose's Grenadine으로 대체 가능하나 인공적인 맛이 강합니다.</p><p>석류 주스에 설탕을 섞어 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        availableCocktails: [
          { id: 37, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" },
          { id: 38, name: "Shirley Temple", nameKr: "셜리 템플", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Shirley+Temple" },
          { id: 39, name: "Planter's Punch", nameKr: "플랜터스 펀치", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Planters+Punch" }
        ]
      },
      2: {
        syrupId: 2,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Vanilla Syrup",
        syrupNameKr: "모닌 바닐라 시럽",
        sugarLevel: 2,
        image: "https://via.placeholder.com/200x200/F5DEB3/000000?text=Vanilla",
        notes: "<p>마다가스카르 바닐라 빈 추출물로 만든 프리미엄 바닐라 시럽입니다.</p><p>부드럽고 크리미한 바닐라 향과 적당한 단맛이 특징입니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>에스프레소 마티니에 깊이와 부드러움을 더합니다.</p><p>프렌치 마티니나 알렉산더 같은 크리미한 칵테일과 잘 어울립니다.</p><p>바닐라 향이 위스키나 럼의 오크 풍미를 더욱 강조해줍니다.</p>",
        substituteNotes: "<p>Torani Vanilla나 DaVinci Vanilla로 대체 가능합니다.</p><p>바닐라 익스트랙과 심플 시럽을 섞어 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-01-14",
        updatedAt: "2024-01-19",
        availableCocktails: [
          { id: 40, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Espresso" },
          { id: 41, name: "French Martini", nameKr: "프렌치 마티니", image: "https://via.placeholder.com/80x80/8B008B/FFFFFF?text=French+Martini" },
          { id: 42, name: "Vanilla Old Fashioned", nameKr: "바닐라 올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Vanilla+OF" }
        ]
      },
      3: {
        syrupId: 3,
        brandId: 14,
        brandName: "Giffard",
        brandNameKr: "지파드",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Giffard Orgeat Syrup",
        syrupNameKr: "지파드 오르지아 시럽",
        sugarLevel: 3,
        image: "https://via.placeholder.com/200x200/FAEBD7/000000?text=Orgeat",
        notes: "<p>아몬드와 오렌지 블로썸 워터로 만든 프랑스 전통 시럽입니다.</p><p>고소하고 달콤한 아몬드 향과 은은한 플로럴 노트가 특징입니다.</p>",
        shelfLifeDays: 730, // 약 2년
        storageType: "개봉 전 실온 보관, 개봉 후 냉장 보관 필수",
        whenToUseNotes: "<p>마이타이의 필수 재료로 럼의 풍미를 더욱 풍부하게 만듭니다.</p><p>티키 칵테일에서 고소하고 부드러운 질감을 제공합니다.</p><p>일본식 위스키 칵테일에서도 자주 사용되어 복잡한 풍미를 더합니다.</p>",
        substituteNotes: "<p>Monin Orgeat나 Small Hand Foods Orgeat로 대체 가능합니다.</p><p>아몬드 밀크에 설탕과 오렌지 블로썸 워터를 섞어 직접 만들 수 있습니다.</p>",
        createdAt: "2024-01-13",
        updatedAt: "2024-01-18",
        availableCocktails: [
          { id: 43, name: "Mai Tai", nameKr: "마이타이", image: "https://via.placeholder.com/80x80/FF8C00/FFFFFF?text=Mai+Tai" },
          { id: 44, name: "Japanese Cocktail", nameKr: "재패니즈 칵테일", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Japanese" },
          { id: 45, name: "Fog Cutter", nameKr: "포그 커터", image: "https://via.placeholder.com/80x80/FFA07A/000000?text=Fog+Cutter" }
        ]
      },
      4: {
        syrupId: 4,
        brandId: 15,
        brandName: "BG Reynolds",
        brandNameKr: "비지 레이놀즈",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        syrupName: "BG Reynolds Passion Fruit Syrup",
        syrupNameKr: "비지 레이놀즈 패션프루트 시럽",
        sugarLevel: 4,
        image: "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=Passion+Fruit",
        notes: "<p>천연 패션프루트로 만든 진한 열대 과일 시럽입니다.</p><p>강렬한 패션프루트 향과 적당한 산미, 농축된 단맛이 특징입니다.</p>",
        shelfLifeDays: 365, // 약 1년
        storageType: "개봉 후 냉장 보관 필수, 3개월 이내 소비 권장",
        whenToUseNotes: "<p>허리케인에서 열대 과일의 복잡한 풍미를 더합니다.</p><p>패션프루트 마티니나 트로피컬 칵테일의 핵심 재료입니다.</p><p>주스보다 농축되어 있어 소량으로도 강한 풍미를 낼 수 있습니다.</p>",
        substituteNotes: "<p>패션프루트 퓨레에 설탕을 섞어 직접 만들 수 있습니다.</p><p>Monin Passion Fruit로 대체 가능하나 덜 진합니다.</p>",
        createdAt: "2024-01-12",
        updatedAt: "2024-01-17",
        availableCocktails: [
          { id: 46, name: "Hurricane", nameKr: "허리케인", image: "https://via.placeholder.com/80x80/FF4500/FFFFFF?text=Hurricane" },
          { id: 47, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Pornstar" },
          { id: 48, name: "Zombie", nameKr: "좀비", image: "https://via.placeholder.com/80x80/8B0000/FFFFFF?text=Zombie" }
        ]
      },
      5: {
        syrupId: 5,
        brandId: 13,
        brandName: "Monin",
        brandNameKr: "모닌",
        countryId: 5,
        countryName: "France",
        countryNameKr: "프랑스",
        syrupName: "Monin Honey Syrup",
        syrupNameKr: "모닌 허니 시럽",
        sugarLevel: 5,
        image: "https://via.placeholder.com/200x200/FFD700/000000?text=Honey",
        notes: "<p>천연 꿀을 베이스로 만든 시럽으로 물에 잘 녹도록 조정되었습니다.</p><p>은은한 꽃향기와 부드러운 단맛, 그리고 독특한 깊이가 특징입니다.</p>",
        shelfLifeDays: 1095, // 약 3년
        storageType: "실온 보관 가능, 결정화 방지를 위해 서늘한 곳에 보관",
        whenToUseNotes: "<p>비즈니즈에서 위스키의 스파이시함과 레몬의 산미를 부드럽게 연결합니다.</p><p>페니실린이나 골드 러시 같은 현대 클래식 칵테일의 핵심입니다.</p><p>일반 설탕보다 복잡한 풍미를 제공하여 칵테일에 깊이를 더합니다.</p>",
        substituteNotes: "<p>생꿀을 따뜻한 물과 1:1로 섞어 직접 만들 수 있습니다.</p><p>아카시아 꿀이나 클로버 꿀이 가장 중성적인 맛을 냅니다.</p>",
        createdAt: "2024-01-11",
        updatedAt: "2024-01-16",
        availableCocktails: [
          { id: 49, name: "Bees Knees", nameKr: "비즈 니즈", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Bees+Knees" },
          { id: 50, name: "Penicillin", nameKr: "페니실린", image: "https://via.placeholder.com/80x80/F4A460/000000?text=Penicillin" },
          { id: 51, name: "Gold Rush", nameKr: "골드 러시", image: "https://via.placeholder.com/80x80/DAA520/000000?text=Gold+Rush" }
        ]
      },
      6: {
        syrupId: 6,
        brandId: 16,
        brandName: "Finest Call",
        brandNameKr: "파이니스트 콜",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        syrupName: "Finest Call Simple Syrup",
        syrupNameKr: "파이니스트 콜 심플 시럽",
        sugarLevel: 5,
        image: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Simple+Syrup",
        notes: "<p>순수 설탕과 물을 1:1 비율로 만든 가장 기본적인 시럽입니다.</p><p>중성적인 단맛만을 제공하며 칵테일의 다른 풍미를 해치지 않습니다.</p>",
        shelfLifeDays: 180, // 약 6개월
        storageType: "냉장 보관 필수, 개봉 후 1개월 이내 소비",
        whenToUseNotes: "<p>거의 모든 클래식 칵테일에 사용되는 기본 재료입니다.</p><p>다이키리, 모히또, 위스키 사워 등 수많은 칵테일의 베이스 단맛을 제공합니다.</p><p>다른 재료의 풍미를 방해하지 않아 가장 많이 사용됩니다.</p>",
        substituteNotes: "<p>설탕과 물을 1:1로 섞어 직접 만들 수 있습니다.</p><p>Rich Simple Syrup(2:1)은 더 진하고 부드러운 질감을 원할 때 사용합니다.</p>",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-15",
        availableCocktails: [
          { id: 52, name: "Daiquiri", nameKr: "다이키리", image: "https://via.placeholder.com/80x80/ADFF2F/000000?text=Daiquiri" },
          { id: 53, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" },
          { id: 54, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Whiskey+Sour" }
        ]
      }
    };

    const syrupData = syrupDataMap[syrupId];

    if (!syrupData) {
      return [404, { error: 'Syrup not found' }];
    }

    return [200, { data: syrupData }];
  });

  /*
   * 가니쉬 Garnishes List
   * */
  mock.onGet('/api/garnishes').reply((config) => {
    const { page = 1, limit = 6, sort = 'recent', search } = config.params || {};

    // 전체 Mock 데이터 (6개)
    const fullData = [
      {
        garnishId: 1,
        brandId: 17,
        brandName: "Fresh Produce",
        brandNameKr: "신선 농산물",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        garnishName: "Mint Leaves",
        garnishNameKr: "민트 잎",
        primaryFunction: "all",
        image: "https://via.placeholder.com/200x200/90EE90/000000?text=Mint",
        notes: "<p>가장 널리 사용되는 칵테일 가니쉬 중 하나입니다.</p><p>상쾌한 향과 초록빛 비주얼이 특징이며, 모히또와 민트 줄렙의 핵심 재료입니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관, 젖은 키친타월로 감싸 보관하면 더 오래 신선함 유지",
        whenToUseNotes: "<p>모히또에서 머들링하여 향을 내고 장식으로도 사용합니다.</p><p>민트 줄렙에서 얼음과 함께 으깨어 상쾌한 향을 극대화합니다.</p><p>위스키 스매시나 사우스사이드 같은 칵테일에서 장식과 향을 동시에 제공합니다.</p>",
        substituteNotes: "<p>페퍼민트나 스피어민트 모두 사용 가능하며, 각각 다른 향의 강도를 제공합니다.</p><p>신선한 바질로 대체하면 색다른 허브 풍미를 낼 수 있습니다.</p>",
        createdAt: "2024-02-15",
        updatedAt: "2024-02-20",
        availableCocktails: [
          { id: 1, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" },
          { id: 55, name: "Mint Julep", nameKr: "민트 줄렙", image: "https://via.placeholder.com/80x80/90EE90/000000?text=Mint+Julep" },
          { id: 56, name: "Southside", nameKr: "사우스사이드", image: "https://via.placeholder.com/80x80/7FFF00/000000?text=Southside" }
        ]
      },
      {
        garnishId: 2,
        brandId: 18,
        brandName: "Citrus Fresh",
        brandNameKr: "시트러스 프레시",
        countryId: 3,
        countryName: "Mexico",
        countryNameKr: "멕시코",
        garnishName: "Lime Wheel",
        garnishNameKr: "라임 휠",
        primaryFunction: "visual",
        image: "https://via.placeholder.com/200x200/32CD32/000000?text=Lime",
        notes: "<p>라임을 얇게 슬라이스한 가니쉬로 시각적 효과가 뛰어납니다.</p><p>산뜻한 시트러스 향과 함께 칵테일에 신선함을 더해줍니다.</p>",
        shelfLifeDays: 3,
        storageType: "냉장 보관, 밀폐 용기에 보관하면 건조 방지",
        whenToUseNotes: "<p>마가리타 글라스 가장자리에 걸쳐 시각적 포인트를 줍니다.</p><p>모스코 뮬이나 다크 앤 스토미에서 구리 머그와 대비되는 색감을 제공합니다.</p><p>진 앤 토닉에 라임 웨지 대신 사용하면 더 세련된 느낌을 연출할 수 있습니다.</p>",
        substituteNotes: "<p>레몬 휠로 대체 가능하지만 향과 색감이 달라집니다.</p><p>라임 웨지(조각)로 대체하면 더 많은 주스를 짜낼 수 있습니다.</p>",
        createdAt: "2024-02-14",
        updatedAt: "2024-02-19",
        availableCocktails: [
          { id: 2, name: "Margarita", nameKr: "마가리타", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Margarita" },
          { id: 57, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Moscow+Mule" },
          { id: 58, name: "Gin and Tonic", nameKr: "진 앤 토닉", image: "https://via.placeholder.com/80x80/E0FFFF/000000?text=GT" }
        ]
      },
      {
        garnishId: 3,
        brandId: 19,
        brandName: "Luxardo",
        brandNameKr: "룩사르도",
        countryId: 6,
        countryName: "Italy",
        countryNameKr: "이탈리아",
        garnishName: "Luxardo Maraschino Cherry",
        garnishNameKr: "룩사르도 마라스키노 체리",
        primaryFunction: "flavor",
        image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Cherry",
        notes: "<p>프리미엄 마라스카 체리를 마라스키노 시럽에 절인 최고급 가니쉬입니다.</p><p>인공 착색료가 없는 자연스러운 진한 붉은색과 복잡한 체리 풍미가 특징입니다.</p>",
        shelfLifeDays: 1095,
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>올드 패션드나 맨해튼 같은 클래식 칵테일의 마무리에 필수입니다.</p><p>위스키 사워에서 시각적 포인트와 달콤한 풍미를 더합니다.</p><p>일반 체리와 달리 칵테일의 풍미를 해치지 않고 오히려 깊이를 더해줍니다.</p>",
        substituteNotes: "<p>일반 마라스키노 체리로 대체 가능하나 인공적인 맛이 강합니다.</p><p>신선한 체리를 설탕 시럽에 절여 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-02-13",
        updatedAt: "2024-02-18",
        availableCocktails: [
          { id: 3, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 59, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Manhattan" },
          { id: 54, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Whiskey+Sour" }
        ]
      },
      {
        garnishId: 4,
        brandId: 18,
        brandName: "Citrus Fresh",
        brandNameKr: "시트러스 프레시",
        countryId: 4,
        countryName: "Spain",
        countryNameKr: "스페인",
        garnishName: "Orange Peel",
        garnishNameKr: "오렌지 필",
        primaryFunction: "aroma",
        image: "https://via.placeholder.com/200x200/FFA500/000000?text=Orange",
        notes: "<p>오렌지 껍질을 길게 벗긴 가니쉬로 향이 가장 중요한 역할을 합니다.</p><p>껍질의 오일을 불 위에서 짜내면 시각적 효과와 함께 강렬한 시트러스 향이 칵테일 표면을 감쌉니다.</p>",
        shelfLifeDays: 5,
        storageType: "냉장 보관, 밀폐 용기에 보관하여 수분 증발 방지",
        whenToUseNotes: "<p>올드 패션드에서 불꽃 쇼와 함께 오렌지 오일을 칵테일 위로 뿌립니다.</p><p>네그로니에서 쓴맛을 부드럽게 하고 시트러스 향을 더합니다.</p><p>사제락에서 압생트와 어우러지는 오렌지 향을 제공합니다.</p>",
        substituteNotes: "<p>레몬 필로 대체하면 더 밝고 상큼한 향을 낼 수 있습니다.</p><p>자몽 필은 더 쓴맛과 함께 복잡한 풍미를 제공합니다.</p>",
        createdAt: "2024-02-12",
        updatedAt: "2024-02-17",
        availableCocktails: [
          { id: 3, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 60, name: "Negroni", nameKr: "네그로니", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Negroni" },
          { id: 61, name: "Sazerac", nameKr: "사제락", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Sazerac" }
        ]
      },
      {
        garnishId: 5,
        brandId: 20,
        brandName: "Gourmet Garnish",
        brandNameKr: "고메 가니쉬",
        countryId: 7,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        garnishName: "Cocktail Olive",
        garnishNameKr: "칵테일 올리브",
        primaryFunction: "flavor",
        image: "https://via.placeholder.com/200x200/808000/FFFFFF?text=Olive",
        notes: "<p>마티니의 전통적인 가니쉬로 짭짤한 풍미를 더합니다.</p><p>스터프드 올리브(피망이나 블루치즈가 들어간)는 추가적인 풍미 레이어를 제공합니다.</p>",
        shelfLifeDays: 365,
        storageType: "브라인(소금물)에 담가 냉장 보관",
        whenToUseNotes: "<p>드라이 마티니에서 진의 보타니컬과 어우러지는 짭짤함을 제공합니다.</p><p>더티 마티니에서 올리브 브라인과 함께 풍미를 강화합니다.</p><p>깁슨 칵테일에서는 올리브 대신 칵테일 어니언을 사용합니다.</p>",
        substituteNotes: "<p>칵테일 어니언(실버스킨 어니언)으로 대체하면 깁슨이 됩니다.</p><p>레몬 트위스트로 대체하면 더 가볍고 상쾌한 느낌이 됩니다.</p>",
        createdAt: "2024-02-11",
        updatedAt: "2024-02-16",
        availableCocktails: [
          { id: 62, name: "Dry Martini", nameKr: "드라이 마티니", image: "https://via.placeholder.com/80x80/F0F0F0/000000?text=Martini" },
          { id: 63, name: "Dirty Martini", nameKr: "더티 마티니", image: "https://via.placeholder.com/80x80/D3D3D3/000000?text=Dirty" },
          { id: 64, name: "Gibson", nameKr: "깁슨", image: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Gibson" }
        ]
      },
      {
        garnishId: 6,
        brandId: 21,
        brandName: "Celery Farm",
        brandNameKr: "셀러리 팜",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        garnishName: "Celery Stalk",
        garnishNameKr: "셀러리 줄기",
        primaryFunction: "visual",
        image: "https://via.placeholder.com/200x200/228B22/FFFFFF?text=Celery",
        notes: "<p>블러디 메리의 시그니처 가니쉬이자 스터러로 사용됩니다.</p><p>시각적으로 눈에 띄며, 칵테일을 마시는 동안 아삭한 식감을 즐길 수 있습니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관, 물에 담가 두면 더 오래 신선함 유지",
        whenToUseNotes: "<p>블러디 메리에서 토마토 주스와 함께 채소의 신선함을 강조합니다.</p><p>칵테일을 저으면서 셀러리 향이 은은하게 배어나옵니다.</p><p>시각적으로 강한 인상을 주어 브런치 칵테일의 완성도를 높입니다.</p>",
        substituteNotes: "<p>오이 스틱으로 대체하면 더 가볍고 상큼한 느낌을 줍니다.</p><p>아스파라거스로 대체하면 색다른 비주얼과 풍미를 낼 수 있습니다.</p>",
        createdAt: "2024-02-10",
        updatedAt: "2024-02-15",
        availableCocktails: [
          { id: 65, name: "Bloody Mary", nameKr: "블러디 메리", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Bloody+Mary" },
          { id: 66, name: "Bloody Caesar", nameKr: "블러디 시저", image: "https://via.placeholder.com/80x80/B22222/FFFFFF?text=Caesar" },
          { id: 67, name: "Red Snapper", nameKr: "레드 스내퍼", image: "https://via.placeholder.com/80x80/CD5C5C/FFFFFF?text=Red+Snapper" }
        ]
      }
    ];

    // 정렬 처리
    let sortedData = [...fullData];

    if (sort === 'name') {
      sortedData.sort((a, b) => a.garnishName.localeCompare(b.garnishName));
    }
    // recent는 기본 순서 유지

    // 검색 처리
    if (search) {
      sortedData = sortedData.filter(garnish =>
          garnish.garnishName.toLowerCase().includes(search.toLowerCase()) ||
          garnish.garnishNameKr.includes(search) ||
          garnish.brandName.toLowerCase().includes(search.toLowerCase()) ||
          (garnish.brandNameKr && garnish.brandNameKr.includes(search))
      );
    }

    // 페이지네이션 처리
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return [200, { data: paginatedData }];
  });

  /*
   * 가니쉬 Detail (개별 조회)
   * */
  mock.onGet(/\/api\/garnishes\/\d+/).reply((config) => {
    const garnishId = parseInt(config.url?.split('/').pop() || '1');

    // 가니쉬 데이터 맵
    const garnishDataMap: { [key: number]: any } = {
      1: {
        garnishId: 1,
        brandId: 17,
        brandName: "Fresh Produce",
        brandNameKr: "신선 농산물",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        garnishName: "Mint Leaves",
        garnishNameKr: "민트 잎",
        primaryFunction: "all",
        image: "https://via.placeholder.com/200x200/90EE90/000000?text=Mint",
        notes: "<p>가장 널리 사용되는 칵테일 가니쉬 중 하나입니다.</p><p>상쾌한 향과 초록빛 비주얼이 특징이며, 모히또와 민트 줄렙의 핵심 재료입니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관, 젖은 키친타월로 감싸 보관하면 더 오래 신선함 유지",
        whenToUseNotes: "<p>모히또에서 머들링하여 향을 내고 장식으로도 사용합니다.</p><p>민트 줄렙에서 얼음과 함께 으깨어 상쾌한 향을 극대화합니다.</p><p>위스키 스매시나 사우스사이드 같은 칵테일에서 장식과 향을 동시에 제공합니다.</p>",
        substituteNotes: "<p>페퍼민트나 스피어민트 모두 사용 가능하며, 각각 다른 향의 강도를 제공합니다.</p><p>신선한 바질로 대체하면 색다른 허브 풍미를 낼 수 있습니다.</p>",
        createdAt: "2024-02-15",
        updatedAt: "2024-02-20",
        availableCocktails: [
          { id: 1, name: "Mojito", nameKr: "모히또", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Mojito" },
          { id: 55, name: "Mint Julep", nameKr: "민트 줄렙", image: "https://via.placeholder.com/80x80/90EE90/000000?text=Mint+Julep" },
          { id: 56, name: "Southside", nameKr: "사우스사이드", image: "https://via.placeholder.com/80x80/7FFF00/000000?text=Southside" }
        ]
      },
      2: {
        garnishId: 2,
        brandId: 18,
        brandName: "Citrus Fresh",
        brandNameKr: "시트러스 프레시",
        countryId: 3,
        countryName: "Mexico",
        countryNameKr: "멕시코",
        garnishName: "Lime Wheel",
        garnishNameKr: "라임 휠",
        primaryFunction: "visual",
        image: "https://via.placeholder.com/200x200/32CD32/000000?text=Lime",
        notes: "<p>라임을 얇게 슬라이스한 가니쉬로 시각적 효과가 뛰어납니다.</p><p>산뜻한 시트러스 향과 함께 칵테일에 신선함을 더해줍니다.</p>",
        shelfLifeDays: 3,
        storageType: "냉장 보관, 밀폐 용기에 보관하면 건조 방지",
        whenToUseNotes: "<p>마가리타 글라스 가장자리에 걸쳐 시각적 포인트를 줍니다.</p><p>모스코 뮬이나 다크 앤 스토미에서 구리 머그와 대비되는 색감을 제공합니다.</p><p>진 앤 토닉에 라임 웨지 대신 사용하면 더 세련된 느낌을 연출할 수 있습니다.</p>",
        substituteNotes: "<p>레몬 휠로 대체 가능하지만 향과 색감이 달라집니다.</p><p>라임 웨지(조각)로 대체하면 더 많은 주스를 짜낼 수 있습니다.</p>",
        createdAt: "2024-02-14",
        updatedAt: "2024-02-19",
        availableCocktails: [
          { id: 2, name: "Margarita", nameKr: "마가리타", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Margarita" },
          { id: 57, name: "Moscow Mule", nameKr: "모스코 뮬", image: "https://via.placeholder.com/80x80/CD853F/FFFFFF?text=Moscow+Mule" },
          { id: 58, name: "Gin and Tonic", nameKr: "진 앤 토닉", image: "https://via.placeholder.com/80x80/E0FFFF/000000?text=GT" }
        ]
      },
      3: {
        garnishId: 3,
        brandId: 19,
        brandName: "Luxardo",
        brandNameKr: "룩사르도",
        countryId: 6,
        countryName: "Italy",
        countryNameKr: "이탈리아",
        garnishName: "Luxardo Maraschino Cherry",
        garnishNameKr: "룩사르도 마라스키노 체리",
        primaryFunction: "flavor",
        image: "https://via.placeholder.com/200x200/8B0000/FFFFFF?text=Cherry",
        notes: "<p>프리미엄 마라스카 체리를 마라스키노 시럽에 절인 최고급 가니쉬입니다.</p><p>인공 착색료가 없는 자연스러운 진한 붉은색과 복잡한 체리 풍미가 특징입니다.</p>",
        shelfLifeDays: 1095,
        storageType: "실온 보관 가능, 개봉 후 냉장 보관 권장",
        whenToUseNotes: "<p>올드 패션드나 맨해튼 같은 클래식 칵테일의 마무리에 필수입니다.</p><p>위스키 사워에서 시각적 포인트와 달콤한 풍미를 더합니다.</p><p>일반 체리와 달리 칵테일의 풍미를 해치지 않고 오히려 깊이를 더해줍니다.</p>",
        substituteNotes: "<p>일반 마라스키노 체리로 대체 가능하나 인공적인 맛이 강합니다.</p><p>신선한 체리를 설탕 시럽에 절여 직접 만들 수도 있습니다.</p>",
        createdAt: "2024-02-13",
        updatedAt: "2024-02-18",
        availableCocktails: [
          { id: 3, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 59, name: "Manhattan", nameKr: "맨해튼", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Manhattan" },
          { id: 54, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Whiskey+Sour" }
        ]
      },
      4: {
        garnishId: 4,
        brandId: 18,
        brandName: "Citrus Fresh",
        brandNameKr: "시트러스 프레시",
        countryId: 4,
        countryName: "Spain",
        countryNameKr: "스페인",
        garnishName: "Orange Peel",
        garnishNameKr: "오렌지 필",
        primaryFunction: "aroma",
        image: "https://via.placeholder.com/200x200/FFA500/000000?text=Orange",
        notes: "<p>오렌지 껍질을 길게 벗긴 가니쉬로 향이 가장 중요한 역할을 합니다.</p><p>껍질의 오일을 불 위에서 짜내면 시각적 효과와 함께 강렬한 시트러스 향이 칵테일 표면을 감쌉니다.</p>",
        shelfLifeDays: 5,
        storageType: "냉장 보관, 밀폐 용기에 보관하여 수분 증발 방지",
        whenToUseNotes: "<p>올드 패션드에서 불꽃 쇼와 함께 오렌지 오일을 칵테일 위로 뿌립니다.</p><p>네그로니에서 쓴맛을 부드럽게 하고 시트러스 향을 더합니다.</p><p>사제락에서 압생트와 어우러지는 오렌지 향을 제공합니다.</p>",
        substituteNotes: "<p>레몬 필로 대체하면 더 밝고 상큼한 향을 낼 수 있습니다.</p><p>자몽 필은 더 쓴맛과 함께 복잡한 풍미를 제공합니다.</p>",
        createdAt: "2024-02-12",
        updatedAt: "2024-02-17",
        availableCocktails: [
          { id: 3, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Old+Fashioned" },
          { id: 60, name: "Negroni", nameKr: "네그로니", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Negroni" },
          { id: 61, name: "Sazerac", nameKr: "사제락", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Sazerac" }
        ]
      },
      5: {
        garnishId: 5,
        brandId: 20,
        brandName: "Gourmet Garnish",
        brandNameKr: "고메 가니쉬",
        countryId: 7,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        garnishName: "Cocktail Olive",
        garnishNameKr: "칵테일 올리브",
        primaryFunction: "flavor",
        image: "https://via.placeholder.com/200x200/808000/FFFFFF?text=Olive",
        notes: "<p>마티니의 전통적인 가니쉬로 짭짤한 풍미를 더합니다.</p><p>스터프드 올리브(피망이나 블루치즈가 들어간)는 추가적인 풍미 레이어를 제공합니다.</p>",
        shelfLifeDays: 365,
        storageType: "브라인(소금물)에 담가 냉장 보관",
        whenToUseNotes: "<p>드라이 마티니에서 진의 보타니컬과 어우러지는 짭짤함을 제공합니다.</p><p>더티 마티니에서 올리브 브라인과 함께 풍미를 강화합니다.</p><p>깁슨 칵테일에서는 올리브 대신 칵테일 어니언을 사용합니다.</p>",
        substituteNotes: "<p>칵테일 어니언(실버스킨 어니언)으로 대체하면 깁슨이 됩니다.</p><p>레몬 트위스트로 대체하면 더 가볍고 상쾌한 느낌이 됩니다.</p>",
        createdAt: "2024-02-11",
        updatedAt: "2024-02-16",
        availableCocktails: [
          { id: 62, name: "Dry Martini", nameKr: "드라이 마티니", image: "https://via.placeholder.com/80x80/F0F0F0/000000?text=Martini" },
          { id: 63, name: "Dirty Martini", nameKr: "더티 마티니", image: "https://via.placeholder.com/80x80/D3D3D3/000000?text=Dirty" },
          { id: 64, name: "Gibson", nameKr: "깁슨", image: "https://via.placeholder.com/80x80/E0E0E0/000000?text=Gibson" }
        ]
      },
      6: {
        garnishId: 6,
        brandId: 21,
        brandName: "Celery Farm",
        brandNameKr: "셀러리 팜",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        garnishName: "Celery Stalk",
        garnishNameKr: "셀러리 줄기",
        primaryFunction: "visual",
        image: "https://via.placeholder.com/200x200/228B22/FFFFFF?text=Celery",
        notes: "<p>블러디 메리의 시그니처 가니쉬이자 스터러로 사용됩니다.</p><p>시각적으로 눈에 띄며, 칵테일을 마시는 동안 아삭한 식감을 즐길 수 있습니다.</p>",
        shelfLifeDays: 7,
        storageType: "냉장 보관, 물에 담가 두면 더 오래 신선함 유지",
        whenToUseNotes: "<p>블러디 메리에서 토마토 주스와 함께 채소의 신선함을 강조합니다.</p><p>칵테일을 저으면서 셀러리 향이 은은하게 배어나옵니다.</p><p>시각적으로 강한 인상을 주어 브런치 칵테일의 완성도를 높입니다.</p>",
        substituteNotes: "<p>오이 스틱으로 대체하면 더 가볍고 상큼한 느낌을 줍니다.</p><p>아스파라거스로 대체하면 색다른 비주얼과 풍미를 낼 수 있습니다.</p>",
        createdAt: "2024-02-10",
        updatedAt: "2024-02-15",
        availableCocktails: [
          { id: 65, name: "Bloody Mary", nameKr: "블러디 메리", image: "https://via.placeholder.com/80x80/DC143C/FFFFFF?text=Bloody+Mary" },
          { id: 66, name: "Bloody Caesar", nameKr: "블러디 시저", image: "https://via.placeholder.com/80x80/B22222/FFFFFF?text=Caesar" },
          { id: 67, name: "Red Snapper", nameKr: "레드 스내퍼", image: "https://via.placeholder.com/80x80/CD5C5C/FFFFFF?text=Red+Snapper" }
        ]
      }
    };

    const garnishData = garnishDataMap[garnishId];

    if (!garnishData) {
      return [404, { error: 'Garnish not found' }];
    }

    return [200, { data: garnishData }];
  });

  // ===================================================
  // Dairy/Cream Mock API
  // ===================================================

  // GET /api/dairy-cream - 유제품/크림 리스트
  mock.onGet('/api/dairy-cream').reply((config) => {
    const params = config.params || {};
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 6;
    const sort = params.sort || 'recent';
    const order = params.order || 'desc';
    const search = params.search?.toLowerCase() || '';

    const allDairyCream = [
      {
        dairyCreamId: 1,
        brandId: 22,
        brandName: "Organic Valley",
        brandNameKr: "오가닉 밸리",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        dairyCreamName: "Heavy Cream",
        dairyCreamNameKr: "헤비 크림",
        fatContent: 36.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/FFF8DC/000000?text=Heavy+Cream",
        notes: null,
        shelfLifeDays: 14,
        storageType: "냉장 보관 (1-4°C)",
        substituteNotes: null,
        createdAt: "2024-02-15",
        updatedAt: "2024-02-20",
        availableCocktails: []
      },
      {
        dairyCreamId: 2,
        brandId: 23,
        brandName: "Bailey's",
        brandNameKr: "베일리스",
        countryId: 8,
        countryName: "Ireland",
        countryNameKr: "아일랜드",
        dairyCreamName: "Irish Cream Liqueur",
        dairyCreamNameKr: "아이리시 크림 리큐어",
        fatContent: 17.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=Irish+Cream",
        notes: null,
        shelfLifeDays: 730,
        storageType: "개봉 전 상온 보관, 개봉 후 냉장 보관",
        substituteNotes: null,
        createdAt: "2024-02-14",
        updatedAt: "2024-02-19",
        availableCocktails: []
      },
      {
        dairyCreamId: 3,
        brandId: 24,
        brandName: "Coconut Cloud",
        brandNameKr: "코코넛 클라우드",
        countryId: 9,
        countryName: "Thailand",
        countryNameKr: "태국",
        dairyCreamName: "Coconut Cream",
        dairyCreamNameKr: "코코넛 크림",
        fatContent: 24.0,
        isDairyFree: true,
        image: "https://via.placeholder.com/200x200/FFFACD/000000?text=Coconut+Cream",
        notes: null,
        shelfLifeDays: 365,
        storageType: "상온 보관, 개봉 후 냉장 보관",
        substituteNotes: null,
        createdAt: "2024-02-13",
        updatedAt: "2024-02-18",
        availableCocktails: []
      },
      {
        dairyCreamId: 4,
        brandId: 25,
        brandName: "Anchor",
        brandNameKr: "앵커",
        countryId: 10,
        countryName: "New Zealand",
        countryNameKr: "뉴질랜드",
        dairyCreamName: "Whipping Cream",
        dairyCreamNameKr: "휘핑 크림",
        fatContent: 35.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/F5F5DC/000000?text=Whipping+Cream",
        notes: null,
        shelfLifeDays: 21,
        storageType: "냉장 보관 (1-4°C)",
        substituteNotes: null,
        createdAt: "2024-02-12",
        updatedAt: "2024-02-17",
        availableCocktails: []
      },
      {
        dairyCreamId: 5,
        brandId: 26,
        brandName: "Lactaid",
        brandNameKr: "락테이드",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        dairyCreamName: "Lactose-Free Milk",
        dairyCreamNameKr: "락토프리 우유",
        fatContent: 3.5,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Lactose+Free",
        notes: null,
        shelfLifeDays: 14,
        storageType: "냉장 보관 (1-4°C)",
        substituteNotes: null,
        createdAt: "2024-02-11",
        updatedAt: "2024-02-16",
        availableCocktails: []
      },
      {
        dairyCreamId: 6,
        brandId: 27,
        brandName: "Oatly",
        brandNameKr: "오틀리",
        countryId: 11,
        countryName: "Sweden",
        countryNameKr: "스웨덴",
        dairyCreamName: "Oat Cream",
        dairyCreamNameKr: "귀리 크림",
        fatContent: 15.0,
        isDairyFree: true,
        image: "https://via.placeholder.com/200x200/F5DEB3/000000?text=Oat+Cream",
        notes: null,
        shelfLifeDays: 90,
        storageType: "상온 보관, 개봉 후 냉장 보관",
        substituteNotes: null,
        createdAt: "2024-02-10",
        updatedAt: "2024-02-15",
        availableCocktails: []
      }
    ];

    let filtered = allDairyCream.filter(item =>
        item.dairyCreamName.toLowerCase().includes(search) ||
        item.dairyCreamNameKr.includes(search) ||
        item.brandName.toLowerCase().includes(search) ||
        (item.brandNameKr && item.brandNameKr.includes(search))
    );

    if (sort === 'name') {
      filtered.sort((a, b) => {
        const comparison = a.dairyCreamName.localeCompare(b.dairyCreamName);
        return order === 'asc' ? comparison : -comparison;
      });
    } else if (sort === 'recent') {
      filtered.sort((a, b) => {
        const comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        return order === 'asc' ? -comparison : comparison;
      });
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = filtered.slice(start, end);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, { data: paginatedData }]);
      }, 1000);
    });
  });

  // GET /api/dairy-cream/:id - 유제품/크림 상세
  mock.onGet(/\/api\/dairy-cream\/\d+/).reply((config) => {
    const dairyCreamId = Number(config.url?.split('/').pop());

    const dairyCreamDataMap: Record<number, any> = {
      1: {
        dairyCreamId: 1,
        brandId: 22,
        brandName: "Organic Valley",
        brandNameKr: "오가닉 밸리",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        dairyCreamName: "Heavy Cream",
        dairyCreamNameKr: "헤비 크림",
        fatContent: 36.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/FFF8DC/000000?text=Heavy+Cream",
        notes: "<p>헤비 크림은 36% 이상의 유지방을 함유한 농후한 크림입니다.</p><p>휘핑이 잘 되어 칵테일 토핑으로 사용하기에 적합합니다.</p><p>풀바디한 칵테일에 부드럽고 크리미한 질감을 더해줍니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 (1-4°C), 개봉 후 7일 이내 사용 권장",
        substituteNotes: "<p>휘핑 크림(35% 지방)으로 대체 가능하지만 질감이 약간 가벼워집니다.</p><p>하프앤하프로 대체하면 더 가벼운 질감이 됩니다.</p><p>코코넛 크림으로 대체하면 비건 옵션이 됩니다.</p>",
        createdAt: "2024-02-15",
        updatedAt: "2024-02-20",
        availableCocktails: [
          { id: 68, name: "White Russian", nameKr: "화이트 러시안", image: "https://via.placeholder.com/80x80/F5F5DC/000000?text=White+Russian" },
          { id: 69, name: "Brandy Alexander", nameKr: "브랜디 알렉산더", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=Brandy+Alexander" },
          { id: 70, name: "Irish Coffee", nameKr: "아이리시 커피", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Irish+Coffee" }
        ]
      },
      2: {
        dairyCreamId: 2,
        brandId: 23,
        brandName: "Bailey's",
        brandNameKr: "베일리스",
        countryId: 8,
        countryName: "Ireland",
        countryNameKr: "아일랜드",
        dairyCreamName: "Irish Cream Liqueur",
        dairyCreamNameKr: "아이리시 크림 리큐어",
        fatContent: 17.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/D2691E/FFFFFF?text=Irish+Cream",
        notes: "<p>아이리시 위스키와 크림을 기반으로 한 달콤한 리큐어입니다.</p><p>초콜릿과 바닐라 향이 어우러져 디저트 칵테일에 완벽합니다.</p><p>17% ABV로 칵테일에 크리미함과 함께 알코올을 더해줍니다.</p>",
        shelfLifeDays: 730,
        storageType: "개봉 전 상온 보관 가능, 개봉 후 냉장 보관하여 6개월 이내 섭취 권장",
        substituteNotes: "<p>카루아 크림 리큐어로 대체하면 커피 풍미가 강해집니다.</p><p>아마레또와 헤비크림을 섞어 비슷한 효과를 낼 수 있습니다.</p><p>비건 옵션으로는 알몬드 밀크 기반 크림 리큐어를 사용하세요.</p>",
        createdAt: "2024-02-14",
        updatedAt: "2024-02-19",
        availableCocktails: [
          { id: 71, name: "Mudslide", nameKr: "머드슬라이드", image: "https://via.placeholder.com/80x80/8B4513/FFFFFF?text=Mudslide" },
          { id: 72, name: "B-52", nameKr: "B-52", image: "https://via.placeholder.com/80x80/D2691E/FFFFFF?text=B-52" },
          { id: 73, name: "Irish Car Bomb", nameKr: "아이리시 카 밤", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Car+Bomb" }
        ]
      },
      3: {
        dairyCreamId: 3,
        brandId: 24,
        brandName: "Coconut Cloud",
        brandNameKr: "코코넛 클라우드",
        countryId: 9,
        countryName: "Thailand",
        countryNameKr: "태국",
        dairyCreamName: "Coconut Cream",
        dairyCreamNameKr: "코코넛 크림",
        fatContent: 24.0,
        isDairyFree: true,
        image: "https://via.placeholder.com/200x200/FFFACD/000000?text=Coconut+Cream",
        notes: "<p>코코넛 과육에서 추출한 진한 크림으로 트로피컬 칵테일의 필수 재료입니다.</p><p>비건 옵션으로도 훌륭하며 코코넛 향이 칵테일에 이국적인 풍미를 더해줍니다.</p><p>유제품 알레르기가 있는 사람들에게 좋은 대안입니다.</p>",
        shelfLifeDays: 365,
        storageType: "상온 보관 가능, 개봉 후 냉장 보관하여 5일 이내 사용",
        substituteNotes: "<p>헤비 크림으로 대체하면 코코넛 향은 없지만 질감은 유사합니다.</p><p>코코넛 밀크로 대체하면 더 가벼운 질감이 됩니다.</p><p>캐슈 크림으로 대체하면 견과류 풍미가 추가됩니다.</p>",
        createdAt: "2024-02-13",
        updatedAt: "2024-02-18",
        availableCocktails: [
          { id: 74, name: "Piña Colada", nameKr: "피나 콜라다", image: "https://via.placeholder.com/80x80/FFFACD/000000?text=Pina+Colada" },
          { id: 75, name: "Painkiller", nameKr: "페인킬러", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Painkiller" },
          { id: 76, name: "Chi Chi", nameKr: "치치", image: "https://via.placeholder.com/80x80/F0E68C/000000?text=Chi+Chi" }
        ]
      },
      4: {
        dairyCreamId: 4,
        brandId: 25,
        brandName: "Anchor",
        brandNameKr: "앵커",
        countryId: 10,
        countryName: "New Zealand",
        countryNameKr: "뉴질랜드",
        dairyCreamName: "Whipping Cream",
        dairyCreamNameKr: "휘핑 크림",
        fatContent: 35.0,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/F5F5DC/000000?text=Whipping+Cream",
        notes: "<p>35% 유지방을 함유한 크림으로 휘핑하기에 적합합니다.</p><p>칵테일 위에 부드러운 크림 레이어를 만들기에 좋습니다.</p><p>헤비 크림보다 약간 가벼운 질감으로 칵테일의 밸런스를 유지합니다.</p>",
        shelfLifeDays: 21,
        storageType: "냉장 보관 (1-4°C), 개봉 후 7일 이내 사용 권장",
        substituteNotes: "<p>헤비 크림으로 대체하면 더 진한 질감이 됩니다.</p><p>하프앤하프로 대체하면 가벼운 질감이 되지만 휘핑이 어렵습니다.</p><p>소이 크림으로 대체하면 비건 옵션이 됩니다.</p>",
        createdAt: "2024-02-12",
        updatedAt: "2024-02-17",
        availableCocktails: [
          { id: 77, name: "Ramos Gin Fizz", nameKr: "라모스 진 피즈", image: "https://via.placeholder.com/80x80/F0FFFF/000000?text=Ramos+Fizz" },
          { id: 78, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://via.placeholder.com/80x80/FFE4B5/000000?text=Whiskey+Sour" },
          { id: 79, name: "Clover Club", nameKr: "클로버 클럽", image: "https://via.placeholder.com/80x80/FFB6C1/000000?text=Clover+Club" }
        ]
      },
      5: {
        dairyCreamId: 5,
        brandId: 26,
        brandName: "Lactaid",
        brandNameKr: "락테이드",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        dairyCreamName: "Lactose-Free Milk",
        dairyCreamNameKr: "락토프리 우유",
        fatContent: 3.5,
        isDairyFree: false,
        image: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Lactose+Free",
        notes: "<p>유당불내증이 있는 사람들을 위한 락토오스가 제거된 우유입니다.</p><p>일반 우유와 동일한 맛과 영양을 제공하면서 소화가 잘됩니다.</p><p>크림만큼 진하지 않지만 가벼운 칵테일에 적합합니다.</p>",
        shelfLifeDays: 14,
        storageType: "냉장 보관 (1-4°C), 개봉 후 5-7일 이내 사용",
        substituteNotes: "<p>일반 우유로 1:1 대체 가능합니다.</p><p>알몬드 밀크나 오트 밀크로 대체하면 비건 옵션이 됩니다.</p><p>하프앤하프로 대체하면 더 크리미한 질감이 됩니다.</p>",
        createdAt: "2024-02-11",
        updatedAt: "2024-02-16",
        availableCocktails: [
          { id: 80, name: "White Russian", nameKr: "화이트 러시안", image: "https://via.placeholder.com/80x80/F5F5DC/000000?text=White+Russian" },
          { id: 81, name: "Grasshopper", nameKr: "그래스호퍼", image: "https://via.placeholder.com/80x80/98FB98/000000?text=Grasshopper" },
          { id: 82, name: "Smith & Kearns", nameKr: "스미스 앤 컨스", image: "https://via.placeholder.com/80x80/D2B48C/000000?text=Smith+Kearns" }
        ]
      },
      6: {
        dairyCreamId: 6,
        brandId: 27,
        brandName: "Oatly",
        brandNameKr: "오틀리",
        countryId: 11,
        countryName: "Sweden",
        countryNameKr: "스웨덴",
        dairyCreamName: "Oat Cream",
        dairyCreamNameKr: "귀리 크림",
        fatContent: 15.0,
        isDairyFree: true,
        image: "https://via.placeholder.com/200x200/F5DEB3/000000?text=Oat+Cream",
        notes: "<p>귀리를 기반으로 만든 식물성 크림으로 부드럽고 고소한 맛이 특징입니다.</p><p>비건 및 유제품 알레르기가 있는 사람들에게 훌륭한 대안입니다.</p><p>거품이 잘 형성되어 커피 칵테일이나 크리미한 칵테일에 적합합니다.</p>",
        shelfLifeDays: 90,
        storageType: "상온 보관 가능, 개봉 후 냉장 보관하여 5일 이내 사용",
        substituteNotes: "<p>소이 크림으로 대체하면 비슷한 질감이지만 맛이 약간 다릅니다.</p><p>알몬드 크림으로 대체하면 견과류 풍미가 더해집니다.</p><p>헤비 크림으로 대체하면 유제품 옵션이 됩니다.</p>",
        createdAt: "2024-02-10",
        updatedAt: "2024-02-15",
        availableCocktails: [
          { id: 83, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://via.placeholder.com/80x80/654321/FFFFFF?text=Espresso" },
          { id: 84, name: "Vegan White Russian", nameKr: "비건 화이트 러시안", image: "https://via.placeholder.com/80x80/F5F5DC/000000?text=Vegan+Russian" },
          { id: 85, name: "Golden Milk Cocktail", nameKr: "골든 밀크 칵테일", image: "https://via.placeholder.com/80x80/FFD700/000000?text=Golden+Milk" }
        ]
      }
    };

    const dairyCreamData = dairyCreamDataMap[dairyCreamId];

    if (!dairyCreamData) {
      return [404, { error: 'Dairy/Cream not found' }];
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, { data: dairyCreamData }]);
      }, 1000);
    });
  });

  /*
   * ==========================================
   * Other Ingredients (기타 첨가물) Mock API
   * ==========================================
   */
  // Other Ingredients List API
  mock.onGet('/api/other-ingredients').reply((config) => {
    const otherIngredientsMockData = [
      {
        otherIngredientId: 1,
        brandId: 1,
        brandName: "Rose's",
        brandNameKr: "로즈",
        countryId: 1,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        otherIngredientName: "Rose's Lime Juice Cordial",
        otherIngredientNameKr: "로즈 라임 주스 코디얼",
        notes: "1867년부터 생산된 전통적인 라임 코디얼로, 클래식 칵테일 Gimlet의 필수 재료입니다. 농축된 라임 주스에 설탕이 첨가되어 있어 달콤하면서도 산미가 있는 맛이 특징입니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Gimlet, Kamikaze 등 라임의 달콤한 풍미가 필요한 칵테일에 사용됩니다.",
        substituteNotes: "신선한 라임 주스 + 심플 시럽으로 대체 가능하나, 전통적인 Gimlet의 맛을 원한다면 Rose's를 권장합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/roses-lime-cordial.jpg",
        availableCocktails: [
          { id: 1, name: "Gimlet", nameKr: "김렛", image: "https://example.com/cocktails/gimlet.jpg" },
          { id: 2, name: "Kamikaze", nameKr: "카미카제", image: "https://example.com/cocktails/kamikaze.jpg" }
        ]
      },
      {
        otherIngredientId: 2,
        brandId: 2,
        brandName: "Fever-Tree",
        brandNameKr: "피버트리",
        countryId: 1,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        otherIngredientName: "Aromatic Tonic Water",
        otherIngredientNameKr: "아로마틱 토닉워터",
        notes: "천연 퀴닌과 식물성 향료로 만든 프리미엄 토닉워터입니다. 일반 토닉워터보다 복잡하고 깊은 맛을 제공하며, 진 앤 토닉의 품질을 한층 높여줍니다.",
        shelfLifeDays: 730,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "Gin & Tonic, Vodka Tonic 등 토닉워터가 주요 재료인 칵테일에 사용됩니다.",
        substituteNotes: "일반 토닉워터로 대체 가능하나, 맛의 복잡성과 깊이는 감소합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/fever-tree-tonic.jpg",
        availableCocktails: [
          { id: 3, name: "Gin & Tonic", nameKr: "진 앤 토닉", image: "https://example.com/cocktails/gin-tonic.jpg" },
          { id: 4, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://example.com/cocktails/vodka-tonic.jpg" }
        ]
      },
      {
        otherIngredientId: 3,
        brandId: 3,
        brandName: "Luxardo",
        brandNameKr: "룩사르도",
        countryId: 3,
        countryName: "Italy",
        countryNameKr: "이탈리아",
        otherIngredientName: "Luxardo Maraschino Cherries",
        otherIngredientNameKr: "룩사르도 마라스키노 체리",
        notes: "1905년부터 전통 방식으로 만들어진 프리미엄 칵테일 체리입니다. 인공 색소나 방부제 없이 마라스카 체리를 시럽에 절여 만들며, 깊고 복잡한 맛이 특징입니다. Manhattan, Old Fashioned 등의 클래식 칵테일에 가니쉬로 사용됩니다.",
        shelfLifeDays: 1095,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "칵테일의 가니쉬로 사용되거나, 체리의 풍미를 칵테일에 더할 때 사용됩니다.",
        substituteNotes: "일반 마라스키노 체리로 대체 가능하나, 품질과 맛에서 큰 차이가 있습니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/luxardo-cherries.jpg",
        availableCocktails: [
          { id: 5, name: "Manhattan", nameKr: "맨해튼", image: "https://example.com/cocktails/manhattan.jpg" },
          { id: 6, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://example.com/cocktails/old-fashioned.jpg" }
        ]
      },
      {
        otherIngredientId: 4,
        brandId: 4,
        brandName: "Fee Brothers",
        brandNameKr: "피 브라더스",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        otherIngredientName: "Orgeat Syrup",
        otherIngredientNameKr: "오르지트 시럽",
        notes: "아몬드와 오렌지 플라워 워터로 만든 달콤한 시럽입니다. Tiki 칵테일의 필수 재료이며, Mai Tai의 독특한 아몬드 풍미를 만들어냅니다. 중세 시대부터 사용된 전통적인 재료입니다.",
        shelfLifeDays: 730,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "Mai Tai, Japanese Cocktail, Army & Navy 등 아몬드 풍미가 필요한 칵테일에 사용됩니다.",
        substituteNotes: "아마레또 리큐어 + 심플 시럽으로 대체 가능하나, 오렌지 플라워의 향은 재현하기 어렵습니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/orgeat-syrup.jpg",
        availableCocktails: [
          { id: 7, name: "Mai Tai", nameKr: "마이 타이", image: "https://example.com/cocktails/mai-tai.jpg" },
          { id: 8, name: "Japanese Cocktail", nameKr: "재패니즈 칵테일", image: "https://example.com/cocktails/japanese.jpg" }
        ]
      },
      {
        otherIngredientId: 5,
        brandId: 5,
        brandName: "Monin",
        brandNameKr: "모닝",
        countryId: 4,
        countryName: "France",
        countryNameKr: "프랑스",
        otherIngredientName: "Falernum Syrup",
        otherIngredientNameKr: "팔레넘 시럽",
        notes: "라임, 아몬드, 생강, 정향이 혼합된 카리브해 스타일의 달콤한 시럽입니다. Tiki 칵테일에서 독특한 스파이시한 단맛을 더하는 데 사용되며, 복잡한 레이어드 풍미를 만들어냅니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Zombie, Corn 'n' Oil, Royal Bermuda Yacht Club 등 Tiki 및 트로피칼 칵테일에 사용됩니다.",
        substituteNotes: "직접 제작 가능: 라임 제스트, 아몬드, 생강, 정향을 설탕 시럽에 우려내어 만듭니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/falernum-syrup.jpg",
        availableCocktails: [
          { id: 9, name: "Zombie", nameKr: "좀비", image: "https://example.com/cocktails/zombie.jpg" },
          { id: 10, name: "Corn 'n' Oil", nameKr: "콘 앤 오일", image: "https://example.com/cocktails/corn-n-oil.jpg" }
        ]
      },
      {
        otherIngredientId: 6,
        brandId: 6,
        brandName: "Scrappy's",
        brandNameKr: "스크래피스",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        otherIngredientName: "Vanilla Bean Syrup",
        otherIngredientNameKr: "바닐라 빈 시럽",
        notes: "마다가스카르산 바닐라 빈으로 만든 천연 바닐라 시럽입니다. 인공 향료 없이 진짜 바닐라 빈을 사용하여 깊고 풍부한 바닐라 향을 제공합니다. 디저트 칵테일이나 크리미한 칵테일에 사용됩니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Espresso Martini, Pornstar Martini, Brandy Alexander 등 바닐라 풍미를 더하고 싶은 칵테일에 사용됩니다.",
        substituteNotes: "바닐라 익스트랙 + 심플 시럽으로 대체 가능하나, 풍미의 깊이는 다소 감소합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/vanilla-syrup.jpg",
        availableCocktails: [
          { id: 11, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://example.com/cocktails/espresso-martini.jpg" },
          { id: 12, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://example.com/cocktails/pornstar-martini.jpg" }
        ]
      }
    ];

    const { page = 1, limit = 6, sort = 'recent', order = 'desc', search = '' } = config.params || {};

    let filteredData = [...otherIngredientsMockData];

    // 검색 필터링
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(item =>
          item.otherIngredientName.toLowerCase().includes(searchLower) ||
          item.otherIngredientNameKr.toLowerCase().includes(searchLower) ||
          item.brandName.toLowerCase().includes(searchLower) ||
          (item.brandNameKr && item.brandNameKr.toLowerCase().includes(searchLower))
      );
    }

    // 정렬
    filteredData.sort((a, b) => {
      if (sort === 'name') {
        const comparison = a.otherIngredientName.localeCompare(b.otherIngredientName);
        return order === 'asc' ? comparison : -comparison;
      } else {
        // recent: id 기준 정렬
        return order === 'asc' ? a.otherIngredientId - b.otherIngredientId : b.otherIngredientId - a.otherIngredientId;
      }
    });

    // 페이지네이션
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, { data: paginatedData }]);
      }, 1000);
    });
  });

  // Other Ingredients Detail API
  mock.onGet(/\/api\/other-ingredients\/\d+/).reply((config) => {
    const otherIngredientsMockData = [
      {
        otherIngredientId: 1,
        brandId: 1,
        brandName: "Rose's",
        brandNameKr: "로즈",
        countryId: 1,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        otherIngredientName: "Rose's Lime Juice Cordial",
        otherIngredientNameKr: "로즈 라임 주스 코디얼",
        notes: "1867년부터 생산된 전통적인 라임 코디얼로, 클래식 칵테일 Gimlet의 필수 재료입니다. 농축된 라임 주스에 설탕이 첨가되어 있어 달콤하면서도 산미가 있는 맛이 특징입니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Gimlet, Kamikaze 등 라임의 달콤한 풍미가 필요한 칵테일에 사용됩니다.",
        substituteNotes: "신선한 라임 주스 + 심플 시럽으로 대체 가능하나, 전통적인 Gimlet의 맛을 원한다면 Rose's를 권장합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/roses-lime-cordial.jpg",
        availableCocktails: [
          { id: 1, name: "Gimlet", nameKr: "김렛", image: "https://example.com/cocktails/gimlet.jpg" },
          { id: 2, name: "Kamikaze", nameKr: "카미카제", image: "https://example.com/cocktails/kamikaze.jpg" }
        ]
      },
      {
        otherIngredientId: 2,
        brandId: 2,
        brandName: "Fever-Tree",
        brandNameKr: "피버트리",
        countryId: 1,
        countryName: "United Kingdom",
        countryNameKr: "영국",
        otherIngredientName: "Aromatic Tonic Water",
        otherIngredientNameKr: "아로마틱 토닉워터",
        notes: "천연 퀴닌과 식물성 향료로 만든 프리미엄 토닉워터입니다. 일반 토닉워터보다 복잡하고 깊은 맛을 제공하며, 진 앤 토닉의 품질을 한층 높여줍니다.",
        shelfLifeDays: 730,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "Gin & Tonic, Vodka Tonic 등 토닉워터가 주요 재료인 칵테일에 사용됩니다.",
        substituteNotes: "일반 토닉워터로 대체 가능하나, 맛의 복잡성과 깊이는 감소합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/fever-tree-tonic.jpg",
        availableCocktails: [
          { id: 3, name: "Gin & Tonic", nameKr: "진 앤 토닉", image: "https://example.com/cocktails/gin-tonic.jpg" },
          { id: 4, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://example.com/cocktails/vodka-tonic.jpg" }
        ]
      },
      {
        otherIngredientId: 3,
        brandId: 3,
        brandName: "Luxardo",
        brandNameKr: "룩사르도",
        countryId: 3,
        countryName: "Italy",
        countryNameKr: "이탈리아",
        otherIngredientName: "Luxardo Maraschino Cherries",
        otherIngredientNameKr: "룩사르도 마라스키노 체리",
        notes: "1905년부터 전통 방식으로 만들어진 프리미엄 칵테일 체리입니다. 인공 색소나 방부제 없이 마라스카 체리를 시럽에 절여 만들며, 깊고 복잡한 맛이 특징입니다. Manhattan, Old Fashioned 등의 클래식 칵테일에 가니쉬로 사용됩니다.",
        shelfLifeDays: 1095,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "칵테일의 가니쉬로 사용되거나, 체리의 풍미를 칵테일에 더할 때 사용됩니다.",
        substituteNotes: "일반 마라스키노 체리로 대체 가능하나, 품질과 맛에서 큰 차이가 있습니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/luxardo-cherries.jpg",
        availableCocktails: [
          { id: 5, name: "Manhattan", nameKr: "맨해튼", image: "https://example.com/cocktails/manhattan.jpg" },
          { id: 6, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://example.com/cocktails/old-fashioned.jpg" }
        ]
      },
      {
        otherIngredientId: 4,
        brandId: 4,
        brandName: "Fee Brothers",
        brandNameKr: "피 브라더스",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        otherIngredientName: "Orgeat Syrup",
        otherIngredientNameKr: "오르지트 시럽",
        notes: "아몬드와 오렌지 플라워 워터로 만든 달콤한 시럽입니다. Tiki 칵테일의 필수 재료이며, Mai Tai의 독특한 아몬드 풍미를 만들어냅니다. 중세 시대부터 사용된 전통적인 재료입니다.",
        shelfLifeDays: 730,
        storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
        whenToUseNotes: "Mai Tai, Japanese Cocktail, Army & Navy 등 아몬드 풍미가 필요한 칵테일에 사용됩니다.",
        substituteNotes: "아마레또 리큐어 + 심플 시럽으로 대체 가능하나, 오렌지 플라워의 향은 재현하기 어렵습니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/orgeat-syrup.jpg",
        availableCocktails: [
          { id: 7, name: "Mai Tai", nameKr: "마이 타이", image: "https://example.com/cocktails/mai-tai.jpg" },
          { id: 8, name: "Japanese Cocktail", nameKr: "재패니즈 칵테일", image: "https://example.com/cocktails/japanese.jpg" }
        ]
      },
      {
        otherIngredientId: 5,
        brandId: 5,
        brandName: "Monin",
        brandNameKr: "모닝",
        countryId: 4,
        countryName: "France",
        countryNameKr: "프랑스",
        otherIngredientName: "Falernum Syrup",
        otherIngredientNameKr: "팔레넘 시럽",
        notes: "라임, 아몬드, 생강, 정향이 혼합된 카리브해 스타일의 달콤한 시럽입니다. Tiki 칵테일에서 독특한 스파이시한 단맛을 더하는 데 사용되며, 복잡한 레이어드 풍미를 만들어냅니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Zombie, Corn 'n' Oil, Royal Bermuda Yacht Club 등 Tiki 및 트로피칼 칵테일에 사용됩니다.",
        substituteNotes: "직접 제작 가능: 라임 제스트, 아몬드, 생강, 정향을 설탕 시럽에 우려내어 만듭니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/falernum-syrup.jpg",
        availableCocktails: [
          { id: 9, name: "Zombie", nameKr: "좀비", image: "https://example.com/cocktails/zombie.jpg" },
          { id: 10, name: "Corn 'n' Oil", nameKr: "콘 앤 오일", image: "https://example.com/cocktails/corn-n-oil.jpg" }
        ]
      },
      {
        otherIngredientId: 6,
        brandId: 6,
        brandName: "Scrappy's",
        brandNameKr: "스크래피스",
        countryId: 2,
        countryName: "United States",
        countryNameKr: "미국",
        otherIngredientName: "Vanilla Bean Syrup",
        otherIngredientNameKr: "바닐라 빈 시럽",
        notes: "마다가스카르산 바닐라 빈으로 만든 천연 바닐라 시럽입니다. 인공 향료 없이 진짜 바닐라 빈을 사용하여 깊고 풍부한 바닐라 향을 제공합니다. 디저트 칵테일이나 크리미한 칵테일에 사용됩니다.",
        shelfLifeDays: 365,
        storageType: "개봉 후 냉장 보관",
        whenToUseNotes: "Espresso Martini, Pornstar Martini, Brandy Alexander 등 바닐라 풍미를 더하고 싶은 칵테일에 사용됩니다.",
        substituteNotes: "바닐라 익스트랙 + 심플 시럽으로 대체 가능하나, 풍미의 깊이는 다소 감소합니다.",
        createdAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        image: "https://example.com/images/vanilla-syrup.jpg",
        availableCocktails: [
          { id: 11, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://example.com/cocktails/espresso-martini.jpg" },
          { id: 12, name: "Pornstar Martini", nameKr: "포른스타 마티니", image: "https://example.com/cocktails/pornstar-martini.jpg" }
        ]
      }
    ];

    const id = Number(config.url?.split('/').pop());
    const otherIngredientData = otherIngredientsMockData.find(item => item.otherIngredientId === id);

    if (!otherIngredientData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([404, { message: 'Other ingredient not found' }]);
        }, 1000);
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, { data: otherIngredientData }]);
      }, 1000);
    });
  });

  // ==========================================
  // Unified Ingredients List API
  // ==========================================
  mock.onGet('/api/ingredients').reply((config) => {
    const unifiedIngredientsMockData = [
      // Juice (2개)
      {
      type: 'juice',
      juiceId: 1,
      brandId: 7,
      brandName: "Tropicana",
      brandNameKr: "트로피카나",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      juiceName: "Tropicana Pure Premium Orange Juice",
      juiceNameKr: "트로피카나 퓨어 프리미엄 오렌지 주스",
      sugarLevel: 4,
      acidityLevel: 3,
      image: "https://via.placeholder.com/200x200/FFA500/FFFFFF?text=Orange+Juice",
      notes: "<p>100% 착즙 오렌지 주스로 농축 환원 과정 없이 신선함을 유지합니다.</p><p>자연스러운 단맛과 상큼한 산미가 균형을 이루며, 과육이 살아있습니다.</p>",
      shelfLifeDays: 14,
      storageType: "냉장 보관 필수, 개봉 후 5일 이내 소비",
      whenToUseNotes: "<p>칵테일에 가장 많이 사용되는 기본 주스입니다.</p><p>신선한 오렌지 향이 스피릿의 알코올감을 부드럽게 만들어줍니다.</p>",
      substituteNotes: "<p>Minute Maid나 Simply Orange로 대체 가능합니다.</p><p>생과일 직접 착즙이 가장 이상적이지만 편의성이 떨어집니다.</p>",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      availableCocktails: [
        { id: 19, name: "Screwdriver", nameKr: "스크루드라이버", image: "https://via.placeholder.com/80x80/FFA500/FFFFFF?text=Screwdriver" },
        { id: 20, name: "Tequila Sunrise", nameKr: "데킬라 선라이즈", image: "https://via.placeholder.com/80x80/FF6347/FFFFFF?text=Tequila+Sunrise" }
      ]
    },
    {
      type: 'juice',
      juiceId: 2,
      brandId: 8,
      brandName: "Ocean Spray",
      brandNameKr: "오션 스프레이",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      juiceName: "Ocean Spray Cranberry Juice Cocktail",
      juiceNameKr: "오션 스프레이 크랜베리 주스 칵테일",
      sugarLevel: 4,
      acidityLevel: 4,
      image: "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Cranberry+Juice",
      notes: "<p>크랜베리 특유의 강한 산미와 떫은맛에 적당한 당분을 추가한 제품입니다.</p><p>진한 루비 색상과 타르트한 풍미가 칵테일에 깊이를 더해줍니다.</p>",
      shelfLifeDays: 21,
      storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
      whenToUseNotes: "<p>보드카 베이스 칵테일의 필수 재료입니다.</p><p>강한 산미가 알코올의 무게감을 줄여주고 칵테일을 가볍게 만들어줍니다.</p>",
      substituteNotes: "<p>100% 크랜베리 주스를 사용할 경우 당분 추가가 필요합니다.</p><p>석류 주스로 대체 시 비슷한 색감과 산미를 얻을 수 있습니다.</p>",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-19",
      availableCocktails: [
        { id: 22, name: "Cosmopolitan", nameKr: "코스모폴리탄", image: "https://via.placeholder.com/80x80/FF1493/FFFFFF?text=Cosmopolitan" },
        { id: 23, name: "Sea Breeze", nameKr: "씨 브리즈", image: "https://via.placeholder.com/80x80/FF69B4/FFFFFF?text=Sea+Breeze" }
      ]
    },
    // Bitters (2개)
    {
      type: 'bitters',
      bittersId: 1,
      brandId: 1,
      brandName: "Angostura",
      brandNameKr: "앙고스투라",
      countryId: 5,
      countryName: "Trinidad and Tobago",
      countryNameKr: "트리니다드 토바고",
      bittersName: "Angostura Aromatic Bitters",
      bittersNameKr: "앙고스투라 아로마틱 비터스",
      abv: 44.7,
      notes: "1824년부터 생산된 세계에서 가장 유명한 비터스입니다. 칵테일에 복합적인 풍미와 깊이를 더해주며, 독특한 허브와 스파이스 향이 특징입니다.",
      shelfLifeDays: 1825,
      storageType: "직사광선을 피해 서늘한 곳에 보관",
      whenToUseNotes: "Manhattan, Old Fashioned 등 클래식 칵테일의 필수 재료입니다.",
      substituteNotes: "Peychaud's Bitters나 Fee Brothers Bitters로 대체 가능하나 풍미가 다릅니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/angostura-bitters.jpg",
      availableCocktails: [
        { id: 1, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://example.com/cocktails/old-fashioned.jpg" },
        { id: 2, name: "Manhattan", nameKr: "맨해튼", image: "https://example.com/cocktails/manhattan.jpg" }
      ]
    },
    {
      type: 'bitters',
      bittersId: 2,
      brandId: 2,
      brandName: "Peychaud's",
      brandNameKr: "페이쇼",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      bittersName: "Peychaud's Aromatic Cocktail Bitters",
      bittersNameKr: "페이쇼 아로마틱 칵테일 비터스",
      abv: 35.0,
      notes: "1830년대 뉴올리언스에서 만들어진 비터스로, Angostura보다 가볍고 과일향이 강합니다. 아니스와 체리 풍미가 특징이며, Sazerac의 필수 재료입니다.",
      shelfLifeDays: 1825,
      storageType: "직사광선을 피해 서늘한 곳에 보관",
      whenToUseNotes: "Sazerac, Vieux Carré 등 뉴올리언스 스타일 칵테일에 사용됩니다.",
      substituteNotes: "Angostura로 대체 가능하나 Sazerac 고유의 맛은 재현하기 어렵습니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/peychauds-bitters.jpg",
      availableCocktails: [
        { id: 3, name: "Sazerac", nameKr: "사제락", image: "https://example.com/cocktails/sazerac.jpg" },
        { id: 4, name: "Vieux Carré", nameKr: "비유 카레", image: "https://example.com/cocktails/vieux-carre.jpg" }
      ]
    },
    // Carbonated (2개)
    {
      type: 'carbonated',
      carbonatedId: 1,
      brandId: 10,
      brandName: "Fever-Tree",
      brandNameKr: "피버트리",
      countryId: 1,
      countryName: "United Kingdom",
      countryNameKr: "영국",
      carbonatedName: "Fever-Tree Premium Indian Tonic Water",
      carbonatedNameKr: "피버트리 프리미엄 인디언 토닉워터",
      sugarLevel: 3,
      notes: "천연 퀴닌을 사용한 프리미엄 토닉워터입니다. 부드러운 탄산과 은은한 쓴맛이 특징이며, 진의 보타니컬 향을 살려줍니다.",
      shelfLifeDays: 365,
      storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
      whenToUseNotes: "Gin & Tonic, Vodka Tonic 등 토닉워터 베이스 칵테일에 사용됩니다.",
      substituteNotes: "Schweppes나 Canada Dry로 대체 가능하나 퀴닌 함량과 품질이 다릅니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/fever-tree-tonic.jpg",
      availableCocktails: [
        { id: 5, name: "Gin & Tonic", nameKr: "진 앤 토닉", image: "https://example.com/cocktails/gin-tonic.jpg" },
        { id: 6, name: "Vodka Tonic", nameKr: "보드카 토닉", image: "https://example.com/cocktails/vodka-tonic.jpg" }
      ]
    },
    {
      type: 'carbonated',
      carbonatedId: 2,
      brandId: 11,
      brandName: "Perrier",
      brandNameKr: "페리에",
      countryId: 4,
      countryName: "France",
      countryNameKr: "프랑스",
      carbonatedName: "Perrier Sparkling Natural Mineral Water",
      carbonatedNameKr: "페리에 탄산 천연 미네랄 워터",
      sugarLevel: 0,
      notes: "프랑스 남부 베르제즈 지역의 천연 탄산수입니다. 강한 탄산과 깨끗한 맛이 특징이며, 칵테일에 청량감을 더해줍니다.",
      shelfLifeDays: 730,
      storageType: "직사광선을 피해 서늘한 곳에 보관",
      whenToUseNotes: "칵테일을 가볍게 만들거나 탄산감을 추가할 때 사용됩니다.",
      substituteNotes: "S.Pellegrino나 Topo Chico로 대체 가능합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/perrier.jpg",
      availableCocktails: [
        { id: 7, name: "Aperol Spritz", nameKr: "아페롤 스프리츠", image: "https://example.com/cocktails/aperol-spritz.jpg" },
        { id: 8, name: "Mojito", nameKr: "모히또", image: "https://example.com/cocktails/mojito.jpg" }
      ]
    },
    // Dairy/Cream (2개)
    {
      type: 'dairyCream',
      dairyCreamId: 1,
      brandId: 12,
      brandName: "Horizon Organic",
      brandNameKr: "호라이즌 오가닉",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      dairyCreamName: "Horizon Organic Heavy Whipping Cream",
      dairyCreamNameKr: "호라이즌 오가닉 헤비 휘핑 크림",
      fatContent: 36,
      isDairyFree: false,
      notes: "유기농 인증을 받은 고지방 크림으로, 부드럽고 진한 맛이 특징입니다. 칵테일에 크리미한 질감을 더해줍니다.",
      shelfLifeDays: 30,
      storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
      whenToUseNotes: "White Russian, Brandy Alexander 등 크림 칵테일에 사용됩니다.",
      substituteNotes: "일반 휘핑 크림으로 대체 가능하나 풍미가 다소 감소합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/horizon-cream.jpg",
      availableCocktails: [
        { id: 9, name: "White Russian", nameKr: "화이트 러시안", image: "https://example.com/cocktails/white-russian.jpg" },
        { id: 10, name: "Brandy Alexander", nameKr: "브랜디 알렉산더", image: "https://example.com/cocktails/brandy-alexander.jpg" }
      ]
    },
    {
      type: 'dairyCream',
      dairyCreamId: 2,
      brandId: 13,
      brandName: "Silk",
      brandNameKr: "실크",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      dairyCreamName: "Silk Oat Yeah Oatmilk Creamer",
      dairyCreamNameKr: "실크 오트 예 오트밀크 크리머",
      fatContent: 5,
      isDairyFree: true,
      notes: "귀리로 만든 식물성 크리머로, 부드러운 단맛과 크리미한 질감이 특징입니다. 유제품 대체 옵션으로 인기가 높습니다.",
      shelfLifeDays: 10,
      storageType: "냉장 보관 필수, 개봉 후 7일 이내 소비",
      whenToUseNotes: "유제품 프리 칵테일이나 비건 옵션이 필요할 때 사용됩니다.",
      substituteNotes: "두유나 아몬드밀크로 대체 가능합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/silk-oatmilk.jpg",
      availableCocktails: [
        { id: 11, name: "Vegan White Russian", nameKr: "비건 화이트 러시안", image: "https://example.com/cocktails/vegan-white-russian.jpg" },
        { id: 12, name: "Oat Milk Espresso Martini", nameKr: "오트밀크 에스프레소 마티니", image: "https://example.com/cocktails/oat-espresso.jpg" }
      ]
    },
    // Garnishes (2개)
    {
      type: 'garnishes',
      garnishId: 1,
      brandId: 14,
      brandName: "Luxardo",
      brandNameKr: "룩사르도",
      countryId: 3,
      countryName: "Italy",
      countryNameKr: "이탈리아",
      garnishName: "Luxardo Maraschino Cherries",
      garnishNameKr: "룩사르도 마라스키노 체리",
      primaryFunction: "all",
      notes: "1905년부터 전통 방식으로 만들어진 프리미엄 칵테일 체리입니다. 인공 색소나 방부제 없이 마라스카 체리를 시럽에 절여 만들며, 깊고 복잡한 맛이 특징입니다.",
      shelfLifeDays: 1095,
      storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
      whenToUseNotes: "Manhattan, Old Fashioned 등의 클래식 칵테일에 가니쉬로 사용됩니다.",
      substituteNotes: "일반 마라스키노 체리로 대체 가능하나 품질과 맛에서 큰 차이가 있습니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/luxardo-cherries.jpg",
      availableCocktails: [
        { id: 13, name: "Manhattan", nameKr: "맨해튼", image: "https://example.com/cocktails/manhattan.jpg" },
        { id: 14, name: "Old Fashioned", nameKr: "올드 패션드", image: "https://example.com/cocktails/old-fashioned.jpg" }
      ]
    },
    {
      type: 'garnishes',
      garnishId: 2,
      brandId: 15,
      brandName: "Trader Joe's",
      brandNameKr: "트레이더 조스",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      garnishName: "Organic Fresh Mint",
      garnishNameKr: "유기농 신선 민트",
      primaryFunction: "aroma",
      notes: "신선한 유기농 민트로, 강렬한 향과 시원한 맛이 특징입니다. 칵테일에 청량감을 더해주는 필수 가니쉬입니다.",
      shelfLifeDays: 7,
      storageType: "냉장 보관 필수, 물에 담가 보관하면 더 오래 유지",
      whenToUseNotes: "Mojito, Mint Julep 등 민트 칵테일의 필수 재료입니다.",
      substituteNotes: "건조 민트로 대체 가능하나 신선한 향을 재현하기 어렵습니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/fresh-mint.jpg",
      availableCocktails: [
        { id: 15, name: "Mojito", nameKr: "모히또", image: "https://example.com/cocktails/mojito.jpg" },
        { id: 16, name: "Mint Julep", nameKr: "민트 줄렙", image: "https://example.com/cocktails/mint-julep.jpg" }
      ]
    },
    // Syrup (2개)
    {
      type: 'syrup',
      syrupId: 1,
      brandId: 16,
      brandName: "Monin",
      brandNameKr: "모닝",
      countryId: 4,
      countryName: "France",
      countryNameKr: "프랑스",
      syrupName: "Monin Pure Cane Sugar Syrup",
      syrupNameKr: "모닝 퓨어 케인 슈가 시럽",
      sugarLevel: 5,
      notes: "100% 사탕수수로 만든 천연 설탕 시럽입니다. 깨끗한 단맛과 부드러운 질감이 특징이며, 칵테일의 기본 감미료로 사용됩니다.",
      shelfLifeDays: 365,
      storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
      whenToUseNotes: "모든 클래식 칵테일의 기본 감미료로 사용됩니다.",
      substituteNotes: "집에서 만든 심플 시럽(설탕:물 1:1)으로 대체 가능합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/monin-simple-syrup.jpg",
      availableCocktails: [
        { id: 17, name: "Daiquiri", nameKr: "다이키리", image: "https://example.com/cocktails/daiquiri.jpg" },
        { id: 18, name: "Whiskey Sour", nameKr: "위스키 사워", image: "https://example.com/cocktails/whiskey-sour.jpg" }
      ]
    },
    {
      type: 'syrup',
      syrupId: 2,
      brandId: 17,
      brandName: "Torani",
      brandNameKr: "토라니",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      syrupName: "Torani Vanilla Syrup",
      syrupNameKr: "토라니 바닐라 시럽",
      sugarLevel: 5,
      notes: "마다가스카르산 바닐라 빈으로 만든 천연 바닐라 시럽입니다. 풍부하고 크리미한 바닐라 향이 특징이며, 다양한 칵테일에 깊이를 더해줍니다.",
      shelfLifeDays: 730,
      storageType: "직사광선을 피해 서늘한 곳에 보관",
      whenToUseNotes: "Espresso Martini, French Vanilla Martini 등 바닐라 풍미가 필요한 칵테일에 사용됩니다.",
      substituteNotes: "바닐라 익스트랙 + 심플 시럽으로 대체 가능합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/torani-vanilla.jpg",
      availableCocktails: [
        { id: 19, name: "Espresso Martini", nameKr: "에스프레소 마티니", image: "https://example.com/cocktails/espresso-martini.jpg" },
        { id: 20, name: "French Vanilla Martini", nameKr: "프렌치 바닐라 마티니", image: "https://example.com/cocktails/french-vanilla.jpg" }
      ]
    },
    // Other Ingredients (2개)
    {
      type: 'other',
      otherIngredientId: 1,
      brandId: 18,
      brandName: "Rose's",
      brandNameKr: "로즈",
      countryId: 1,
      countryName: "United Kingdom",
      countryNameKr: "영국",
      otherIngredientName: "Rose's Lime Juice Cordial",
      otherIngredientNameKr: "로즈 라임 주스 코디얼",
      notes: "1867년부터 생산된 전통적인 라임 코디얼로, 클래식 칵테일 Gimlet의 필수 재료입니다. 농축된 라임 주스에 설탕이 첨가되어 있어 달콤하면서도 산미가 있는 맛이 특징입니다.",
      shelfLifeDays: 365,
      storageType: "개봉 후 냉장 보관",
      whenToUseNotes: "Gimlet, Kamikaze 등 라임의 달콤한 풍미가 필요한 칵테일에 사용됩니다.",
      substituteNotes: "신선한 라임 주스 + 심플 시럽으로 대체 가능하나, 전통적인 Gimlet의 맛을 원한다면 Rose's를 권장합니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/roses-lime-cordial.jpg",
      availableCocktails: [
        { id: 21, name: "Gimlet", nameKr: "김렛", image: "https://example.com/cocktails/gimlet.jpg" },
        { id: 22, name: "Kamikaze", nameKr: "카미카제", image: "https://example.com/cocktails/kamikaze.jpg" }
      ]
    },
    {
      type: 'other',
      otherIngredientId: 2,
      brandId: 19,
      brandName: "Fee Brothers",
      brandNameKr: "피 브라더스",
      countryId: 2,
      countryName: "United States",
      countryNameKr: "미국",
      otherIngredientName: "Orgeat Syrup",
      otherIngredientNameKr: "오르지트 시럽",
      notes: "아몬드와 오렌지 플라워 워터로 만든 달콤한 시럽입니다. Tiki 칵테일의 필수 재료이며, Mai Tai의 독특한 아몬드 풍미를 만들어냅니다.",
      shelfLifeDays: 730,
      storageType: "직사광선을 피해 서늘한 곳에 보관, 개봉 후 냉장 보관",
      whenToUseNotes: "Mai Tai, Japanese Cocktail 등 아몬드 풍미가 필요한 칵테일에 사용됩니다.",
      substituteNotes: "아마레또 리큐어 + 심플 시럽으로 대체 가능하나, 오렌지 플라워의 향은 재현하기 어렵습니다.",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      image: "https://example.com/images/orgeat-syrup.jpg",
      availableCocktails: [
        { id: 23, name: "Mai Tai", nameKr: "마이 타이", image: "https://example.com/cocktails/mai-tai.jpg" },
        { id: 24, name: "Japanese Cocktail", nameKr: "재패니즈 칵테일", image: "https://example.com/cocktails/japanese.jpg" }
      ]
    }
    ];

    const { page = 1, limit = 6, sort = 'recent', search = '', category = '' } = config.params || {};

    let filteredData = [...unifiedIngredientsMockData];

    // 카테고리 필터링
    if (category) {
      filteredData = filteredData.filter(item => item.type === category);
    }

    // 검색 필터링
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(item => {
        // type별로 다른 필드명 처리
        let name = '';
        let nameKr = '';
        let brandName = item.brandName;
        let brandNameKr = item.brandNameKr || '';

        switch(item.type) {
          case 'juice':
            name = item.juiceName;
            nameKr = item.juiceNameKr;
            break;
          case 'bitters':
            name = item.bittersName;
            nameKr = item.bittersNameKr;
            break;
          case 'carbonated':
            name = item.carbonatedName;
            nameKr = item.carbonatedNameKr;
            break;
          case 'dairyCream':
            name = item.dairyCreamName;
            nameKr = item.dairyCreamNameKr;
            break;
          case 'garnishes':
            name = item.garnishName;
            nameKr = item.garnishNameKr;
            break;
          case 'syrup':
            name = item.syrupName;
            nameKr = item.syrupNameKr;
            break;
          case 'other':
            name = item.otherIngredientName;
            nameKr = item.otherIngredientNameKr;
            break;
        }

        return name.toLowerCase().includes(searchLower) ||
               nameKr.toLowerCase().includes(searchLower) ||
               brandName.toLowerCase().includes(searchLower) ||
               brandNameKr.toLowerCase().includes(searchLower);
      });
    }

    // 정렬
    filteredData.sort((a, b) => {
      if (sort === 'name') {
        // type별로 다른 필드명 처리
        let aName = '';
        let bName = '';

        switch(a.type) {
          case 'juice': aName = a.juiceName; break;
          case 'bitters': aName = a.bittersName; break;
          case 'carbonated': aName = a.carbonatedName; break;
          case 'dairyCream': aName = a.dairyCreamName; break;
          case 'garnishes': aName = a.garnishName; break;
          case 'syrup': aName = a.syrupName; break;
          case 'other': aName = a.otherIngredientName; break;
        }

        switch(b.type) {
          case 'juice': bName = b.juiceName; break;
          case 'bitters': bName = b.bittersName; break;
          case 'carbonated': bName = b.carbonatedName; break;
          case 'dairyCream': bName = b.dairyCreamName; break;
          case 'garnishes': bName = b.garnishName; break;
          case 'syrup': bName = b.syrupName; break;
          case 'other': bName = b.otherIngredientName; break;
        }

        return aName.localeCompare(bName);
      } else {
        // recent: 배열 순서 유지 (뒤집기)
        return 0;
      }
    });

    if (sort === 'recent') {
      filteredData.reverse();
    }

    // 페이지네이션
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([200, { data: paginatedData }]);
      }, 1000);
    });
  });
}
