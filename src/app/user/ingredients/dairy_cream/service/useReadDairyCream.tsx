import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {DairyCreamDetail} from "../interface/DairyCreamDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";

const useReadDairyCream = () => {
  const [data, setData] = useState<DairyCreamDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadDairyCream = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<DairyCreamDetail>>(`/api/dairy-cream/${id}`);

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
    dairyCream: data,
    dairyCreamLoading: loading,
    dairyCreamError: error,
    fetchReadDairyCream
  };
}

export default useReadDairyCream;