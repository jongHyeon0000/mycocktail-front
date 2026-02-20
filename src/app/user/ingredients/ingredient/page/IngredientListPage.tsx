import React, {type SetStateAction, useCallback, useEffect, useState} from "react";
import useReadIngredientList from "../service/useReadIngredientList.tsx";
import useReadJuice from "../../juice/service/useReadJuice.tsx";
import useReadBitters from "../../bitters/service/useReadBitters.tsx";
import useReadCarbonated from "../../carbonated/service/useReadCarbonated.tsx";
import useReadDairyCream from "../../dairy_cream/service/useReadDairyCream.tsx";
import useReadGarnishes from "../../garnishes/service/useReadGarnishes.tsx";
import useReadSyrup from "../../syrup/service/useReadSyrup.tsx";
import useReadOtherIngredients from "../../other_ingredients/service/useReadOtherIngredients.tsx";
import {showErrorAlert} from "../../../common/utils/AlertUtils.ts";
import LoadingOverlay from "../../../common/component/loading/LoadingOverlay.tsx";
import {Box, Container, FormControl, InputAdornment, MenuItem, Select, TextField, Typography} from "@mui/material";
import SearchLoadingOverlay from "../../../common/component/loading/SearchLoadingOverlay.tsx";
import styled from "styled-components";
import IngredientListComponent from "../component/IngredientListComponent.tsx";
import JuiceDetailModal from "../../juice/component/JuiceDetailModal.tsx";
import BittersDetailModal from "../../bitters/component/BittersDetailModal.tsx";
import CarbonatedDetailModal from "../../carbonated/component/CarbonatedDetailModal.tsx";
import DairyCreamDetailModal from "../../dairy_cream/component/DairyCreamDetailModal.tsx";
import GarnishesDetailModal from "../../garnishes/component/GarnishesDetailModal.tsx";
import SyrupDetailModal from "../../syrup/component/SyrupDetailModal.tsx";
import OtherIngredientsDetailModal from "../../other_ingredients/component/OtherIngredientsDetailModal.tsx";
import type {UnifiedIngredient} from "../interface/UnifiedIngredient.ts";

