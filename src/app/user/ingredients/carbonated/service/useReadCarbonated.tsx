import {useState} from "react";
import type {CarbonatedDetail} from "../interface/CarbonatedDetail.ts";
import {api} from "../../../../../axios/AxiosConfig.ts";

const useReadCarbonated = () => {
  const [data, setData] = useState<CarbonatedDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadCarbonated = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: CarbonatedDetail}>(`/api/carbonated/${id}`);

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
    carbonated: data,
    carbonatedLoading: loading,
    carbonatedError: error,
    fetchReadCarbonated
  };
}

export default useReadCarbonated;