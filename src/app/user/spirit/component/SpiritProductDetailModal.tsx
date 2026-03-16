import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalBarOutlined } from "@mui/icons-material";
import { COMMON_MODAL_STYLE } from "../../common/style/CommonModal.style.ts";
import type { SpiritProductDetail } from "../interface/SpiritProductDetail.ts";
import { SPIRIT_CATEGORY_MAP } from "../../cocktail/constant/spiritCategories.ts";
import styled from "styled-components";
import { Box, Chip } from "@mui/material";
import { CategorySlide } from "../../common/component/CategorySlide.tsx";
import {
  StyledModal, ModalContainerWide, HeaderSection, PlaceholderIcon,
  TitleSection, EnglishTitle, KoreanTitle, InfoGrid, InfoCard, InfoLabel, InfoValue,
  ProfileDescription, ContentSection, SectionTitle, TextContent,
  PersonalSection, PersonalTitle, PersonalContent,
  AvailableCocktailsSection, BottomSection, DateInfo, DateText,
  FlavorMeterContainer, FlavorMeterBar, FlavorMeterFill, FlavorMeterLabel,
} from "../../common/style/CommonDetailModal.style.tsx";

interface SpiritDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: SpiritProductDetail;
}

const SpiritProductDetailModal: React.FC<SpiritDetailModalProps> = ({
  open,
  onClose,
  data,
}) => {
  const cocktailsRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {open && (
        <StyledModal open={open} onClose={onClose} closeAfterTransition>
          <ModalContainerWide
            as={motion.div}
            variants={COMMON_MODAL_STYLE}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <HeaderSection>
              <SpiritImage>
                {data.image ? (
                  <img src={data.image} alt={data.spiritName} />
                ) : (
                  <PlaceholderIcon>
                    <LocalBarOutlined fontSize="inherit" />
                  </PlaceholderIcon>
                )}
              </SpiritImage>

              <TitleSection>
                <EnglishTitle>{data.spiritName}</EnglishTitle>
                <KoreanTitle>{data.spiritNameKr}</KoreanTitle>
              </TitleSection>

              <InfoGrid>
                <InfoCard>
                  <InfoLabel>카테고리</InfoLabel>
                  <CategoryChip label={SPIRIT_CATEGORY_MAP[data.spiritCategory].nameKr} size="small" />
                </InfoCard>
                <InfoCard>
                  <InfoLabel>브랜드</InfoLabel>
                  <InfoValue>{data.brand.brandName}</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>원산지(국가)</InfoLabel>
                  <InfoValue>{data.country.countryNameKr}</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>도수</InfoLabel>
                  <InfoValue>{data.absPercentage}%</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>용량</InfoLabel>
                  <InfoValue>{data.volumeMl}ml</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>단맛 레벨</InfoLabel>
                  <FlavorMeterContainer>
                    <FlavorMeterBar>
                      <FlavorMeterFill level={data.sweetness} color="#ff6b6b" />
                    </FlavorMeterBar>
                    <FlavorMeterLabel>{data.sweetness}/5</FlavorMeterLabel>
                  </FlavorMeterContainer>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>시트러스 레벨</InfoLabel>
                  <FlavorMeterContainer>
                    <FlavorMeterBar>
                      <FlavorMeterFill level={data.citrus} color="#ffa726" />
                    </FlavorMeterBar>
                    <FlavorMeterLabel>{data.citrus}/5</FlavorMeterLabel>
                  </FlavorMeterContainer>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>허브 레벨</InfoLabel>
                  <FlavorMeterContainer>
                    <FlavorMeterBar>
                      <FlavorMeterFill level={data.herbal} color="#66bb6a" />
                    </FlavorMeterBar>
                    <FlavorMeterLabel>{data.herbal}/5</FlavorMeterLabel>
                  </FlavorMeterContainer>
                </InfoCard>
              </InfoGrid>

              <ProfileDescription>{data.profileNote}</ProfileDescription>
            </HeaderSection>

            <ContentSection>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <SectionTitle>역사</SectionTitle>
                <TextContent dangerouslySetInnerHTML={{ __html: data.historyNote || '' }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <SectionTitle>설명</SectionTitle>
                <TextContent dangerouslySetInnerHTML={{ __html: data.note || '' }} />
              </motion.div>

              {/* 제거 예정 (기획 의도 상 기주는 사용자가 등록하지 않음 */}
              {/*{data.personalReview && (*/}
              {/*  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>*/}
              {/*    <PersonalSection>*/}
              {/*      <PersonalTitle>개인적인 설명</PersonalTitle>*/}
              {/*      <PersonalContent>{data.personalReview}</PersonalContent>*/}
              {/*    </PersonalSection>*/}
              {/*  </motion.div>*/}
              {/*)}*/}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <SectionTitle>사용 가능 칵테일</SectionTitle>
                <AvailableCocktailsSection>
                  {data.availableCocktails.length > 0 && (
                    <CategorySlide title="만들 수 있는 칵테일" items={data.availableCocktails} slideRef={cocktailsRef} />
                  )}
                </AvailableCocktailsSection>
              </motion.div>
            </ContentSection>

            <BottomSection>
              <DateInfo>
                <DateText>등록일: {data.createAt}</DateText>
                <DateText>최종 업데이트: {data.updatedAt}</DateText>
              </DateInfo>
            </BottomSection>
          </ModalContainerWide>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default SpiritProductDetailModal;

const SpiritImage = styled(Box)`
  && {
    width: 440px;
    height: 440px;
    border-radius: 20px;
    background: linear-gradient(135deg, #8B4513, #D2691E);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 32px rgba(139, 69, 19, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    @media (max-width: 600px) {
      width: 220px;
      height: 220px;
      margin-bottom: 20px;
    }
  }
`;

const CategoryChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;
