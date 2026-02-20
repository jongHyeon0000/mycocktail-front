import {useState} from "react";
import {api} from "../../../../../axios/AxiosConfig.ts";
import type {SyrupDetail} from "../interface/SyrupDetail.ts";

const useReadSyrup = () => {
  const [data, setData] = useState<SyrupDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadSyrup = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: SyrupDetail}>(`/api/syrup/${id}`);

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
    syrup: data,
    syrupLoading: loading,
    syrupError: error,
    fetchReadSyrup
  };
}

export default useReadSyrup;