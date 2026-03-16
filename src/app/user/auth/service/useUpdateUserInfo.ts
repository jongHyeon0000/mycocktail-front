import { useState } from "react";
import { api } from "../../../../config/axios/AxiosConfig.ts";
import type { ApiResponse } from "../../../../config/axios/interface/ApiResponse.ts";
import type { UserInfo } from "../interface/UserInfo.ts";
import { toApiResponse } from "../../../../config/axios/utils/toApiResponse.ts";

const useUpdateUserInfo = () => {
  const [response, setResponse] = useState<ApiResponse<UserInfo | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdateUserInfo = async (body: UserInfo) => {
    setLoading(true);

    try {
      const res = await api.post<ApiResponse<UserInfo>>('/api/userInfo', body);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse<UserInfo>(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUserInfoResponse: response,
    updateUserInfoLoading: loading,
    fetchUpdateUserInfo,
  };
};

export default useUpdateUserInfo;
