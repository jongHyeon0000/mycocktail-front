import {useState} from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

const useReadCocktailRandom = () => {
  const [response, setResponse] = useState<ApiResponse<CocktailDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadCocktailRandom = async () => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<CocktailDetail>>(`/api/cocktail/random`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    randomCocktail: response,
    randomCocktailLoading: loading,
    fetchReadCocktailRandom
  };
}

export default useReadCocktailRandom;
