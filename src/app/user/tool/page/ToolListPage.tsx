import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  FormControl,
  Typography, CircularProgress
} from "@mui/material";
import ToolListComponent from "../component/ToolListComponent.tsx";
import ToolDetailModal from "../component/ToolDetailModal.tsx";
import useReadToolList from "../service/useReadToolList.tsx";
import useReadTool from "../service/useReadTool.tsx";
import {showErrorAlert} from "../../common/utils/AlertUtils.ts";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";
import type {TOOL_CATEGORY_MAP_KEY} from "../common/ToolUtils.ts";
import SearchLoadingOverlay from "../../common/component/loading/SearchLoadingOverlay.tsx";
import {
  ControlsContainer,
  ItemList,
  PageContainer,
  SearchField,
  SortContainer,
  SortSelect,
} from "../../common/style/CommonListPage.style.tsx";

const ToolListPage: React.FC = () => {
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
  const [ secondSortOrder, setSecondSortOrder ] = useState<TOOL_CATEGORY_MAP_KEY | "all">("all");
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ searchKeyword, setSearchKeyword ] = useState<string>("");
  const [ searchDebounceTimer, setSearchDebounceTimer ] = useState<number | null>(null);
  const [ isSearching, setIsSearching ] = useState<boolean>(false);

  const { toolList, toolListLoading, toolListError, toolListHasMore, toolListLoadingMore, fetchReadToolList } = useReadToolList();
  const { tool, toolLoading, toolError, fetchReadTool } = useReadTool();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadToolList({
      page: 1,
      limit: PAGE_SIZE,
      order: "desc",
      sort: sortOrder,
      categorySort: secondSortOrder,
      search: searchKeyword.trim() || undefined
    });
  }, [sortOrder, secondSortOrder]);

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

      fetchReadToolList({
        page: 1,
        limit: PAGE_SIZE,
        order: "desc",
        sort: sortOrder,
        categorySort: secondSortOrder,
        search: keyword.trim() || undefined
      }).finally(() => {
        setIsSearching(false);
      });
    }, 250);
    
    setSearchDebounceTimer(newTimer);
  }, [sortOrder, secondSortOrder, searchDebounceTimer]);

  /*
  * 검색어 초기화 핸들러
  * */
  const handleSearchClear = useCallback(() => {
    setSearchKeyword("");
    setCurrentPage(1);
    setIsSearching(true);

    fetchReadToolList({
      page: 1,
      limit: PAGE_SIZE,
      order: "desc",
      sort: sortOrder,
      categorySort: secondSortOrder
    }).finally(() => {
      setIsSearching(false);
    });
  }, [sortOrder, secondSortOrder]);

  /*
  * 무한 스크롤 이벤트 핸들러 - 추가 데이터 로드
  * */
  const handleScroll = useCallback(async () => {
    // 현재 스크롤 위치 + 뷰포트 높이가 전체 문서 높이에서 100px 이내에 도달하면 로드
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      if (toolListHasMore && !toolListLoading && !toolListLoadingMore) {
        await fetchReadToolList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          categorySort: secondSortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, secondSortOrder, searchKeyword, toolListHasMore, toolListLoading, toolListLoadingMore]);

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
    if (tool) {
      setModalOpen(true);
    }
  }, [tool]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (toolListError) {
      showErrorAlert(
          '세부 도구 리스트 로드 실패',
          toolListError
      ).then();
    }

    if (toolError) {
      showErrorAlert(
          '세부 도구 로드 실패',
          toolError
      ).then();
    }
  }, [toolListError, toolError]);

  return (
    <PageContainer>
      {/* 로딩 오버레이 - 초기 로딩시에만 */}
      <LoadingOverlay
          open={toolListLoading && !isSearching}
          message="도구 리스트를 불러오는 중..."
      />
      <LoadingOverlay
          open={toolLoading}
          message="도구 정보를 불러오는 중..."
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

            <FormControl size="small">
              <SortSelect
                  value={secondSortOrder}
                  onChange={(e) => setSecondSortOrder(e.target.value as SetStateAction<TOOL_CATEGORY_MAP_KEY | "all">)}
              >
                <MenuItem value="all">전체</MenuItem>
                <MenuItem value="shaker">셰이커</MenuItem>
                <MenuItem value="strainer">스트레이너</MenuItem>
                <MenuItem value="measuring">계량 도구</MenuItem>
                <MenuItem value="mixing">믹싱 도구</MenuItem>
                <MenuItem value="muddling">머들링 도구</MenuItem>
                <MenuItem value="garnish">가니쉬 도구</MenuItem>
                <MenuItem value="other">기타</MenuItem>
              </SortSelect>
            </FormControl>
          </SortContainer>

          {/* 검색창 */}
          <SearchField
            placeholder="도구 검색..."
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

        {/* 도구 리스트 */}
        <ItemList>
          {isSearching ? (
            <SearchLoadingOverlay
              open={isSearching}
              message="검색 중..."
            />
          ) : (
            toolList && toolList.map((tool, index) => (
              <ToolListComponent
                key={`${tool.toolId}-${index}`}
                tool={tool}
                index={index}
                onClickEvent={() => fetchReadTool(tool.toolId)}
              />
            ))
          )}
        </ItemList>

        {/* 추가 로딩 중 (무한 스크롤) */}
        {toolListLoadingMore && (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress size={48} />
            </Box>
        )}

        {/* 리스트 끝 메시지 */}
        {!isSearching && !toolListHasMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              모든 바 도구를 확인했습니다 🍸
            </Typography>
          </Box>
        )}
      </Container>

      {/* 도구 상세 모달 */}
      {tool && (
        <ToolDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={tool}
        />
      )}
    </PageContainer>
  );
};

export default ToolListPage;

