import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {GarnishesDetail} from "../interface/GarnishesDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadGarnishes = () => {
  const [response, setResponse] = useState<ApiResponse<GarnishesDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadGarnishes = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<GarnishesDetail>>(`/api/garnishes/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    garnishes: response,
    garnishesLoading: loading,
    fetchReadGarnishes
  };
}

export default useReadGarnishes;
