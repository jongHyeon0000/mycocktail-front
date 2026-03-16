import {useState} from "react";
import type {CarbonatedDetail} from "../interface/CarbonatedDetail.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

const useReadCarbonated = () => {
  const [response, setResponse] = useState<ApiResponse<CarbonatedDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadCarbonated = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<CarbonatedDetail>>(`/api/carbonated/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    carbonated: response,
    carbonatedLoading: loading,
    fetchReadCarbonated
  };
}

export default useReadCarbonated;
