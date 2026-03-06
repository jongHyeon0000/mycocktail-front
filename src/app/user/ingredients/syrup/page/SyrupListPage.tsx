import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import useReadSyrupList from "../service/useReadSyrupList.tsx";
import useReadSyrup from "../service/useReadSyrup.tsx";
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
import SyrupListComponent from "../component/SyrupListComponent.tsx";
import SyrupDetailModal from "../component/SyrupDetailModal.tsx";

const SyrupListPage: React.FC = () => {
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

  const { syrup, syrupError, syrupLoading, fetchReadSyrup } = useReadSyrup();
  const { syrupListError, syrupListHasMore, syrupListLoading, syrupListLoadingMore, syrupList, fetchReadSyrupList } = useReadSyrupList();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadSyrupList({
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

      fetchReadSyrupList({
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

    fetchReadSyrupList({
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
      if (syrupListHasMore && !syrupListLoading && !syrupListLoadingMore) {
        await fetchReadSyrupList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, syrupListHasMore, syrupListLoading, syrupListLoadingMore]);

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
    if (syrup) {
      setModalOpen(true);
    }
  }, [syrup]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (syrupListError) {
      showErrorAlert(
          '시럽 리스트 로드 실패',
          syrupListError
      ).then();
    }

    if (syrupError) {
      showErrorAlert(
          '시럽 로드 실패',
          syrupError
      ).then();
    }
  }, [syrupListError, syrupError]);

  return (
      <PageContainer>
        {/* 로딩 오버레이 - 초기 로딩시에만 */}
        <LoadingOverlay
            open={syrupListLoading && !isSearching}
            message="시럽 리스트를 불러오는 중..."
        />
        <LoadingOverlay
            open={syrupLoading}
            message="시럽 정보를 불러오는 중..."
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
                placeholder="시럽 검색..."
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

          {/* 시럽 리스트 */}
          <ItemList>
            {isSearching ? (
                <SearchLoadingOverlay
                    open={isSearching}
                    message="검색 중..."
                />
            ) : (
                syrupList && syrupList.map((syrup, index) => (
                    <SyrupListComponent
                        key={`${syrup.syrupId}-${index}`}
                        data={syrup}
                        index={index}
                        onClickEvent={() => fetchReadSyrup(syrup.syrupId)}
                    />
                ))
            )}
          </ItemList>

          {/* 리스트 끝 메시지 */}
          {!isSearching && !syrupListHasMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  모든 시럽을 확인했습니다 🍸
                </Typography>
              </Box>
          )}
        </Container>

        {/* 추가 로딩 중 (무한 스크롤) */}
        {syrupListLoadingMore && (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress size={48} />
            </Box>
        )}

        {/* 시럽 상세 모달 */}
        {syrup && (
            <SyrupDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={syrup}
            />
        )}
      </PageContainer>
  );
}

export default SyrupListPage;
