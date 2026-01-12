import {useState} from "react";
import {api} from "../../../../../axios/AxiosConfig.ts";
import type {JuiceDetail} from "../interface/JuiceDetail.ts";

const useReadJuice = () => {
  const [data, setData] = useState<JuiceDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadJuice = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: JuiceDetail}>(`/api/juice/${id}`);

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
    juice: data,
    juiceLoading: loading,
    juiceError: error,
    fetchReadJuice
  };
}

export default useReadJuice;