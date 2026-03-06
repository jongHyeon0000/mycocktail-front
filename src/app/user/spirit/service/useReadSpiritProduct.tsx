import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";
import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";
import {toApiResponse} from "../../../../config/axios/utils/toApiResponse.ts";

const useReadSpiritProduct = () => {
  const [response, setResponse] = useState<ApiResponse<SpiritProductDetail | null> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReadSpiritProduct = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse<SpiritProductDetail>>(`/api/spirit-product/${id}`);
      setResponse(res.data);
    } catch (err) {
      setResponse(toApiResponse(err));
    } finally {
      setLoading(false);
    }
  }

  return {
    spiritProduct: response,
    spiritProductLoading: loading,
    fetchReadSpiritProduct
  };
}

export default useReadSpiritProduct;
