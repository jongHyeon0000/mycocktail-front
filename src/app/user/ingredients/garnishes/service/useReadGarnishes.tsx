import {useState} from "react";
import {api} from "../../../../../axios/AxiosConfig.ts";
import type {GarnishesDetail} from "../interface/GarnishesDetail.ts";

const useReadGarnishes = () => {
  const [data, setData] = useState<GarnishesDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadGarnishes = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: GarnishesDetail}>(`/api/garnishes/${id}`);

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
    garnishes: data,
    garnishesLoading: loading,
    garnishesError: error,
    fetchReadGarnishes
  };
}

export default useReadGarnishes;