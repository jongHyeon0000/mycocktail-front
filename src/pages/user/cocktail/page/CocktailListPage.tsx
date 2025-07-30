import React, {useEffect, useState} from "react";
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
import useReadCocktail from "../service/useReadCocktail.tsx";

const CocktailListPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState("recent");
  const [modalOpen, setModalOpen] = useState(false);

  const { cocktail, cocktailLoading, cocktailError, fetchReadCocktail } = useReadCocktail();

  useEffect(() => {
    if (cocktail) {
      setModalOpen(true);
    }
  }, [cocktail]);

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

  const handleCocktailClick = (cocktailId: number) => {
    fetchReadCocktail(cocktailId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
              onClick={() => handleCocktailClick(cocktail.id)}
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
      {cocktail && <CocktailDetailModal
          open={modalOpen}
          onClose={handleCloseModal}
          data={cocktail}
      />}
    </PageContainer>
  );
};

export default CocktailListPage;