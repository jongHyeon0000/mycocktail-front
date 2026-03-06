import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {OtherIngredientsDetail} from "../interface/OtherIngredientsDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadOtherIngredients = () => {
  const [response, setResponse] = useState<ApiResponse<OtherIngredientsDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadOtherIngredients = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<OtherIngredientsDetail>>(`/api/other-ingredients/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    otherIngredients: response,
    otherIngredientsLoading: loading,
    fetchReadOtherIngredients
  };
}

export default useReadOtherIngredients;
