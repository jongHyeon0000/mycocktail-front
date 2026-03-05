import { useState } from "react";
import { api } from "../../../../config/axios/AxiosConfig.ts";
import type { ApiResponse } from "../../../../config/axios/interface/ApiResponse.ts";
import type { UserInfo } from "../interface/UserInfo.ts";

const useUpdateUserInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdateUserInfo = async (body: UserInfo) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<ApiResponse<UserInfo>>('/api/userInfo', body);

      if (response.status === 200 && response.data.code === 'OK') {
        return response.data.data;
      } else {
        console.error('Unexpected response:', response.status, response.data.code, response.data.message);
        return null;
      }
    } catch (err) {
      setError('Error updating user info');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUserInfoLoading: loading,
    updateUserInfoError: error,
    fetchUpdateUserInfo,
  };
};

export default useUpdateUserInfo;
