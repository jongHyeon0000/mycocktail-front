import {useState} from "react";
import {api} from "../../../../../axios/AxiosConfig.ts";
import type {DairyCreamDetail} from "../interface/DairyCreamDetail.ts";

const useReadDairyCream = () => {
  const [data, setData] = useState<DairyCreamDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadDairyCream = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: DairyCreamDetail}>(`/api/dairy-cream/${id}`);

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        console.error('Unexpected response status:', response.status);
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