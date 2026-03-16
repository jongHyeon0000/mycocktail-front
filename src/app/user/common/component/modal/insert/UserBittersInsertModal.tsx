import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadBittersList from "../../../../ingredients/bitters/service/useReadBittersList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserBittersInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserBittersInsertModal: React.FC<UserBittersInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { bittersList, bittersListLoading, bittersListHasMore, fetchReadBittersList } = useReadBittersList();

  const items: CommonSlideElement[] = (bittersList?.data ?? []).map((bitters) => ({
    id: bitters.bittersId,
    name: bitters.bittersName,
    nameKr: bitters.bittersNameKr,
    image: bitters.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="비터스 추가"
      placeholder="비터스 검색..."
      items={items}
      loading={bittersListLoading}
      hasMore={bittersListHasMore}
      onFetch={(params) => fetchReadBittersList(params)}
    />
  );
};

export default UserBittersInsertModal;
