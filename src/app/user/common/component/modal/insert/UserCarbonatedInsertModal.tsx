import React from "react";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadCarbonatedList from "../../../../ingredients/carbonated/service/useReadCarbonatedList.tsx";
import UserCommonItemSelectModal from "./UserCommonItemSelectModal.tsx";

interface UserCarbonatedInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
}

const UserCarbonatedInsertModal: React.FC<UserCarbonatedInsertModalProps> = ({ open, onClose, onSelect }) => {
  const { carbonatedList, carbonatedListLoading, carbonatedListHasMore, fetchReadCarbonatedList } = useReadCarbonatedList();

  const items: CommonSlideElement[] = (carbonatedList?.data ?? []).map((carbonated) => ({
    id: carbonated.carbonatedId,
    name: carbonated.carbonatedName,
    nameKr: carbonated.carbonatedNameKr,
    image: carbonated.image,
  }));

  return (
    <UserCommonItemSelectModal
      open={open}
      onClose={onClose}
      onSelect={onSelect}
      title="탄산/소다 추가"
      placeholder="탄산/소다 검색..."
      items={items}
      loading={carbonatedListLoading}
      hasMore={carbonatedListHasMore}
      onFetch={(params) => fetchReadCarbonatedList(params)}
    />
  );
};

export default UserCarbonatedInsertModal;
