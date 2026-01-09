import {useState} from "react";
import type {BittersDetail} from "../interface/BittersDetail.ts";
import {api} from "../../../../../config/AxiosConfig.ts";

const useReadBitters = () => {
  const [data, setData] = useState<BittersDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadBitters = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: BittersDetail}>(`/api/bitters/${id}`);

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
    bitters: data,
    bittersLoading: loading,
    bittersError: error,
    fetchReadBitters
  };
}

export default useReadBitters;