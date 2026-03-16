import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadSyrupList from "../../../../ingredients/syrup/service/useReadSyrupList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserSyrupInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserSyrupInsertModal: React.FC<UserSyrupInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { syrupList, syrupListLoading, syrupListHasMore, fetchReadSyrupList } = useReadSyrupList();

  const items: CommonSlideElement[] = (syrupList?.data ?? []).map((syrup) => ({
    id: syrup.syrupId,
    name: syrup.syrupName,
    nameKr: syrup.syrupNameKr,
    image: syrup.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="시럽 추가"
      placeholder="시럽 검색..."
      items={items}
      loading={syrupListLoading}
      hasMore={syrupListHasMore}
      onFetch={(params) => fetchReadSyrupList(params)}
    />
  );
};

export default UserSyrupInsertModal;
