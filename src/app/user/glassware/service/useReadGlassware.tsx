import {useState} from "react";
import {api} from "../../../../axios/AxiosConfig.ts";
import type {GlasswareDetail} from "../interface/GlasswareDetail.ts";

const useReadGlassware = () => {
  const [data, setData] = useState<GlasswareDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadGlassware = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: GlasswareDetail}>(`/api/glassware/${id}`);

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
    glassware: data,
    glasswareLoading: loading,
    glasswareError: error,
    fetchReadGlassware
  };
}

export default useReadGlassware;