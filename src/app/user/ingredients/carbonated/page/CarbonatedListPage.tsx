import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import useReadCarbonated from "../service/useReadCarbonated.tsx";
import useReadCarbonatedList from "../service/useReadCarbonatedList.tsx";
import {showErrorAlert} from "../../../common/utils/AlertUtils.ts";
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
import CarbonatedDetailModal from "../component/CarbonatedDetailModal.tsx";
import CarbonatedListComponent from "../component/CarbonatedListComponent.tsx";

const CarbonatedListPage: React.FC = () => {
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

  const { carbonated, carbonatedLoading, fetchReadCarbonated } = useReadCarbonated()
  const { fetchReadCarbonatedList, carbonatedList, carbonatedListLoading, carbonatedListLoadingMore, carbonatedListHasMore } = useReadCarbonatedList();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadCarbonatedList({
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

      fetchReadCarbonatedList({
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

    fetchReadCarbonatedList({
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
      if (carbonatedListHasMore && !carbonatedListLoading && !carbonatedListLoadingMore) {
        await fetchReadCarbonatedList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, carbonatedListHasMore, carbonatedListLoading, carbonatedListLoadingMore]);

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
    if (carbonated?.data) {
      setModalOpen(true);
    }
  }, [carbonated]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (carbonatedList && carbonatedList.code !== 'OK') {
      showErrorAlert('탄산 리스트 로드 실패', carbonatedList.message).then();
    }
  }, [carbonatedList]);

  useEffect(() => {
    if (carbonated && carbonated.code !== 'OK') {
      showErrorAlert('탄산 로드 실패', carbonated.message).then();
    }
  }, [carbonated]);

  return (
      <PageContainer>
        {/* 로딩 오버레이 - 초기 로딩시에만 */}
        <LoadingOverlay
            open={carbonatedListLoading && !isSearching}
            message="탄산 리스트를 불러오는 중..."
        />
        <LoadingOverlay
            open={carbonatedLoading}
            message="탄산 정보를 불러오는 중..."
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
                placeholder="비터스 검색..."
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

          {/* 탄산 리스트 */}
          <ItemList>
            {isSearching ? (
                <SearchLoadingOverlay
                    open={isSearching}
                    message="검색 중..."
                />
            ) : (
                carbonatedList?.data && carbonatedList.data.map((carbonated, index) => (
                    <CarbonatedListComponent
                        key={`${carbonated.carbonatedId}-${index}`}
                        data={carbonated}
                        index={index}
                        onClickEvent={() => fetchReadCarbonated(carbonated.carbonatedId)}
                    />
                ))
            )}
          </ItemList>

          {/* 추가 로딩 중 (무한 스크롤) */}
          {carbonatedListLoadingMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={48} />
              </Box>
          )}

          {/* 리스트 끝 메시지 */}
          {!isSearching && !carbonatedListHasMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  모든 탄산 음료를 확인했습니다 🍸
                </Typography>
              </Box>
          )}
        </Container>

        {/* 탄산 상세 모달 */}
        {carbonated?.data && (
            <CarbonatedDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={carbonated.data}
            />
        )}
      </PageContainer>
  );
}

export default CarbonatedListPage;

