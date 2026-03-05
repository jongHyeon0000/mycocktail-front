import {useState} from "react";
import type {BittersDetail} from "../interface/BittersDetail.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";

const useReadBitters = () => {
  const [data, setData] = useState<BittersDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadBitters = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<BittersDetail>>(`/api/bitters/${id}`);

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
    bitters: data,
    bittersLoading: loading,
    bittersError: error,
    fetchReadBitters
  };
}

export default useReadBitters;