import React, {type SetStateAction, useEffect, useState, useCallback} from "react";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  FormControl,
  Typography, CircularProgress
} from "@mui/material";
import {
  SpiritList,
  ControlsContainer,
  PageContainer,
  SearchField,
  SortSelect
} from "./style/SpiritProductListPage_Style.tsx";
import SpiritProductListComponent from "../component/SpiritProductListComponent.tsx";
import SpiritProductDetailModal from "../component/SpiritProductDetailModal.tsx";
import useReadSpiritProductList from "../service/useReadSpiritProductList.tsx";
import useReadSpiritProduct from "../service/useReadSpiritProduct.tsx";
import {showErrorAlert} from "../../common/utils/AlertUtils.ts";
import LoadingOverlay from "../../common/component/LoadingOverlay.tsx";
import SearchLoadingOverlay from "../component/SearchLoadingOverlay.tsx";

const SpiritProductListPage: React.FC = () => {
  /*
  * 검색 카테고리 (최신순, 가격순, 이름순)
  * */
  type SortOrderType = "recent" | "price" | "name";

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

  const { spiritProduct, spiritProductLoading, spiritProductError, fetchReadSpiritProduct } = useReadSpiritProduct();
  const { spiritProductList, spiritProductListLoading, spiritProductListError, spiritProductListHasMore, spiritProductListLoadingMore, fetchReadSpiritProductList } = useReadSpiritProductList();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadSpiritProductList({
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

      fetchReadSpiritProductList({
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

    fetchReadSpiritProductList({
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
      if (spiritProductListHasMore || !spiritProductListLoading || !spiritProductListLoadingMore) {
        await fetchReadSpiritProductList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          order: "desc",
          sort: sortOrder
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, spiritProductListHasMore, spiritProductListLoading, spiritProductListLoadingMore]);

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
    if (spiritProduct) {
      setModalOpen(true);
    }
  }, [spiritProduct]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (spiritProductListError) {
      showErrorAlert(
          '세부 기주 리스트 로드 실패',
          spiritProductListError
      ).then();
    }

    if (spiritProductError) {
      showErrorAlert(
          '세부 기주 로드 실패',
          spiritProductError
      ).then();
    }
  }, [spiritProductListError, spiritProductError]);

  return (
    <PageContainer>
      {/* 로딩 오버레이 - 초기 로딩시에만 */}
      <LoadingOverlay
          open={spiritProductListLoading && !isSearching}
          message="기주 리스트를 불러오는 중..."
      />
      <LoadingOverlay
          open={spiritProductLoading}
          message="기주 정보를 불러오는 중..."
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
              <MenuItem value="price">가격순</MenuItem>
              <MenuItem value="name">이름순</MenuItem>
            </SortSelect>
          </FormControl>

          {/* 검색창 */}
          <SearchField
            placeholder="술 검색..."
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

        {/* 술 리스트 */}
        <SpiritList>
          {isSearching ? (
            <SearchLoadingOverlay
              open={isSearching}
              message="검색 중..."
            />
          ) : (
            spiritProductList && spiritProductList.map((spirit, index) => (
              <SpiritProductListComponent
                key={`${spirit.spiritProductId}-${index}`}
                spirit={spirit} 
                index={index} 
                onClickEvent={() => fetchReadSpiritProduct(spirit.spiritProductId)}
              />
            ))
          )}
        </SpiritList>

        {/* 무한 스크롤 로딩 인디케이터 */}
        {spiritProductListLoadingMore && (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress size={40} />
              <Typography variant="body2" sx={{ ml: 2 }}>
                더 많은 칵테일을 불러오는 중...
              </Typography>
            </Box>
        )}

        {/* 더 이상 불러올 데이터가 없을 때 */}
        {!isSearching && spiritProductList && spiritProductList.length > 0 && !spiritProductListHasMore && !spiritProductListLoadingMore && (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                모든 술을 불러왔습니다 🥃
              </Typography>
            </Box>
        )}
      </Container>

      {/* 술 상세 모달 */}
      {spiritProduct && (
        <SpiritProductDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={spiritProduct}
        />
      )}
    </PageContainer>
  );
};

export default SpiritProductListPage;