import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ToolDetail} from "../interface/ToolDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

const useReadTool = () => {
  const [response, setResponse] = useState<ApiResponse<ToolDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadTool = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<ToolDetail>>(`/api/tool/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    tool: response,
    toolLoading: loading,
    fetchReadTool
  };
}

export default useReadTool;
