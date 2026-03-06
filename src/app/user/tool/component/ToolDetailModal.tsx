import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Build } from "@mui/icons-material";
import { COMMON_MODAL_STYLE } from "../../common/style/CommonModal.style.ts";
import type { ToolDetail } from "../interface/ToolDetail.ts";
import { getToolCategoryKorean } from "../common/ToolUtils.ts";
import styled from "styled-components";
import { Box, Chip } from "@mui/material";
import { CategorySlide } from "../../common/component/CategorySlide.tsx";
import {
  StyledModal, ModalContainer, HeaderSection, PlaceholderIcon,
  TitleSection, EnglishTitle, KoreanTitle, InfoGrid, InfoCard, InfoLabel,
  ContentSection, SectionTitle, TextContent, AvailableCocktailsSection,
} from "../../common/style/CommonDetailModal.style.tsx";

interface ToolDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: ToolDetail;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ open, onClose, data }) => {
  const availableCocktailsRef = useRef<HTMLDivElement>(null);

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
            <HeaderSection>
              <ToolImage>
                {data.image ? (
                  <img src={data.image} alt={data.toolName} />
                ) : (
                  <PlaceholderIcon>
                    <Build fontSize="inherit" />
                  </PlaceholderIcon>
                )}
              </ToolImage>

              <TitleSection>
                <EnglishTitle>{data.toolName}</EnglishTitle>
                <KoreanTitle>{data.toolNameKr}</KoreanTitle>
              </TitleSection>

              <InfoGrid>
                <InfoCard>
                  <InfoLabel>카테고리</InfoLabel>
                  <CategoryChip label={getToolCategoryKorean(data.toolCategory)} size="small" />
                </InfoCard>
              </InfoGrid>
            </HeaderSection>

            <ContentSection>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <SectionTitle>설명</SectionTitle>
                <TextContent dangerouslySetInnerHTML={{ __html: data.notes || '' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <SectionTitle>사용 시기</SectionTitle>
                <TextContent dangerouslySetInnerHTML={{ __html: data.whenToUseNotes || '' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <SectionTitle>대체 가능한 도구</SectionTitle>
                <TextContent dangerouslySetInnerHTML={{ __html: data.alternativeTools || '' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <SectionTitle>관련 칵테일</SectionTitle>
                <AvailableCocktailsSection>
                  {data.availableCocktails.length > 0 && (
                    <CategorySlide title="관련 칵테일" items={data.availableCocktails} slideRef={availableCocktailsRef} />
                  )}
                </AvailableCocktailsSection>
              </motion.div>
            </ContentSection>
          </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default ToolDetailModal;

const ToolImage = styled(Box)`
  && {
    width: 320px;
    height: 320px;
    border-radius: 20px;
    background: linear-gradient(135deg, #2C3E50, #34495E);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 32px rgba(44, 62, 80, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    @media (max-width: 600px) {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }
  }
`;

const CategoryChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;
