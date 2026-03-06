import {useState} from "react";
import type {BittersDetail} from "../interface/BittersDetail.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

interface FetchProps {
  /*
  * 무한 스크롤
  * */
  page?: number;        // 페이지 번호 (기본: 1)
  limit?: number;       // 한 번에 가져올 항목 수 (기본: 20)

  /*
  * 정렬
  * */
  sort?: "recent" | "name";
  order?: "asc" | "desc";   // 정렬 순서 (기본: desc)

  /*
  * 검색
  * */
  search?: string;      // 검색어
}

const useReadBittersList = () => {
  const [response, setResponse] = useState<ApiResponse<BittersDetail[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadBittersList = async (params?: FetchProps, appendData = false) => {
    if (appendData) {
      setLoadingMore(true);
    } else {
      setResponse(undefined);
      setHasMore(true);
      setLoading(true);
    }

    try {
      const res = await api.get<ApiResponse<BittersDetail[]>>(`/api/bitters`, { params });
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
    bittersList: response,
    bittersListLoading: loading,
    bittersListLoadingMore: loadingMore,
    bittersListHasMore: hasMore,
    fetchReadBittersList
  };
}

export default useReadBittersList;
