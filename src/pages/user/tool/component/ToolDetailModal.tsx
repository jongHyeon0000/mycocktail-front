import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Build } from "@mui/icons-material";
import {
  StyledModal,
  ModalContainer,
  HeaderSection,
  ToolImage,
  PlaceholderIcon,
  TitleSection,
  EnglishTitle,
  KoreanTitle,
  InfoGrid,
  InfoCard,
  InfoLabel,
  CategoryChip,
  ProfileDescription,
  ContentSection,
  SectionTitle,
  TextContent
} from "./style/ToolDetailModal_Style.tsx";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModalStyle.ts";
import type {ToolDetail} from "../interface/ToolDetail.ts";
import {getToolCategoryKorean} from "../common/ToolUtils.ts";

interface ToolDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: ToolDetail;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  open,
  onClose,
  data
}) => {
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

                {/* 상단 한줄 설명 */}
                <ProfileDescription>
                  {data.profileNotes}
                </ProfileDescription>
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

                {/* 대체 가능한 도구들에 대한 설명 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                  <SectionTitle>대체 가능한 도구</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.alternativeTools || '' }} />
                </motion.div>
              </ContentSection>
            </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default ToolDetailModal;