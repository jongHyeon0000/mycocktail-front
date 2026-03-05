import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ToolDetail} from "../interface/ToolDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";

const useReadTool = () => {
  const [data, setData] = useState<ToolDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadTool = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<ToolDetail>>(`/api/tool/${id}`);

      if (response.status === 200 && response.data.code === 'OK') {
        setData(response.data.data);
      } else {
        console.error('Unexpected response:', response.status, response.data.code, response.data.message);
      }

    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    tool: data,
    toolLoading: loading,
    toolError: error,
    fetchReadTool
  };
}

export default useReadTool;