import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {TechniqueDetail} from "../interface/TechniqueDetail.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";

const useReadTechnique = () => {
  const [data, setData] = useState<TechniqueDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadTechnique = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<TechniqueDetail>>(`/api/technique/${id}`);

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
    technique: data,
    techniqueLoading: loading,
    techniqueError: error,
    fetchReadTechnique
  };
}

export default useReadTechnique;