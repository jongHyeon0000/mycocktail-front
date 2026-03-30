import {useState} from "react";
import type {UserComment} from "../../../cocktail/interface/UserComment.ts";
import {api} from "../../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../../config/axios/utils/toApiResponse.ts";

interface FetchProps {
  /*
  * 무한 스크롤
  * */
  page?: number;        // 페이지 번호 (기본: 1)
  limit?: number;       // 한 번에 가져올 항목 수 (기본: 15)

  /*
  * 검색
  * */
  search?: string;      // 칵테일명 검색어
  userId?: number;      // 유저 id
}

const useReadReceivedComments = () => {
  const [response, setResponse] = useState<ApiResponse<UserComment[] | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchReadReceivedComments = async (params?: FetchProps, appendData = false) => {
    if (appendData) {
      setLoadingMore(true);
    } else {
      setResponse(undefined);
      setHasMore(true);
      setLoading(true);
    }

    try {
      const { userId, ...queryParams } = params ?? {};
      const res = await api.get<ApiResponse<UserComment[]>>(`/api/user/${userId}/received-comments`, { params: queryParams });
      const newApiResponse = res.data;
      const limit = params?.limit || 15;
      setHasMore((newApiResponse.data?.length ?? 0) >= limit);
      setResponse(prev => ({
        ...newApiResponse,
        data: appendData && prev?.data && newApiResponse.data ? [...prev.data, ...newApiResponse.data] : newApiResponse.data,
      }));
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  return {
    receivedCommentList: response,
    receivedCommentListLoading: loading,
    receivedCommentListLoadingMore: loadingMore,
    receivedCommentListHasMore: hasMore,
    fetchReadReceivedComments
  };
}

export default useReadReceivedComments;
