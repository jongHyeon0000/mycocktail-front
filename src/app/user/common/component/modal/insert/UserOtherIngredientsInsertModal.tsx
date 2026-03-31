import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadOtherIngredientsList from "../../../../ingredients/other_ingredients/service/useReadOtherIngredientsList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserOtherIngredientsInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
  initialSelected?: CommonSlideElement[];
}

const UserOtherIngredientsInsertModal: React.FC<UserOtherIngredientsInsertModalProps> = ({ open, onClose, onSelect, initialSelected }) => {
  const { otherIngredientsList, otherIngredientsListLoading, otherIngredientsListHasMore, fetchReadOtherIngredientsList } = useReadOtherIngredientsList();

  const items: CommonSlideElement[] = (otherIngredientsList?.data ?? []).map((other) => ({
    id: other.otherIngredientId,
    name: other.otherIngredientName,
    nameKr: other.otherIngredientNameKr,
    image: other.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="기타 재료 추가"
      placeholder="기타 재료 검색..."
      items={items}
      loading={otherIngredientsListLoading}
      hasMore={otherIngredientsListHasMore}
      onFetch={(params) => fetchReadOtherIngredientsList(params)}
      initialSelected={initialSelected}
    />
  );
};

export default UserOtherIngredientsInsertModal;
