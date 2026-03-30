import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadToolList from "../../../../tool/service/useReadToolList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserToolInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserToolInsertModal: React.FC<UserToolInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { toolList, toolListLoading, toolListHasMore, fetchReadToolList } = useReadToolList();

  const items: CommonSlideElement[] = (toolList?.data ?? []).map((tool) => ({
    id: tool.toolId,
    name: tool.toolName,
    nameKr: tool.toolNameKr,
    image: tool.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="도구/기물 추가"
      placeholder="도구/기물 검색..."
      items={items}
      loading={toolListLoading}
      hasMore={toolListHasMore}
      onFetch={(params) => fetchReadToolList(params)}
    />
  );
};

export default UserToolInsertModal;
