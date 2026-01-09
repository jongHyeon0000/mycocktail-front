import React, {useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Build } from "@mui/icons-material";
import styled from "styled-components";
import {Box, Modal, Paper, Typography} from "@mui/material";
import type {BittersDetail} from "../interface/BittersDetail.ts";
import {COMMON_MODAL_STYLE} from "../../../common/style/CommonModal.style.ts";
import {CategorySlide} from "../../../common/component/CategorySlide.tsx";

interface BittersDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: BittersDetail;
}

const BittersDetailModal: React.FC<BittersDetailModalProps> = ({
   open,
   onClose,
   data
 }) => {
  // 슬라이드 섹션용 ref
  const availableCocktailsRef = useRef<HTMLDivElement>(null);

  return (
      <AnimatePresence>
        {open && (
            <StyledModal
                open={open}
                onClose={onClose}
                closeAfterTransition
            >
              <ModalContainer
                  as={motion.div}
                  variants={COMMON_MODAL_STYLE}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
              >
                {/* 헤더 섹션 */}
                <HeaderSection>
                  <ToolImage>
                    {data.image ? (
                        <img src={data.image} alt={data.bittersName} />
                    ) : (
                        <PlaceholderIcon>
                          <Build fontSize="inherit" />
                        </PlaceholderIcon>
                    )}
                  </ToolImage>

                  <TitleSection>
                    <EnglishTitle>{data.bittersName}</EnglishTitle>
                    <KoreanTitle>{data.bittersNameKr}</KoreanTitle>
                  </TitleSection>
                </HeaderSection>

                {/* 콘텐츠 섹션 */}
                <ContentSection>
                  {/* 설명 */}
                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                  >
                    <SectionTitle>설명</SectionTitle>
                    <TextContent dangerouslySetInnerHTML={{ __html: data.notes || ''}} />
                  </motion.div>

                  {/* 사용 시기에 대한 설명 */}
                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                  >
                    <SectionTitle>사용 시기</SectionTitle>
                    <TextContent dangerouslySetInnerHTML={{ __html: data.whenToUseNotes || '' }} />
                  </motion.div>

                  {/* 관련 칵테일 섹션 - 드래그 스크롤 슬라이드 */}
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                  >
                    <SectionTitle>관련 칵테일</SectionTitle>
                    <AvailableCocktailsSection>
                      {/* 칵테일 */}
                      {data.availableCocktails.length > 0 && (
                          <CategorySlide
                              title="관련 칵테일"
                              items={data.availableCocktails}
                              slideRef={availableCocktailsRef}
                          />
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

export default BittersDetailModal;

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
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    margin: auto;
    
    &:focus {
      outline: none;
    }
    
    @media (max-width: 600px) {
      margin: 16px;
      max-height: 95vh;
      border-radius: 16px;
    }
  }
`;

const HeaderSection = styled(Box)`
  && {
    position: relative;
    padding: 32px;
    
    @media (max-width: 600px) {
      padding: 24px;
    }
  }
`;

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

const PlaceholderIcon = styled(Box)`
  && {
    font-size: 64px;
    color: white;
    
    @media (max-width: 600px) {
      font-size: 48px;
    }
  }
`;

const TitleSection = styled(Box)`
  && {
    text-align: center;
    margin-bottom: 24px;
  }
`;

const EnglishTitle = styled(Typography)`
  && {
    font-size: 2.25rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 8px;
    font-family: 'Playfair Display', serif;
    
    @media (max-width: 600px) {
      font-size: 1.875rem;
    }
  }
`;

const KoreanTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    font-weight: 500;
    color: #7f8c8d;
    margin-bottom: 16px;
    
    @media (max-width: 600px) {
      font-size: 1.125rem;
    }
  }
`;

const ContentSection = styled(Box)`
  && {
    padding: 0 32px 32px;
    
    @media (max-width: 600px) {
      padding: 0 24px 24px;
    }
  }
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
      border-radius: 2px;
    }
  }
`;

const TextContent = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    
    p {
      line-height: 1.7;
      color: #2c3e50;
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    ul, ol {
      padding-left: 20px;
      color: #2c3e50;
      
      li {
        margin-bottom: 8px;
        line-height: 1.6;
      }
    }
    
    strong {
      color: #2c3e50;
      font-weight: 700;
    }
  }
`;

// 사용 칵테일 섹션 스타일들
const AvailableCocktailsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
  }
`;