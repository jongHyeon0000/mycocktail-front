import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import {showErrorAlert} from "../../../common/utils/AlertUtils.ts";
import useReadBittersList from "../service/useReadBittersList.tsx";
import useReadBitters from "../service/useReadBitters.tsx";
import LoadingOverlay from "../../../common/component/loading/LoadingOverlay.tsx";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import SearchLoadingOverlay from "../../../common/component/loading/SearchLoadingOverlay.tsx";
import styled from "styled-components";
import BittersListComponent from "../component/BittersListComponent.tsx";
import BittersDetailModal from "../component/BittersDetailModal.tsx";

const BittersListPage: React.FC = () => {
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

  const { bitters, bittersLoading, fetchReadBitters, bittersError } = useReadBitters();
  const { bittersListError, bittersListLoading, bittersListLoadingMore, bittersListHasMore, bittersList, fetchReadBittersList } = useReadBittersList();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadBittersList({
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

      fetchReadBittersList({
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

    fetchReadBittersList({
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
      if (bittersListHasMore && !bittersListLoading && !bittersListLoadingMore) {
        await fetchReadBittersList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, bittersListHasMore, bittersListLoading, bittersListLoadingMore]);

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
    if (bitters) {
      setModalOpen(true);
    }
  }, [bitters]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (bittersListError) {
      showErrorAlert(
          '비터스 리스트 로드 실패',
          bittersListError
      ).then();
    }

    if (bittersError) {
      showErrorAlert(
          '비터스 로드 실패',
          bittersError
      ).then();
    }
  }, [bittersListError, bittersError]);

  return (
      <PageContainer>
        {/* 로딩 오버레이 - 초기 로딩시에만 */}
        <LoadingOverlay
            open={bittersListLoading && !isSearching}
            message="비터스 리스트를 불러오는 중..."
        />
        <LoadingOverlay
            open={bittersLoading}
            message="비터스 정보를 불러오는 중..."
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

          {/* 기법 리스트 */}
          <BittersList>
            {isSearching ? (
                <SearchLoadingOverlay
                    open={isSearching}
                    message="검색 중..."
                />
            ) : (
                bittersList && bittersList.map((bitters, index) => (
                    <BittersListComponent
                        key={`${bitters.bittersId}-${index}`}
                        data={bitters}
                        index={index}
                        onClickEvent={() => fetchReadBitters(bitters.bittersId)}
                    />
                ))
            )}
          </BittersList>

          {/* 추가 로딩 중 (무한 스크롤) */}
          {bittersListLoadingMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress size={48} />
              </Box>
          )}

          {/* 리스트 끝 메시지 */}
          {!isSearching && !bittersListHasMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  모든 비터스를 확인했습니다 🍸
                </Typography>
              </Box>
          )}
        </Container>

        {/* 기법 상세 모달 */}
        {bitters && (
            <BittersDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={bitters}
            />
        )}
      </PageContainer>
  );
}

export default BittersListPage;

const PageContainer = styled(Box)`
    && {
        min-height: 100vh;
        background-color: #f5f5f5;
        padding-top: 96px;
    }
`;

const ControlsContainer = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    gap: 16px;
    
    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
`;

const SortContainer = styled(Box)`
  && {
    display: flex;
    gap: 12px;
    align-items: center;
  }
`;

const SortSelect = styled(Select)`
  && {
    background-color: #fff;
    border-radius: 16px;
    min-width: 150px;
    
    .MuiOutlinedInput-notchedOutline {
      border-color: #eee;
    }
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #ddd;
    }
  }
`;

const SearchField = styled(TextField)`
  && {
    width: 300px;
    background-color: #fff;
    
    .MuiOutlinedInput-root {
      border-radius: 16px;
      
      &:hover fieldset {
        border-color: #ddd;
      }
      
      &.Mui-focused fieldset {
        border-color: #888;
      }
    }
    
    & fieldset {
      border-color: #eee;
    }
    
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

const BittersList = styled(Box)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;