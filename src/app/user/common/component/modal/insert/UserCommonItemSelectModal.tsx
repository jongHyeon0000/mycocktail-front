import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckOutlined, CloseOutlined, LocalBarRounded, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
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

interface UserCommonItemSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: CommonSlideElement[]) => void;
  title: string;
  placeholder: string;
  items: CommonSlideElement[];
  loading: boolean;
  hasMore: boolean;
  onFetch: (params: { page: number; limit: number; search?: string }) => void;
}

const PAGE_SIZE = 9;

const UserCommonItemSelectModal: React.FC<UserCommonItemSelectModalProps> = ({
  open, onClose, onSelect, title, placeholder, items, loading, hasMore, onFetch,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<CommonSlideElement[]>([]);

  useEffect(() => {
    if (open) {
      setPage(1);
      setSearch("");
      setSelectedItems([]);
      onFetch({ page: 1, limit: PAGE_SIZE });
    }
  }, [open]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    onFetch({ page: 1, limit: PAGE_SIZE, search: value });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onFetch({ page: newPage, limit: PAGE_SIZE, search });
  };

  const handleToggleItem = (item: CommonSlideElement) => {
    setSelectedItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleConfirm = () => {
    onSelect(selectedItems);
    onClose();
  };

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
              <Typography variant="h6" fontWeight={700}>{title}</Typography>
              <IconButton onClick={onClose} size="small">
                <CloseOutlined />
              </IconButton>
            </ModalHeader>

            <SearchArea>
              <TextField
                fullWidth
                size="small"
                placeholder={placeholder}
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
              {loading ? (
                <LoadingBox>
                  <CircularProgress size={32} sx={{ color: "#8B4513" }} />
                </LoadingBox>
              ) : items.length === 0 ? (
                <EmptyBox>
                  <Typography color="text.secondary" variant="body2">
                    검색 결과가 없습니다.
                  </Typography>
                </EmptyBox>
              ) : (
                <GridArea>
                  {items.map((item) => {
                    const isSelected = selectedItems.some(s => s.id === item.id);
                    return (
                      <GridItem
                        key={item.id}
                        as={motion.div}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleToggleItem(item)}
                        $selected={isSelected}
                      >
                        {isSelected && (
                          <SelectedBadge>
                            <CheckOutlined style={{ fontSize: 14 }} />
                          </SelectedBadge>
                        )}
                        <GridItemImage>
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <GridItemPlaceholder>
                              <LocalBarRounded fontSize="inherit" />
                            </GridItemPlaceholder>
                          )}
                        </GridItemImage>
                        <GridItemName>{item.name}</GridItemName>
                        <GridItemNameKr>{item.nameKr}</GridItemNameKr>
                      </GridItem>
                    );
                  })}
                </GridArea>
              )}
            </ModalContent>

            <BottomArea>
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
                  disabled={!hasMore}
                >
                  ›
                </PageArrowBtn>
              </PaginationArea>
              <ConfirmButton
                variant="contained"
                disableElevation
                disabled={selectedItems.length === 0}
                onClick={handleConfirm}
              >
                {selectedItems.length > 0 ? `${selectedItems.length}개 추가` : "추가"}
              </ConfirmButton>
            </BottomArea>
          </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default UserCommonItemSelectModal;

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
    padding: 16px 24px;
    flex: 1;
    overflow-y: auto;
    min-height: 200px;
  }
`;

const GridArea = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const GridItem = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== '$selected'
})<{ $selected?: boolean }>`
  && {
    position: relative;
    background: ${({ $selected }) => $selected ? '#fff8f2' : '#fafafa'};
    border: 1.5px solid ${({ $selected }) => $selected ? '#8b4513' : '#f0f0f0'};
    border-radius: 12px;
    padding: 12px 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: #8b4513;
      background: #fff8f5;
    }
  }
`;

const SelectedBadge = styled(Box)`
  && {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #8b4513;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GridItemImage = styled(Box)`
  && {
    width: 64px;
    height: 64px;
    border-radius: 10px;
    background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`;

const GridItemPlaceholder = styled(Box)`
  && {
    font-size: 1.8rem;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GridItemName = styled(Typography)`
  && {
    font-size: 0.75rem;
    font-weight: 600;
    color: #333;
    line-height: 1.3;
    margin-bottom: 2px;
    word-break: break-word;
  }
`;

const GridItemNameKr = styled(Typography)`
  && {
    font-size: 0.7rem;
    color: #888;
    line-height: 1.3;
    word-break: break-word;
  }
`;

const LoadingBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
`;

const EmptyBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
`;

const BottomArea = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px 20px;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
    gap: 12px;
  }
`;

const PaginationArea = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const ConfirmButton = styled(Button)`
  && {
    background-color: #8b4513;
    color: #fff;
    border-radius: 10px;
    padding: 6px 20px;
    font-weight: 600;
    text-transform: none;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      background-color: #6d3410;
    }

    &.Mui-disabled {
      background-color: #e0e0e0;
      color: #9e9e9e;
    }
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
