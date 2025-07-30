import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Card, 
  CardMedia, 
  InputAdornment,
  MenuItem,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  BottomInfo,
  CardContentArea, CocktailAlcohol, CocktailDescription,
  CocktailList, CocktailTitle, ContentSection,
  ControlsContainer, DateText, ImageSection, LikeText, NewChip,
  PageContainer,
  SearchField,
  SortSelect
} from "../style/CocktailListPage_Style.tsx";
import CocktailDetailModal from "../component/CocktailDetailModal";

const CocktailListPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedCocktail, setSelectedCocktail] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 공통 샘플 데이터 (모든 칵테일이 동일한 상세 데이터 사용)
  const sampleModalData = {
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
    englishName: "Mojito",
    koreanName: "모히토",
    category: "Refreshing",
    alcoholContent: 10,
    difficulty: 'easy' as const,
    isVariant: false,
    profileDescription: "쿠바의 대표적인 칵테일로, 상쾌한 민트와 라임의 조화가 완벽한 여름 음료",
    
    history: "<p>모히토는 16세기 쿠바에서 시작된 칵테일로, 원래는 해적들이 마시던 음료였습니다.</p><p>현재의 형태는 20세기 초 하바나의 바에서 완성되었으며, 어니스트 헤밍웨이가 사랑했던 칵테일로도 유명합니다.</p>",
    recipe: "<p><strong>재료:</strong></p><ul><li>화이트 럼 60ml</li><li>신선한 민트 잎 10-12개</li><li>라임 1/2개</li><li>설탕 2티스푼</li><li>소다수</li><li>얼음</li></ul><p><strong>만드는 법:</strong></p><ol><li>하이볼 글라스에 민트 잎과 설탕을 넣고 가볍게 머들링</li><li>라임 조각을 추가하고 다시 머들링</li><li>럼을 넣고 얼음으로 채움</li><li>소다수로 탑업하고 가볍게 저어줌</li></ol>",
    tips: "<p><strong>완벽한 모히토를 위한 팁:</strong></p><ul><li>민트 잎을 너무 세게 머들링하지 마세요 - 쓴맛이 날 수 있습니다</li><li>신선한 라임 주스를 사용하세요</li><li>소다수는 마지막에 넣어 탄산이 빠지지 않도록 하세요</li><li>얼음은 큼직한 것을 사용하면 희석을 줄일 수 있습니다</li></ul>",
    
    ingredients: {
      spirits: [
        { id: 1, image: "https://images.unsplash.com/photo-1572441711009-31e2e5f64ba5?w=100&h=100&fit=crop", englishName: "White Rum", koreanName: "화이트 럼" },
        { id: 2, englishName: "Dark Rum", koreanName: "다크 럼" }
      ],
      juices: [
        { id: 1, image: "https://images.unsplash.com/photo-1557401279-8e8de6c4659b?w=100&h=100&fit=crop", englishName: "Lime Juice", koreanName: "라임 주스" },
        { id: 2, englishName: "Lemon Juice", koreanName: "레몬 주스" }
      ],
      bitters: [
        { id: 1, englishName: "Angostura Bitters", koreanName: "앙고스투라 비터스" }
      ],
      syrups: [
        { id: 1, image: "https://images.unsplash.com/photo-1572441755997-6a0e8b3c1d42?w=100&h=100&fit=crop", englishName: "Simple Syrup", koreanName: "심플 시럽" },
        { id: 2, englishName: "Mint Syrup", koreanName: "민트 시럽" }
      ],
      carbonated: [
        { id: 1, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop", englishName: "Soda Water", koreanName: "소다수" },
        { id: 2, englishName: "Sparkling Water", koreanName: "스파클링 워터" },
        { id: 3, englishName: "Tonic Water", koreanName: "토닉워터" }
      ],
      dairy: [],
      garnishes: [
        { id: 1, image: "https://images.unsplash.com/photo-1607103688605-8a06a4a4c4fc?w=100&h=100&fit=crop", englishName: "Mint Leaves", koreanName: "민트 잎" },
        { id: 2, englishName: "Lime Wedge", koreanName: "라임 웨지" },
        { id: 3, englishName: "Cherry", koreanName: "체리" }
      ],
      others: [
        { id: 1, image: "https://images.unsplash.com/photo-1571167025672-ca4cb3cd8af1?w=100&h=100&fit=crop", englishName: "Sugar", koreanName: "설탕" },
        { id: 2, englishName: "Ice Cubes", koreanName: "얼음" }
      ]
    },
    
    techniques: {
      tools: [
        { id: 1, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", englishName: "Muddler", koreanName: "머들러" },
        { id: 2, englishName: "Bar Spoon", koreanName: "바 스푼" },
        { id: 3, englishName: "Jigger", koreanName: "지거" },
        { id: 4, englishName: "Shaker", koreanName: "셰이커" },
        { id: 5, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", englishName: "Strainer", koreanName: "스트레이너" },
        { id: 6, englishName: "Cocktail Strainer", koreanName: "칵테일 스트레이너" },
        { id: 7, englishName: "Muddling Spoon", koreanName: "머들링 스푼" },
        { id: 8, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop", englishName: "Cocktail Picker", koreanName: "칵테일 피커" }
      ],
      glassware: [
        { id: 1, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop", englishName: "Highball Glass", koreanName: "하이볼 글라스" },
        { id: 2, englishName: "Collins Glass", koreanName: "콜린스 글라스" }
      ],
      methods: [
        { id: 1, englishName: "Muddling", koreanName: "머들링" },
        { id: 2, englishName: "Building", koreanName: "빌드" },
        { id: 3, englishName: "Stirring", koreanName: "스터링" },
        { id: 4, englishName: "Shaking", koreanName: "셰이킹" }
      ],
      servingStyle: "온 더 록"
    },
    
    personalDescription: "처음 만들어본 칵테일이에요. 생각보다 간단해서 놀랐고, 민트향이 정말 상쾌했습니다!",
    personalTips: "민트를 너무 세게 으깨면 정말 쓴맛이 나더라고요. 살살 눌러주는 게 포인트인 것 같아요.",
    personalReview: "여름에 마시기 정말 좋은 칵테일이에요. 도수도 적당하고 상큼해서 자주 만들어 마시고 있습니다.",
    
    hashtags: ["모히토", "쿠바", "민트", "상쾌한", "여름칵테일", "럼베이스", "클래식"],
    
    comments: [
      {
        id: 1,
        author: "칵테일러버",
        content: "정말 맛있는 레시피네요! 민트의 양을 조절하는 게 포인트인 것 같아요.",
        date: "2024-11-10",
        replies: [
          {
            id: 1,
            author: "작성자",
            content: "맞아요! 민트는 개인 취향에 따라 조절하시면 됩니다.",
            date: "2024-11-10"
          }
        ]
      },
      {
        id: 2,
        author: "홈바텐더",
        content: "소다수 대신 토닉워터를 써봤는데도 괜찮더라고요!",
        date: "2024-11-12"
      },
      {
        id: 3,
        author: "모히토마니아",
        content: "쿠바에서 직접 마셔본 모히토와 정말 비슷한 맛이에요. 감사합니다!",
        date: "2024-11-14",
        replies: [
          {
            id: 1,
            author: "작성자",
            content: "와! 쿠바에서 드셔보신 분이 인정해주시니 정말 기쁘네요!",
            date: "2024-11-14"
          },
          {
            id: 2,
            author: "여행가",
            content: "저도 쿠바 여행 때 마셔봤는데 정말 그 맛이에요!",
            date: "2024-11-15"
          }
        ]
      }
    ],
    
    likeCount: 127,
    shareCount: 89,
    createdAt: "2024-11-15",
    updatedAt: "2024-11-15",
    isLiked: false
  };

  // 임시 데이터 (리스트용)
  const cocktails = [
    { 
      id: 1, 
      name: "모히토", 
      description: "상쾌한 민트와 라임의 조화가 완벽한 쿠바의 대표 칵테일",
      alcohol: "10",
      date: "2024.11.15", 
      likes: 127,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: true
    },
    { 
      id: 2, 
      name: "마가리타", 
      description: "데킬라 베이스의 멕시코 전통 칵테일, 소금테 림이 특징",
      alcohol: "15",
      date: "2024.10.28", 
      likes: 89,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 3,
      name: "올드 패션드",
      description: "위스키의 깊은 맛을 느낄 수 있는 클래식한 칵테일",
      alcohol: "35",
      date: "2024.10.12",
      likes: 203,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 4,
      name: "네그로니",
      description: "진, 캄파리, 스위트 베르무트의 완벽한 조화",
      alcohol: "24",
      date: "2024.09.30",
      likes: 156,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 5,
      name: "위스키 사워",
      description: "위스키의 강함과 레몬의 상큼함이 어우러진 칵테일",
      alcohol: "20",
      date: "2024.09.15",
      likes: 74,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 6,
      name: "에스프레소 마티니",
      description: "커피의 깊은 맛과 보드카가 만나는 모던 클래식",
      alcohol: "18.1",
      date: "2024.08.20",
      likes: 92,
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false 
    },
  ];

  const handleCocktailClick = (cocktail: any) => {
    setSelectedCocktail(sampleModalData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCocktail(null);
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* 상단 컨트롤 영역 */}
        <ControlsContainer>
          {/* 정렬 드롭다운 */}
          <FormControl size="small">
            <SortSelect
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as string)}
            >
              <MenuItem value="recent">최신순</MenuItem>
              <MenuItem value="popular">인기순</MenuItem>
              <MenuItem value="name">이름순</MenuItem>
              <MenuItem value="rating">평점순</MenuItem>
            </SortSelect>
          </FormControl>

          {/* 검색창 */}
          <SearchField
            placeholder="칵테일 검색..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "18px" }}>🔍</span>
                </InputAdornment>
              ),
            }}
          />
        </ControlsContainer>

        {/* 칵테일 리스트 */}
        <CocktailList>
          {cocktails.map((cocktail, index) => (
            <Card
              key={cocktail.id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => handleCocktailClick(cocktail)}
              sx={{ 
                position: "relative",
                cursor: "pointer",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                backgroundColor: "#fff",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                }
              }}
            >
              {/* NEW 태그 */}
              {cocktail.isNew && (
                <NewChip label="NEW" size="small" />
              )}

              <CardContentArea>
                {/* 이미지 섹션 */}
                <ImageSection>
                  <CardMedia
                    component="img"
                    height="200"
                    image={cocktail.image}
                    alt={cocktail.name}
                    sx={{ 
                      objectFit: "cover",
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </ImageSection>

                {/* 콘텐츠 섹션 */}
                <ContentSection>
                  <Box>
                    <CocktailTitle variant="h6">
                      {cocktail.name}
                    </CocktailTitle>
                    
                    <CocktailDescription variant="body2">
                      {cocktail.description}
                    </CocktailDescription>
                    
                    <CocktailAlcohol variant="body2">
                      abz {cocktail.alcohol}%
                    </CocktailAlcohol>
                  </Box>

                  <BottomInfo>
                    <DateText variant="caption">
                      {cocktail.date}
                    </DateText>
                    <LikeText variant="caption">
                      ❤️ {cocktail.likes}
                    </LikeText>
                  </BottomInfo>
                </ContentSection>
              </CardContentArea>
            </Card>
          ))}
        </CocktailList>
      </Container>

      {/* 칵테일 상세 모달 */}
      <CocktailDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        data={selectedCocktail}
      />
    </PageContainer>
  );
};

export default CocktailListPage;