import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadDairyCreamList from "../../../../ingredients/dairy_cream/service/useReadDairyCreamList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserDairyCreamInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserDairyCreamInsertModal: React.FC<UserDairyCreamInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { dairyCreamList, dairyCreamListLoading, dairyCreamListHasMore, fetchReadDairyCreamList } = useReadDairyCreamList();

  const items: CommonSlideElement[] = (dairyCreamList?.data ?? []).map((dairyCream) => ({
    id: dairyCream.dairyCreamId,
    name: dairyCream.dairyCreamName,
    nameKr: dairyCream.dairyCreamNameKr,
    image: dairyCream.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="유제품/크림 추가"
      placeholder="유제품/크림 검색..."
      items={items}
      loading={dairyCreamListLoading}
      hasMore={dairyCreamListHasMore}
      onFetch={(params) => fetchReadDairyCreamList(params)}
    />
  );
};

export default UserDairyCreamInsertModal;
