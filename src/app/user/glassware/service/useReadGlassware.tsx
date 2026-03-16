import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {GlasswareDetail} from "../interface/GlasswareDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

const useReadGlassware = () => {
  const [response, setResponse] = useState<ApiResponse<GlasswareDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadGlassware = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<GlasswareDetail>>(`/api/glassware/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    glassware: response,
    glasswareLoading: loading,
    fetchReadGlassware
  };
}

export default useReadGlassware;
