import {useState} from "react";
import {api} from "../../../../../axios/AxiosConfig.ts";
import type {OtherIngredientsDetail} from "../interface/OtherIngredientsDetail.ts";

const useReadOtherIngredients = () => {
  const [data, setData] = useState<OtherIngredientsDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadOtherIngredients = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: OtherIngredientsDetail}>(`/api/other-ingredients/${id}`);

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
    otherIngredients: data,
    otherIngredientsLoading: loading,
    otherIngredientsError: error,
    fetchReadOtherIngredients
  };
}

export default useReadOtherIngredients;