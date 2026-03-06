import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {SyrupDetail} from "../interface/SyrupDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadSyrup = () => {
  const [response, setResponse] = useState<ApiResponse<SyrupDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadSyrup = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<SyrupDetail>>(`/api/syrup/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    syrup: response,
    syrupLoading: loading,
    fetchReadSyrup
  };
}

export default useReadSyrup;
