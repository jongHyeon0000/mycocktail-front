import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LocalBarOutlined,
  LocalBarRounded
} from "@mui/icons-material";
import {
  StyledModal,
  ModalContainer,
  HeaderSection,
  SpiritImage,
  PlaceholderIcon,
  TitleSection,
  EnglishTitle,
  KoreanTitle,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  CategoryChip,
  FlavorMeterContainer,
  FlavorMeterLabel,
  FlavorMeterBar,
  FlavorMeterFill,
  ProfileDescription,
  ContentSection,
  SectionTitle,
  TextContent,
  PersonalSection,
  PersonalTitle,
  PersonalContent,
  CocktailsSection,
  SlideContainer,
  SlideWrapper,
  SlideTrack,
  SlideItem,
  SlideItemImage,
  SlideItemPlaceholder,
  SlideItemEnglishName,
  SlideItemKoreanName,
  SlideCategoryTitle,
  CategorySection,
  BottomSection,
  DateInfo,
  DateText
} from "./style/SpiritProductDetailModal_Style.tsx";
import {COMMON_DRAG_STYLE} from "../../common/style/CommonDragStyle.ts";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModalStyle.ts";
import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";

interface SpiritDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: SpiritProductDetail
}

const SpiritProductDetailModal: React.FC<SpiritDetailModalProps> = ({
  open,
  onClose,
  data
}) => {
  // 슬라이드 섹션용 ref
  const cocktailsRef = useRef<HTMLDivElement>(null);

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
                    <CategoryChip label={data.spirit.spiritName} size="small" />
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

                <ProfileDescription>
                  {data.profileNote}
                </ProfileDescription>
              </HeaderSection>

              {/* 콘텐츠 섹션 */}
              <ContentSection>
                {/* 역사 설명 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <SectionTitle>역사</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.historyNote || '' }} />
                </motion.div>

                {/* 설명 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                  <SectionTitle>설명</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.note || '' }} />
                </motion.div>

                {/* 개인적인 설명 */}
                {data.personalReview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 설명</PersonalTitle>
                      <PersonalContent>{data.personalReview}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {/* 사용 칵테일 섹션 - 드래그 스크롤 슬라이드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <SectionTitle>사용 가능 칵테일</SectionTitle>
                  <CocktailsSection>
                    {/* 칵테일 */}
                    {data.availableCocktails.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>이 술로 만들 수 있는 칵테일</SlideCategoryTitle>
                        <SlideContainer ref={cocktailsRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(cocktailsRef)}>
                              {data.availableCocktails.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.cocktailName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.cocktailName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.cocktailNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}
                  </CocktailsSection>
                </motion.div>
              </ContentSection>

              {/* 하단 섹션 */}
              <BottomSection>
                <DateInfo>
                  <DateText>등록일: {data.createAt}</DateText>
                  <DateText>최종 업데이트: {data.updatedAt}</DateText>
                </DateInfo>
              </BottomSection>
            </ModalContainer>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default SpiritProductDetailModal;