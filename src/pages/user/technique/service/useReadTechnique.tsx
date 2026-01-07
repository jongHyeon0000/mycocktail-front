import {useState} from "react";
import {api} from "../../../../config/AxiosConfig.ts";
import type {TechniqueDetail} from "../interface/TechniqueDetail.ts";

const useReadTechnique = () => {
  const [data, setData] = useState<TechniqueDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadTechnique = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: TechniqueDetail}>(`/api/technique/${id}`);

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
    technique: data,
    techniqueLoading: loading,
    techniqueError: error,
    fetchReadTechnique
  };
}

export default useReadTechnique;