const IngredientListPage: React.FC = () => {
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
  const [ selectedType, setSelectedType ] = useState<string>('');
  const [ searchKeyword, setSearchKeyword ] = useState<string>("");
  const [ searchDebounceTimer, setSearchDebounceTimer ] = useState<number | null>(null);
  const [ isSearching, setIsSearching ] = useState<boolean>(false);

  // 통합 재료 리스트 hook
  const { ingredientList, ingredientListError, ingredientListLoading, ingredientListLoadingMore, ingredientListHasMore, fetchReadIngredientList } = useReadIngredientList();

  // 각 타입별 detail hook
  const { juice, juiceError, juiceLoading, fetchReadJuice } = useReadJuice();
  const { bitters, bittersError, bittersLoading, fetchReadBitters } = useReadBitters();
  const { carbonated, carbonatedError, carbonatedLoading, fetchReadCarbonated } = useReadCarbonated();
  const { dairyCream, dairyCreamError, dairyCreamLoading, fetchReadDairyCream } = useReadDairyCream();
  const { garnishes, garnishesError, garnishesLoading, fetchReadGarnishes } = useReadGarnishes();
  const { syrup, syrupError, syrupLoading, fetchReadSyrup } = useReadSyrup();
  const { otherIngredients, otherIngredientsError, otherIngredientsLoading, fetchReadOtherIngredients } = useReadOtherIngredients();

  /*
  * 초기 데이터 로드 및 정렬 변경 시 로드
  * */
  useEffect(() => {
    fetchReadIngredientList({
      page: 1,
      limit: PAGE_SIZE,
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

      fetchReadIngredientList({
        page: 1,
        limit: PAGE_SIZE,
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

    fetchReadIngredientList({
      page: 1,
      limit: PAGE_SIZE,
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
      if (ingredientListHasMore && !ingredientListLoading && !ingredientListLoadingMore) {
        await fetchReadIngredientList({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          sort: sortOrder,
          search: searchKeyword.trim() || undefined
        }, true);

        setCurrentPage(currentPage + 1);
      }
    }
  }, [currentPage, sortOrder, searchKeyword, ingredientListHasMore, ingredientListLoading, ingredientListLoadingMore]);

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
  * 재료 클릭 핸들러 - type별 분기
  * */
  const handleIngredientClick = (item: UnifiedIngredient) => {
    setSelectedType(item.type);

    switch(item.type) {
      case 'juice':
        fetchReadJuice(item.juiceId);
        break;
      case 'bitters':
        fetchReadBitters(item.bittersId);
        break;
      case 'carbonated':
        fetchReadCarbonated(item.carbonatedId);
        break;
      case 'dairyCream':
        fetchReadDairyCream(item.dairyCreamId);
        break;
      case 'garnishes':
        fetchReadGarnishes(item.garnishId);
        break;
      case 'syrup':
        fetchReadSyrup(item.syrupId);
        break;
      case 'other':
        fetchReadOtherIngredients(item.otherIngredientId);
        break;
    }
  };

  /*
  * Modal State 제어
  * */
  useEffect(() => {
    if (juice || bitters || carbonated || dairyCream || garnishes || syrup || otherIngredients) {
      setModalOpen(true);
    }
  }, [juice, bitters, carbonated, dairyCream, garnishes, syrup, otherIngredients]);

  /*
  * Axios Error 제어
  * */
  useEffect(() => {
    if (ingredientListError) {
      showErrorAlert('재료 리스트 로드 실패', ingredientListError).then();
    }
    if (juiceError) {
      showErrorAlert('주스 로드 실패', juiceError).then();
    }
    if (bittersError) {
      showErrorAlert('비터스 로드 실패', bittersError).then();
    }
    if (carbonatedError) {
      showErrorAlert('탄산류 로드 실패', carbonatedError).then();
    }
    if (dairyCreamError) {
      showErrorAlert('유제품 로드 실패', dairyCreamError).then();
    }
    if (garnishesError) {
      showErrorAlert('가니쉬 로드 실패', garnishesError).then();
    }
    if (syrupError) {
      showErrorAlert('시럽 로드 실패', syrupError).then();
    }
    if (otherIngredientsError) {
      showErrorAlert('기타 첨가물 로드 실패', otherIngredientsError).then();
    }
  }, [ingredientListError, juiceError, bittersError, carbonatedError, dairyCreamError, garnishesError, syrupError, otherIngredientsError]);

  return (
      <PageContainer>
        {/* 로딩 오버레이 - 초기 로딩시에만 */}
        <LoadingOverlay
            open={ingredientListLoading && !isSearching}
            message="재료 리스트를 불러오는 중..."
        />
        <LoadingOverlay
            open={juiceLoading || bittersLoading || carbonatedLoading || dairyCreamLoading || garnishesLoading || syrupLoading || otherIngredientsLoading}
            message="재료 정보를 불러오는 중..."
        />

        <Container maxWidth="lg">
          {/* 상단 컨트롤 영역 */}
          <ControlsContainer>
            {/* 정렬 드롭다운 */}
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
                placeholder="재료 검색..."
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

          {/* 재료 리스트 */}
          <IngredientList>
            {isSearching ? (
                <SearchLoadingOverlay
                    open={isSearching}
                    message="검색 중..."
                />
            ) : (
                ingredientList && ingredientList.map((ingredient, index) => (
                    <IngredientListComponent
                        key={`${ingredient.type}-${index}`}
                        data={ingredient}
                        index={index}
                        onClickEvent={() => handleIngredientClick(ingredient)}
                    />
                ))
            )}
          </IngredientList>

          {/* 리스트 끝 메시지 */}
          {!isSearching && !ingredientListHasMore && (
              <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  모든 재료를 확인했습니다 🍸
                </Typography>
              </Box>
          )}
        </Container>

        {/* type별 DetailModal 렌더링 */}
        {juice && selectedType === 'juice' && (
            <JuiceDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={juice}
            />
        )}
        {bitters && selectedType === 'bitters' && (
            <BittersDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={bitters}
            />
        )}
        {carbonated && selectedType === 'carbonated' && (
            <CarbonatedDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={carbonated}
            />
        )}
        {dairyCream && selectedType === 'dairyCream' && (
            <DairyCreamDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={dairyCream}
            />
        )}
        {garnishes && selectedType === 'garnishes' && (
            <GarnishesDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={garnishes}
            />
        )}
        {syrup && selectedType === 'syrup' && (
            <SyrupDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={syrup}
            />
        )}
        {otherIngredients && selectedType === 'other' && (
            <OtherIngredientsDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                data={otherIngredients}
            />
        )}
      </PageContainer>
  );
}

export default IngredientListPage;

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

const IngredientList = styled(Box)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;