import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {GlasswareDetail} from "../interface/GlasswareDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";

const useReadGlassware = () => {
  const [data, setData] = useState<GlasswareDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadGlassware = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<GlasswareDetail>>(`/api/glassware/${id}`);

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
    glassware: data,
    glasswareLoading: loading,
    glasswareError: error,
    fetchReadGlassware
  };
}

export default useReadGlassware;