import {useState} from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {api} from "../../../../config/AxiosConfig.ts";

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
}

const useReadCocktailList = () => {
  const [data, setData] = useState<CocktailDetail[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadCocktailList = async (params?: FetchProps) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: CocktailDetail[]}>(`/api/cocktail`, { params });

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        console.error('Unexpected response status:', response.status);
      }

    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    cocktailList: data,
    cocktailListLoading: loading,
    cocktailListError: error,
    fetchReadCocktailList
  };
}

export default useReadCocktailList;