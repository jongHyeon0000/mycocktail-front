import {useState} from "react";
import type {UnifiedIngredient} from "../interface/UnifiedIngredient.ts";
import {api} from "../../../../../axios/AxiosConfig.ts";

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
  username?: string;      // 유저네임 (해당하는 유저의 글만 검색)

  /*
  * 카테고리 필터 (선택사항)
  * */
  category?: "juice" | "bitters" | "carbonated" | "dairyCream" | "garnishes" | "syrup" | "other";
}

const useReadIngredientList = () => {
  const [data, setData] = useState<UnifiedIngredient[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadIngredientList = async (params?: FetchProps, appendData = false) => {
    if (appendData) {
      setLoadingMore(true);
    } else {
      setData(undefined);
      setHasMore(true);
      setLoading(true);
    }

    setError(null);

    try{
      const response = await api.get<{data: UnifiedIngredient[]}>(`/api/ingredients`, { params });

      if (response.status === 200) {
        const newData = response.data.data;
        const limit = params?.limit || 6;

        setHasMore(newData.length >= limit);

        if (appendData && params?.page !== 0 && data) {
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
    ingredientList: data,
    ingredientListLoading: loading,
    ingredientListLoadingMore: loadingMore,
    ingredientListError: error,
    ingredientListHasMore: hasMore,
    fetchReadIngredientList
  };
}

export default useReadIngredientList;