import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadGarnishesList from "../../../../ingredients/garnishes/service/useReadGarnishesList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserGarnishesInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserGarnishesInsertModal: React.FC<UserGarnishesInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { garnishesList, garnishesListLoading, garnishesListHasMore, fetchReadGarnishesList } = useReadGarnishesList();

  const items: CommonSlideElement[] = (garnishesList?.data ?? []).map((garnish) => ({
    id: garnish.garnishId,
    name: garnish.garnishName,
    nameKr: garnish.garnishNameKr,
    image: garnish.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="가니쉬 추가"
      placeholder="가니쉬 검색..."
      items={items}
      loading={garnishesListLoading}
      hasMore={garnishesListHasMore}
      onFetch={(params) => fetchReadGarnishesList(params)}
    />
  );
};

export default UserGarnishesInsertModal;
