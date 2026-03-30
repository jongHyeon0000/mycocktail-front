import {useState} from "react";
import type {BittersDetail} from "../interface/BittersDetail.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadBitters = () => {
  const [response, setResponse] = useState<ApiResponse<BittersDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadBitters = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<BittersDetail>>(`/api/bitters/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    bitters: response,
    bittersLoading: loading,
    fetchReadBitters
  };
}

export default useReadBitters;
