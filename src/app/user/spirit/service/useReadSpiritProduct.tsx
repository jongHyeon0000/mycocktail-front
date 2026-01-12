import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";
import {useState} from "react";
import {api} from "../../../../axios/AxiosConfig.ts";

const useReadSpiritProduct = () => {
  const [data, setData] = useState<SpiritProductDetail | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadSpiritProduct = async (id: number) => {
    setLoading(true);
    setError(null);

    try{
      const response = await api.get<{data: SpiritProductDetail}>(`/api/spirit-product/${id}`);

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
    spiritProduct: data,
    spiritProductLoading: loading,
    spiritProductError: error,
    fetchReadSpiritProduct
  };
}

export default useReadSpiritProduct;