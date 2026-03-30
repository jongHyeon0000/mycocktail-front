import React, {type SetStateAction, useEffect, useState, useCallback} from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  FormControl,
  CircularProgress,
  Typography
} from "@mui/material";
import CocktailDetailModal from "../../cocktail/component/CocktailDetailModal";
import useReadCocktail from "../../cocktail/service/useReadCocktail.tsx";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";
import CommonErrorSnackbar from "../../common/component/snackbar/CommonErrorSnackbar";
import useReadCocktailList from "../../cocktail/service/useReadCocktailList.tsx";
import CocktailListComponent from "../../cocktail/component/CocktailListComponent.tsx";
import SearchLoadingOverlay from "../../common/component/loading/SearchLoadingOverlay.tsx";
import {
  ControlsContainer,
  ItemList,
  PageContainer,
  RightControls,
  SearchField,
  SortSelect,
} from "../../common/style/CommonListPage.style.tsx";
import {useAuthStore} from "../../../../store/authStore.ts";

const MyRecipesPage: React.FC = () => {
  /*
  * 검색 카테고리 (최신순, 인기순, 이름순)
  * */
  type SortOrderType = "recent" | "popular" | "name";

  /*
  * 한 번 스크롤 시 불러올 pagination size
  * */
  const PAGE_SIZE: number = 6;

  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const [ sortOrder, setSortOrder ] = useState<SortOrderType>("recent");
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ searchKeyword, setSearchKeyword ] = useState<string>("");
  const [ searchDebounceTimer, setSearchDebounceTimer ] = useState<number | null>(null);
  const [ isSearching, setIsSearching ] = useState<boolean>(false);
  const [ snackbarOpen, setSnackbarOpen ] = useState<boolean>(false);
  const [ snackbarMessage, setSnackbarMessage ] = useState<string>("");

  const { user } = useAuthStore();
  const { cocktailList, cocktailListLoading, cocktailListLoadingMore, cocktailListHasMore, fetchReadCocktailList } = useReadCocktailList();
  const { cocktail, cocktailLoading, fetchReadCocktail } = useReadCocktail();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    if (user?.userId) {
      fetchReadCocktailList({
        page: 1,
        limit: PAGE_SIZE,
        order: "desc",
        sort: sortOrder,
        search: searchKeyword.trim() || undefined,
        userId: user.userId,
      });
    }
  }, [sortOrder]);

  /*
  * 검색어 입력 핸들러 (디바운스 적용)
  * */
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    // 이전 타이머 취소
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    // 검색 중 상태 활성화
    setIsSearching(true);

    // 새로운 타이머 설정 (250ms 후 검색 실행)
    const newTimer = setTimeout(() => {
      setCurrentPage(1);

      fetchReadCocktailList({
        page: 1,
        limit: PAGE_SIZE,
        order: "desc",
        sort: sortOrder,
        search: keyword.trim() || undefined,
        userId: user?.userId,
      }).finally(() => {
        setIsSearching(false);
      });
    }, 250);

    setSearchDebounceTimer(newTimer);
  }, [sortOrder, searchDebounceTimer, user?.userId]);

  /*
  * 검색어 초기화 핸들러
  * */
  const handleSearchClear = useCallback(() => {
    setSearchKeyword("");
    setCurrentPage(1);
    setIsSearching(true);

    fetchReadCocktailList({
      page: 1,
      limit: PAGE_SIZE,
      order: "desc",
      sort: sortOrder,
      userId: user?.userId,
    }).finally(() => {
      setIsSearching(false);
    });
  }, [sortOrder, user?.userId]);

  /*
  * 무한 스크롤 이벤트 핸들러 - 추가 데이터 로드
  * */
  const handleScroll = useCallback(async () => {
    // 현재 스크롤 위치 + 뷰포트 높이가 전체 문서 높이에서 100px 이내에 도달하면 로드
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      if (cocktailListHasMore && !cocktailListLoading && !cocktailListLoadingMore) {
        await fetchReadCocktailList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined,
          userId: user?.userId,
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, cocktailListHasMore, cocktailListLoading, cocktailListLoadingMore, user?.userId]);

  /*
  * 스크롤 이벤트 리스너 등록/해제
  * */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
    };
  }, [handleScroll, searchDebounceTimer]);

  /*
  * Modal State 제어
  * */
  useEffect(() => {
    if (cocktail?.data) {
      setModalOpen(true);
    }
  }, [cocktail]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (cocktailList && cocktailList.code !== 'OK') {
      setSnackbarMessage(cocktailList.message);
      setSnackbarOpen(true);
    }
  }, [cocktailList]);

  useEffect(() => {
    if (cocktail && cocktail.code !== 'OK') {
      setSnackbarMessage(cocktail.message);
      setSnackbarOpen(true);
    }
  }, [cocktail]);

  return (
    <PageContainer>
      {/* 로딩 오버레이 - 초기 로딩시에만 */}
      <LoadingOverlay
        open={cocktailListLoading && !isSearching}
        message="레시피를 불러오는 중..."
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
          <RightControls>
            <SearchField
              placeholder="레시피 검색..."
              variant="outlined"
              size="small"
              value={searchKeyword}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ fontSize: "18px" }}>🔍</span>
                  </InputAdornment>
                ),
                endAdornment: searchKeyword && (
                  <InputAdornment position="end">
                    <span
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        padding: "4px"
                      }}
                      onClick={handleSearchClear}
                    >
                      ✕
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </RightControls>
        </ControlsContainer>

        {/* 레시피 리스트 */}
        <ItemList>
          {isSearching ? (
            <SearchLoadingOverlay
              open={isSearching}
              message="검색 중..."
            />
          ) : (
            cocktailList?.data && cocktailList.data.map((cocktail, index) => (
              <CocktailListComponent cocktail={cocktail} index={index} onClickEvent={() => fetchReadCocktail(cocktail.cocktailId)} />
            ))
          )}
        </ItemList>

        {/* 추가 로딩 중 (무한 스크롤) */}
        {cocktailListLoadingMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress size={48} />
          </Box>
        )}

        {/* 리스트 끝 메시지 */}
        {!isSearching && !cocktailListHasMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              내 모든 레시피를 불러왔습니다 🍸
            </Typography>
          </Box>
        )}
      </Container>

      {/* 칵테일 상세 모달 */}
      {cocktail?.data && <CocktailDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={cocktail.data}
      />}

      <CommonErrorSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </PageContainer>
  );
}

export default MyRecipesPage;
