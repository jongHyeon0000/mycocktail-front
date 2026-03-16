import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import useReadGarnishes from "../service/useReadGarnishes.tsx";
import useReadGarnishesList from "../service/useReadGarnishesList.tsx";
import CommonErrorSnackbar from "../../../common/component/snackbar/CommonErrorSnackbar";
import LoadingOverlay from "../../../common/component/loading/LoadingOverlay.tsx";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  Typography
} from "@mui/material";
import SearchLoadingOverlay from "../../../common/component/loading/SearchLoadingOverlay.tsx";
import {
  ControlsContainer,
  ItemList,
  PageContainer,
  SearchField,
  SortContainer,
  SortSelect,
} from "../../../common/style/CommonListPage.style.tsx";
import GarnishesListComponent from "../component/GarnishesListComponent.tsx";
import GarnishesDetailModal from "../component/GarnishesDetailModal.tsx";

const GarnishesListPage: React.FC = () => {
  /*
   * 검색 카테고리 (최신순, 이름순)
   * */
  type SortOrderType = "recent" | "name";

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

  const { garnishes, garnishesLoading, fetchReadGarnishes } = useReadGarnishes();
  const { garnishesList, garnishesListLoading, garnishesListLoadingMore, garnishesListHasMore, fetchReadGarnishesList } = useReadGarnishesList();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadGarnishesList({
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

      fetchReadGarnishesList({
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

    fetchReadGarnishesList({
      page: 1,
      limit: PAGE_SIZE,
      order: "desc",
      sort: sortOrder,
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
      if (garnishesListHasMore && !garnishesListLoading && !garnishesListLoadingMore) {
        await fetchReadGarnishesList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, garnishesListHasMore, garnishesListLoading, garnishesListLoadingMore]);

  /*
  * 이벤트 리스너 등록 및 해제
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
    if (garnishes?.data) {
      setModalOpen(true);
    }
  }, [garnishes]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (garnishesList && garnishesList.code !== 'OK') {
      setSnackbarMessage(garnishesList.message);
      setSnackbarOpen(true);
    }
  }, [garnishesList]);

  useEffect(() => {
    if (garnishes && garnishes.code !== 'OK') {
      setSnackbarMessage(garnishes.message);
      setSnackbarOpen(true);
    }
  }, [garnishes]);

  return (
      <PageContainer>
        {/* 로딩 오버레이 - 초기 로딩시에만 */}
        <LoadingOverlay
            open={garnishesListLoading && !isSearching}
            message="가니쉬 리스트를 불러오는 중..."
        />
        <LoadingOverlay
            open={garnishesLoading}
            message="가니쉬 정보를 불러오는 중..."
        />

        <Container maxWidth="lg">
          {/* 상단 컨트롤 영역 */}
          <ControlsContainer>
            {/* 정렬 드롭다운들 */}
            <SortContainer>
              <FormControl size="small">
                <SortSelect
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SetStateAction<SortOrderType>)}
                >
                  <MenuItem value="recent">최신순</MenuItem>
                  <MenuItem value="name">이름순</MenuItem>
                </SortSelect>
              </FormControl>
            </SortContainer>

            {/* 검색창 */}
            <SearchField
                placeholder="가니쉬 검색..."
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
          </ControlsContainer>

          {/* 가니쉬 리스트 */}
          <ItemList>
            {isSearching ? (
                <SearchLoadingOverlay
                    open={isSearching}
                    message="검색 중..."
                />
            ) : (
                garnishesList?.data && garnishesList.data.map((garnish, index) => (
                    <GarnishesListComponent
                        key={`${garnish.garnishId}-${index}`}
                        data={garnish}
                        index={index}
                        onClickEvent={() => fetchReadGarnishes(garnish.garnishId)}
                    />
                ))
            )}
          </ItemList>

          {/* 추가 로딩 중 (무한 스크롤) */}
          {garnishesListLoadingMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={48} />
              </Box>
          )}

          {/* 리스트 끝 메시지 */}
          {!isSearching && !garnishesListHasMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  모든 가니쉬를 확인했습니다 🍸
                </Typography>
              </Box>
          )}
        </Container>

        {/* 가니쉬 상세 모달 */}
        {garnishes?.data && (
            <GarnishesDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={garnishes.data}
            />
        )}

        <CommonErrorSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={() => setSnackbarOpen(false)}
        />
      </PageContainer>
  );
}

export default GarnishesListPage;

