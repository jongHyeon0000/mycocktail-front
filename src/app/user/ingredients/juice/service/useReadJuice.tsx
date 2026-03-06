import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {JuiceDetail} from "../interface/JuiceDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadJuice = () => {
  const [response, setResponse] = useState<ApiResponse<JuiceDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadJuice = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<JuiceDetail>>(`/api/juice/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    juice: response,
    juiceLoading: loading,
    fetchReadJuice
  };
}

export default useReadJuice;
