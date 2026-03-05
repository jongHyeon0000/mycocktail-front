import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {OtherIngredientsDetail} from "../interface/OtherIngredientsDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";

const useReadOtherIngredients = () => {
  const [data, setData] = useState<OtherIngredientsDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadOtherIngredients = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<OtherIngredientsDetail>>(`/api/other-ingredients/${id}`);

      if (response.status === 200 && response.data.code === 'OK') {
        setData(response.data.data);
      } else {
        console.error('Unexpected response:', response.status, response.data.code, response.data.message);
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