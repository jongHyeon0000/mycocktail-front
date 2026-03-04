import axios, {type AxiosInstance} from "axios";
import { getAccessToken, removeAccessToken } from '../../utils/cookieUtils';
import { useAuthStore } from '../../store/authStore';

export const BASE_URL = import.meta.env.MODE === 'development'
    /*
    * MSW가 현재 origin을 인터셉트하므로 빈 문자열 사용
    * */
    ? ''
    /*
    * 실서버
    * */
    : 'http://192.168.1.91:8080/';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

/**
* Request Interceptor: 모든 요청에 토큰 자동 추가
* */
api.interceptors.request.use((config) => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

/**
* Response Interceptor: 401/403 에러 시 토큰 삭제 및 로그아웃 처리
* */
api.interceptors.response.use((response) => response, (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        // 토큰 만료 또는 유효하지 않음 (401: Unauthorized, 403: Forbidden)
        removeAccessToken();

        // Zustand 상태 초기화 (사용자 정보 제거)
        useAuthStore.getState().logout();

        // 필요시 로그인 페이지로 리다이렉트
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    }
);

