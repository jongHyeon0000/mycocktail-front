import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadTechniqueList from "../../../../technique/service/useReadTechniqueList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserTechniqueInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserTechniqueInsertModal: React.FC<UserTechniqueInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { techniqueList, techniqueListLoading, techniqueListHasMore, fetchReadTechniqueList } = useReadTechniqueList();

  const items: CommonSlideElement[] = (techniqueList?.data ?? []).map((technique) => ({
    id: technique.techniqueId,
    name: technique.techniqueName,
    nameKr: technique.techniqueNameKr,
    image: technique.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="제조 기법 추가"
      placeholder="제조 기법 검색..."
      items={items}
      loading={techniqueListLoading}
      hasMore={techniqueListHasMore}
      onFetch={(params) => fetchReadTechniqueList(params)}
    />
  );
};

export default UserTechniqueInsertModal;
