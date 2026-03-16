import { useState } from "react";
import { api } from "../../../../config/axios/AxiosConfig.ts";
import type { ApiResponse } from "../../../../config/axios/interface/ApiResponse.ts";
import { toApiResponse } from "../../../../config/axios/utils/toApiResponse.ts";

interface LikeResponse {
  likeCount: number;
}

const useIncrementLike = () => {
  const [response, setResponse] = useState<ApiResponse<LikeResponse | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchIncrementLike = async (cocktailId: number) => {
    setLoading(true);
    try {
      const res = await api.post<ApiResponse<LikeResponse>>(`/api/cocktail/${cocktailId}/like`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    incrementLikeResponse: response,
    incrementLikeLoading: loading,
    fetchIncrementLike,
  };
};

export default useIncrementLike;
