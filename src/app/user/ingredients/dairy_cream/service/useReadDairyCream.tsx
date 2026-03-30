import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {DairyCreamDetail} from "../interface/DairyCreamDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadDairyCream = () => {
  const [response, setResponse] = useState<ApiResponse<DairyCreamDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadDairyCream = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<DairyCreamDetail>>(`/api/dairy-cream/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    dairyCream: response,
    dairyCreamLoading: loading,
    fetchReadDairyCream
  };
}

export default useReadDairyCream;
