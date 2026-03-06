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
import CocktailDetailModal from "../component/CocktailDetailModal";
import CocktailInsertModal from "../component/CocktailInsertModal";
import useReadCocktail from "../service/useReadCocktail.tsx";
import useAuth from "../../auth/service/useAuth.ts";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";
import { showErrorAlert } from "../../common/utils/AlertUtils";
import useReadCocktailList from "../service/useReadCocktailList.tsx";
import CocktailListComponent from "../component/CocktailListComponent.tsx";
import SearchLoadingOverlay from "../../common/component/loading/SearchLoadingOverlay.tsx";
import {
  ControlsContainer,
  ItemList,
  PageContainer,
  RegisterButton,
  RightControls,
  SearchField,
  SortSelect,
} from "../../common/style/CommonListPage.style.tsx";

const CocktailListPage: React.FC = () => {
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
  const [ insertModalOpen, setInsertModalOpen ] = useState<boolean>(false);
  const [ searchKeyword, setSearchKeyword ] = useState<string>("");
  const [ searchDebounceTimer, setSearchDebounceTimer ] = useState<number | null>(null);
  const [ isSearching, setIsSearching ] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const { cocktailList, cocktailListLoading, cocktailListLoadingMore, cocktailListError, cocktailListHasMore, fetchReadCocktailList } = useReadCocktailList();
  const { cocktail, cocktailLoading, cocktailError, fetchReadCocktail } = useReadCocktail();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadCocktailList({
      page: 1,
      limit: PAGE_SIZE,
      order: "desc",
      sort: sortOrder,
      search: searchKeyword.trim() || undefined
    });
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
        search: keyword.trim() || undefined
      }).finally(() => {
        setIsSearching(false);
      });
    }, 250);

    setSearchDebounceTimer(newTimer);
  }, [sortOrder, searchDebounceTimer]);

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
      sort: sortOrder
    }).finally(() => {
      setIsSearching(false);
    });
  }, [sortOrder]);

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
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, cocktailListHasMore, cocktailListLoading, cocktailListLoadingMore]);

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
        open={cocktailListLoading && !isSearching}
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

          {/* 검색창 + 등록 버튼 그룹 */}
          <RightControls>
            <SearchField
              placeholder="칵테일 검색..."
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
            {isAuthenticated && (
              <RegisterButton
                variant="contained"
                disableElevation
                onClick={() => setInsertModalOpen(true)}
              >
                칵테일 등록
              </RegisterButton>
            )}
          </RightControls>
        </ControlsContainer>

        {/* 칵테일 리스트 */}
        <ItemList>
          {isSearching ? (
            <SearchLoadingOverlay
              open={isSearching}
              message="검색 중..."
            />
          ) : (
            cocktailList && cocktailList.map((cocktail, index) => (
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

      {/* 칵테일 등록 모달 */}
      <CocktailInsertModal
          open={insertModalOpen}
          onClose={() => setInsertModalOpen(false)}
      />
    </PageContainer>
  );
};

export default CocktailListPage;

