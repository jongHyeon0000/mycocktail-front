import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { COMMON_MODAL_STYLE } from "../../../style/CommonModal.style.ts";
import type { CommonSlideElement } from "../../../interface/CommonSlideElement.ts";

interface UserGarnishesInsertModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: CommonSlideElement) => void;
}

const UserGarnishesInsertModal: React.FC<UserGarnishesInsertModalProps> = ({ open, onClose, onSelect }) => {
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
              <Typography variant="h6" fontWeight={700}>가니쉬 추가</Typography>
              <IconButton onClick={onClose} size="small">
                <CloseOutlined />
              </IconButton>
            </ModalHeader>
            <ModalContent>
              {/* 레이아웃 만 채워줘 */}
            </ModalContent>
          </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default UserGarnishesInsertModal;

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
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

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
  }
`;

const ModalContent = styled(Box)`
  && {
    padding: 24px;
  }
`;
