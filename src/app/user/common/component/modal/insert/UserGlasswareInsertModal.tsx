import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadGlasswareList from "../../../../glassware/service/useReadGlasswareList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserGlasswareInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserGlasswareInsertModal: React.FC<UserGlasswareInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { glasswareList, glasswareListLoading, glasswareListHasMore, fetchReadGlasswareList } = useReadGlasswareList();

  const items: CommonSlideElement[] = (glasswareList?.data ?? []).map((glass) => ({
    id: glass.glassId,
    name: glass.glassName,
    nameKr: glass.glassNameKr,
    image: glass.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="글라스웨어 추가"
      placeholder="글라스웨어 검색..."
      items={items}
      loading={glasswareListLoading}
      hasMore={glasswareListHasMore}
      onFetch={(params) => fetchReadGlasswareList(params)}
    />
  );
};

export default UserGlasswareInsertModal;
