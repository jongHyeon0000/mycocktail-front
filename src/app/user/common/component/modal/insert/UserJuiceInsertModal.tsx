import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadJuiceList from "../../../../ingredients/juice/service/useReadJuiceList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserJuiceInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserJuiceInsertModal: React.FC<UserJuiceInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { juiceList, juiceListLoading, juiceListHasMore, fetchReadJuiceList } = useReadJuiceList();

  const items: CommonSlideElement[] = (juiceList?.data ?? []).map((juice) => ({
    id: juice.juiceId,
    name: juice.juiceName,
    nameKr: juice.juiceNameKr,
    image: juice.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="주스 추가"
      placeholder="주스 검색..."
      items={items}
      loading={juiceListLoading}
      hasMore={juiceListHasMore}
      onFetch={(params) => fetchReadJuiceList(params)}
    />
  );
};

export default UserJuiceInsertModal;
