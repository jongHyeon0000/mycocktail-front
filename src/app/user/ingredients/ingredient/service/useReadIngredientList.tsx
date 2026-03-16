import {useState} from "react";
import type {UnifiedIngredient} from "../interface/UnifiedIngredient.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

interface FetchProps {
  /*
  * 무한 스크롤
  * */
  page?: number;        // 페이지 번호 (기본: 0)
  limit?: number;       // 한 번에 가져올 항목 수 (기본: 6)

  /*
  * 정렬
  * */
  sort?: "recent" | "name";
  order?: "asc" | "desc";   // 정렬 순서 (기본: desc)

  /*
  * 검색
  * */
  search?: string;      // 검색어
  userId?: number;      // 유저id (해당하는 유저의 글만 검색)

  /*
  * 카테고리 필터 (선택사항)
  * */
  category?: "juice" | "bitters" | "carbonated" | "dairyCream" | "garnishes" | "syrup" | "other";
}

const useReadIngredientList = () => {
  const [response, setResponse] = useState<ApiResponse<UnifiedIngredient[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadIngredientList = async (params?: FetchProps, appendData = false) => {
    if (appendData) {
      setLoadingMore(true);
    } else {
      setResponse(undefined);
      setHasMore(true);
      setLoading(true);
    }

    try {
      const res = await api.get<ApiResponse<UnifiedIngredient[]>>(`/api/ingredients`, { params });
      const newApiResponse = res.data;
      const limit = params?.limit || 6;
      setHasMore((newApiResponse.data?.length ?? 0) >= limit);
      setResponse(prev => ({
        ...newApiResponse,
        data: appendData && prev?.data && newApiResponse.data ? [...prev.data, ...newApiResponse.data] : newApiResponse.data,
      }));
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  return {
    ingredientList: response,
    ingredientListLoading: loading,
    ingredientListLoadingMore: loadingMore,
    ingredientListHasMore: hasMore,
    fetchReadIngredientList
  };
}

export default useReadIngredientList;
