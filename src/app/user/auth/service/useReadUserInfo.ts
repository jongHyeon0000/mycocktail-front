import {useState} from "react";
import type {UserInfo} from "../interface/UserInfo.ts";
import {api} from "../../../../config/axios/AxiosConfig.ts";

const useReadUserInfo = () => {
  const [data, setData] = useState<UserInfo | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadUserInfo = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: UserInfo}>(`/api/userInfo/${id}`);

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
    userInfo: data,
    userInfoLoading: loading,
    userInfoError: error,
    fetchReadCocktail: fetchReadUserInfo
  };
}

export default useReadUserInfo;