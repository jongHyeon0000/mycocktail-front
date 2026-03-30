import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {TechniqueDetail} from "../interface/TechniqueDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

const useReadTechnique = () => {
  const [response, setResponse] = useState<ApiResponse<TechniqueDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadTechnique = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<TechniqueDetail>>(`/api/technique/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    technique: response,
    techniqueLoading: loading,
    fetchReadTechnique
  };
}

export default useReadTechnique;
