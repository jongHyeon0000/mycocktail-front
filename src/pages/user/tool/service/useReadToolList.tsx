import {useState} from "react";
import {api} from "../../../../config/AxiosConfig.ts";
import type {ToolDetail} from "../interface/ToolDetail.ts";
import type {TOOL_CATEGORY_MAP_KEY} from "../common/ToolUtils.ts";

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
  categorySort?: TOOL_CATEGORY_MAP_KEY | "all";   // 정렬 순서 (기본: desc)
  order?: "asc" | "desc";   // 정렬 순서 (기본: desc)

  /*
  * 검색
  * */
  search?: string;      // 검색어
}

const useReadToolList = () => {
  const [data, setData] = useState<ToolDetail[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadToolList = async (params?: FetchProps, appendData = false) => {
    // 첫 페이지 요청이거나 appendData가 false인 경우 데이터 리셋
    if (appendData) {
      setLoadingMore(true);
    } else {
      setData(undefined);
      setHasMore(true);
      setLoading(true);
    }

    setError(null);

    try{
      const response = await api.get<{data: ToolDetail[]}>(`/api/tool`, { params });

      if (response.status === 200) {
        const newData = response.data.data;
        const limit = params?.limit || 6;
        
        // 받은 데이터가 limit보다 적으면 더 이상 없음
        setHasMore(newData.length >= limit);
        
        if (appendData && params?.page !== 1 && data) {
          setData([...data, ...newData]);
        } else {
          setData(newData);
        }
      } else {
        console.error('Unexpected response status:', response.status);
      }

    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  return {
    toolList: data,
    toolListLoading: loading,
    toolListLoadingMore: loadingMore,
    toolListError: error,
    toolListHasMore: hasMore,
    fetchReadToolList
  };
}

export default useReadToolList;