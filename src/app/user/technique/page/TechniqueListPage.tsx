import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import useReadTechniqueList from "../service/useReadTechniqueList.tsx";
import useReadTechnique from "../service/useReadTechnique.tsx";
import CommonErrorSnackbar from "../../common/component/snackbar/CommonErrorSnackbar";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";
import {
  ControlsContainer,
  ItemList,
  PageContainer,
  SearchField,
  SortContainer,
  SortSelect,
} from "../../common/style/CommonListPage.style.tsx";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  Typography
} from "@mui/material";
import SearchLoadingOverlay from "../../common/component/loading/SearchLoadingOverlay.tsx";
import TechniqueListComponent from "../component/TechniqueListComponent.tsx";
import TechniqueDetailModal from "../component/TechniqueDetailModal.tsx";

const TechniqueListPage: React.FC = () => {
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

  const { techniqueList, techniqueListLoading, techniqueListLoadingMore, techniqueListHasMore, fetchReadTechniqueList } = useReadTechniqueList();
  const { technique, techniqueLoading, fetchReadTechnique } = useReadTechnique();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadTechniqueList({
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

      fetchReadTechniqueList({
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

    fetchReadTechniqueList({
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
      if (techniqueListHasMore && !techniqueListLoading && !techniqueListLoadingMore) {
        await fetchReadTechniqueList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, techniqueListHasMore, techniqueListLoading, techniqueListLoadingMore]);

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
    if (technique?.data) {
      setModalOpen(true);
    }
  }, [technique]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (techniqueList && techniqueList.code !== 'OK') {
      setSnackbarMessage(techniqueList.message);
      setSnackbarOpen(true);
    }
  }, [techniqueList]);

  useEffect(() => {
    if (technique && technique.code !== 'OK') {
      setSnackbarMessage(technique.message);
      setSnackbarOpen(true);
    }
  }, [technique]);

  return (
    <PageContainer>
      {/* 로딩 오버레이 - 초기 로딩시에만 */}
      <LoadingOverlay
        open={techniqueListLoading && !isSearching}
        message="기법 리스트를 불러오는 중..."
      />
      <LoadingOverlay
        open={techniqueLoading}
        message="기법 정보를 불러오는 중..."
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
              placeholder="기법 검색..."
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

        {/* 기법 리스트 */}
        <ItemList>
          {isSearching ? (
            <SearchLoadingOverlay
              open={isSearching}
              message="검색 중..."
            />
          ) : (
            techniqueList?.data && techniqueList.data.map((technique, index) => (
              <TechniqueListComponent
                key={`${technique.techniqueId}-${index}`}
                technique={technique}
                index={index}
                onClickEvent={() => fetchReadTechnique(technique.techniqueId)}
              />
            ))
          )}
        </ItemList>

        {/* 추가 로딩 중 (무한 스크롤) */}
        {techniqueListLoadingMore && (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress size={48} />
            </Box>
        )}

        {/* 리스트 끝 메시지 */}
        {!isSearching && !techniqueListHasMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              모든 제조 기법을 확인했습니다 🍸
            </Typography>
          </Box>
        )}
      </Container>

      {/* 기법 상세 모달 */}
      {technique?.data && (
        <TechniqueDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={technique.data}
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

export default TechniqueListPage;

