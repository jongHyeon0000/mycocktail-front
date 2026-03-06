import {useState} from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

interface FetchProps {
  /*
  * 무한 스크롤
  * */
  page?: number;        // 페이지 번호 (기본: 1)
  limit?: number;       // 한 번에 가져올 항목 수 (기본: 20)

  /*
  * 정렬
  * */
  sort?: "recent" | "popular" | "name";
  order?: "asc" | "desc";   // 정렬 순서 (기본: desc)

  /*
  * 검색
  * */
  search?: string;      // 검색어
  userId?: number;      // 유저id (해당하는 유저의 글만 검색)
}

const useReadCocktailList = () => {
  const [response, setResponse] = useState<ApiResponse<CocktailDetail[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadCocktailList = async (params?: FetchProps, appendData = false) => {
    if (appendData) {
      setLoadingMore(true);
    } else {
      setResponse(undefined);
      setHasMore(true);
      setLoading(true);
    }

    try {
      const res = await api.get<ApiResponse<CocktailDetail[]>>(`/api/cocktail`, { params });
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
    cocktailList: response,
    cocktailListLoading: loading,
    cocktailListLoadingMore: loadingMore,
    cocktailListHasMore: hasMore,
    fetchReadCocktailList
  };
}

export default useReadCocktailList;
