import {useState} from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {api} from "../../../../config/AxiosConfig.ts";

const useReadCocktailList = () => {
  const [data, setData] = useState<CocktailDetail[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadCocktailList = async () => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: CocktailDetail[]}>(`/api/cocktail`);

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