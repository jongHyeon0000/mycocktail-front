import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";
import {useState} from "react";
import {api} from "../../../../config/axios/AxiosConfig.ts";
import type {ApiResponse} from "../../../../config/axios/interface/ApiResponse.ts";

const useReadSpiritProduct = () => {
  const [data, setData] = useState<SpiritProductDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadSpiritProduct = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<ApiResponse<SpiritProductDetail>>(`/api/spirit-product/${id}`);

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
    spiritProduct: data,
    spiritProductLoading: loading,
    spiritProductError: error,
    fetchReadSpiritProduct
  };
}

export default useReadSpiritProduct;