import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { COMMON_MODAL_STYLE } from "../../../style/CommonModal.style.ts";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";
import useReadSpiritProductList from "../../../../spirit/service/useReadSpiritProductList.tsx";
import { CategorySlide } from "../../CategorySlide.tsx";

interface UserSpiritInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: CommonSlideElement) => void;
}

const PAGE_SIZE = 9;

const UserSpiritInsertModal: React.FC<UserSpiritInsertModalProps> = ({ open, onClose, onSelect }) => {
  const {
    spiritProductList,
    spiritProductListLoading,
    spiritProductListHasMore,
    fetchReadSpiritProductList,
  } = useReadSpiritProductList();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setPage(1);
      setSearch("");
      fetchReadSpiritProductList({ page: 1, limit: PAGE_SIZE });
    }
  }, [open]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    fetchReadSpiritProductList({ page: 1, limit: PAGE_SIZE, search: value });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchReadSpiritProductList({ page: newPage, limit: PAGE_SIZE, search });
  };

  const handleSelect = (item: CommonSlideElement) => {
    onSelect(item);
    onClose();
  };

  const slideItems: CommonSlideElement[] = (spiritProductList ?? []).map((spirit) => ({
    id: spirit.spiritProductId,
    name: spirit.spiritName,
    nameKr: spirit.spiritNameKr,
    image: spirit.image,
  }));

  return (
    <AnimatePresence>
      {open && (
        <StyledModal open={open} onClose={onClose} closeAfterTransition>
          <ModalContainer
            as={motion.div}
            variants={COMMON_MODAL_STYLE}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalHeader>
              <Typography variant="h6" fontWeight={700}>기주 추가</Typography>
              <IconButton onClick={onClose} size="small">
                <CloseOutlined />
              </IconButton>
            </ModalHeader>

            <SearchArea>
              <TextField
                fullWidth
                size="small"
                placeholder="기주 검색..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined fontSize="small" sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#f8f8f8",
                    "& fieldset": { borderColor: "#eee" },
                    "&:hover fieldset": { borderColor: "#ccc" },
                    "&.Mui-focused fieldset": { borderColor: "#8B4513" },
                  },
                }}
              />
            </SearchArea>

            <ModalContent>
              {spiritProductListLoading ? (
                <LoadingBox>
                  <CircularProgress size={32} sx={{ color: "#8B4513" }} />
                </LoadingBox>
              ) : slideItems.length === 0 ? (
                <EmptyBox>
                  <Typography color="text.secondary" variant="body2">
                    검색 결과가 없습니다.
                  </Typography>
                </EmptyBox>
              ) : (
                <SlideArea>
                  <CategorySlide
                    title="기주"
                    items={slideItems}
                    slideRef={slideRef}
                    onItemClick={handleSelect}
                  />
                </SlideArea>
              )}
            </ModalContent>

            <PaginationArea>
              <PageArrowBtn
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                ‹
              </PageArrowBtn>
              <PageLabel>{page}</PageLabel>
              <PageArrowBtn
                onClick={() => handlePageChange(page + 1)}
                disabled={!spiritProductListHasMore}
              >
                ›
              </PageArrowBtn>
            </PaginationArea>
          </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default UserSpiritInsertModal;

const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

const ModalContainer = styled(Paper)`
  && {
    width: 100%;
    max-width: 620px;
    max-height: 85vh;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &:focus {
      outline: none;
    }
  }
`;

const ModalHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0;
  }
`;

const SearchArea = styled(Box)`
  && {
    padding: 16px 24px 0;
    flex-shrink: 0;
  }
`;

const ModalContent = styled(Box)`
  && {
    padding: 8px 0 8px;
    flex: 1;
    overflow-y: auto;
    min-height: 160px;
  }
`;

const SlideArea = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    margin: 12px 24px;
    padding: 16px 0;
    border: 1px solid rgba(76, 175, 80, 0.2);
  }
`;

const LoadingBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
  }
`;

const EmptyBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
  }
`;

const PaginationArea = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 24px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
  }
`;

const PageArrowBtn = styled.button<{ disabled?: boolean }>`
  background: none;
  border: 1.5px solid ${({ disabled }) => (disabled ? "#e0e0e0" : "#8b4513")};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#8b4513")};
  border-radius: 8px;
  width: 32px;
  height: 32px;
  font-size: 1.3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background: #8b4513;
    color: #fff;
  }
`;

const PageLabel = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    min-width: 24px;
    text-align: center;
  }
`;
