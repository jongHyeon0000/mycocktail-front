import React, {type SetStateAction, useEffect, useState, useCallback} from "react";
import { 
  Box, 
  Container, 
  Card, 
  CardMedia, 
  InputAdornment,
  MenuItem,
  FormControl,
  CircularProgress,
  Typography
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
} from "./style/CocktailListPage_Style.tsx";
import CocktailDetailModal from "../component/CocktailDetailModal";
import useReadCocktail from "../service/useReadCocktail.tsx";
import LoadingOverlay from "../../common/component/LoadingOverlay";
import { showErrorAlert } from "../../common/utils/AlertUtils";
import useReadCocktailList from "../service/useReadCocktailList.tsx";

const CocktailListPage: React.FC = () => {
  type SortOrderType = "recent" | "popular" | "name";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrderType>("recent");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { 
    cocktailList, 
    cocktailListLoading, 
    cocktailListLoadingMore,
    cocktailListError, 
    cocktailListHasMore,
    fetchReadCocktailList
  } = useReadCocktailList();
  const { cocktail, cocktailLoading, cocktailError, fetchReadCocktail } = useReadCocktail();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    setCurrentPage(1);
    fetchReadCocktailList({
      page: 1,
      limit: 6,
      order: "desc",
      sort: sortOrder
    });
  }, [sortOrder]);

  /*
  * 무한 스크롤 - 더 많은 데이터 로드
  * */
  const loadMoreData = useCallback(async () => {
    if (cocktailListLoadingMore || !cocktailListHasMore || cocktailListLoading) return;
    
    const nextPage = currentPage + 1;
    
    await fetchReadCocktailList({
      page: nextPage,
      limit: 6,
      order: "desc",
      sort: sortOrder
    }, true);
    
    setCurrentPage(nextPage);
  }, [currentPage, sortOrder, cocktailListLoadingMore, cocktailListHasMore, cocktailListLoading]);

  /*
  * 스크롤 이벤트 핸들러 - 하단 뷰포트 감지
  * */
  const handleScroll = useCallback(() => {
    // 현재 스크롤 위치 + 뷰포트 높이가 전체 문서 높이에서 200px 이내에 도달하면 로드
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
      loadMoreData();
    }
  }, [loadMoreData]);

  /*
  * 스크롤 이벤트 리스너 등록/해제
  * */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /*
  * Modal State 제어
  * */
  useEffect(() => {
    if (cocktail) {
      setModalOpen(true);
    }
  }, [cocktail]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (cocktailListError) {
      showErrorAlert(
          '세부 칵테일 리스트 로드 실패',
          cocktailListError
      ).then();
    }

    if (cocktailError) {
      showErrorAlert(
          '세부 칵테일 로드 실패',
          cocktailError
      ).then();
    }
  }, [cocktailListError, cocktailError]);

  return (
    <PageContainer>
      {/* 로딩 오버레이 - 초기 로딩시에만 */}
      <LoadingOverlay
        open={cocktailListLoading}
        message="칵테일 리스트를 불러오는 중..."
      />
      <LoadingOverlay 
        open={cocktailLoading} 
        message="칵테일 정보를 불러오는 중..."
      />
      
      <Container maxWidth="lg">
        {/* 상단 컨트롤 영역 */}
        <ControlsContainer>
          {/* 정렬 드롭다운 */}
          <FormControl size="small">
            <SortSelect
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SetStateAction<SortOrderType>)}
            >
              <MenuItem value="recent">최신순</MenuItem>
              <MenuItem value="popular">인기순</MenuItem>
              <MenuItem value="name">이름순</MenuItem>
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
          {cocktailList && cocktailList.map((cocktail, index) => (
            <Card
              key={`${cocktail.cocktailId}-${index}`}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 6) * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => fetchReadCocktail(cocktail.cocktailId)}
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
                    alt={cocktail.cocktailName}
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
                      {cocktail.cocktailNameKr} ({cocktail.cocktailName})
                    </CocktailTitle>
                    
                    <CocktailDescription variant="body2">
                      {cocktail.profileNote}
                    </CocktailDescription>
                    
                    <CocktailAlcohol variant="body2">
                      abz {cocktail.abs_percentage}%
                    </CocktailAlcohol>
                  </Box>

                  <BottomInfo>
                    <DateText variant="caption">
                      {cocktail.createAt}
                    </DateText>
                    <LikeText variant="caption">
                      ❤️ {cocktail.likeCount}
                    </LikeText>
                  </BottomInfo>
                </ContentSection>
              </CardContentArea>
            </Card>
          ))}
        </CocktailList>

        {/* 무한 스크롤 로딩 인디케이터 */}
        {cocktailListLoadingMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress size={40} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              더 많은 칵테일을 불러오는 중...
            </Typography>
          </Box>
        )}

        {/* 더 이상 불러올 데이터가 없을 때 */}
        {cocktailList && cocktailList.length > 0 && !cocktailListHasMore && !cocktailListLoadingMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              모든 칵테일을 불러왔습니다 🍸
            </Typography>
          </Box>
        )}
      </Container>

      {/* 칵테일 상세 모달 */}
      {cocktail && <CocktailDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={cocktail}
      />}
    </PageContainer>
  );
};

export default CocktailListPage;