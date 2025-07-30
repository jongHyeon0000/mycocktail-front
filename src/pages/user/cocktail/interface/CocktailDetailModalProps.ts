import type {CocktailDetail} from "./CocktailDetail.ts";

export interface CocktailDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: CocktailDetail
}
