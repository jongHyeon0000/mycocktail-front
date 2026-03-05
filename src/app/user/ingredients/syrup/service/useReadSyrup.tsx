import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {SyrupDetail} from "../interface/SyrupDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";

const useReadSyrup = () => {
  const [data, setData] = useState<SyrupDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadSyrup = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<SyrupDetail>>(`/api/syrup/${id}`);

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
    syrup: data,
    syrupLoading: loading,
    syrupError: error,
    fetchReadSyrup
  };
}

export default useReadSyrup;