import {useState} from "react";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {JuiceDetail} from "../interface/JuiceDetail.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";

const useReadJuice = () => {
  const [data, setData] = useState<JuiceDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadJuice = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<JuiceDetail>>(`/api/juice/${id}`);

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
    juice: data,
    juiceLoading: loading,
    juiceError: error,
    fetchReadJuice
  };
}

export default useReadJuice;