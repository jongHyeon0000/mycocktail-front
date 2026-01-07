import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LocalBarOutlined,
  LocalBarRounded
} from "@mui/icons-material";
import {commonDragStyle} from "../../common/style/CommonDrag.style.ts";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModal.style.ts";
import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";
import styled from "styled-components";
import {Box, Chip, Modal, Paper, Typography} from "@mui/material";

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
                            <SlideTrack {...commonDragStyle(cocktailsRef)}>
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
    max-width: 1000px;
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

const InfoGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
`;

const InfoCard = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
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

// 플레이버 미터 관련 스타일들
const FlavorMeterContainer = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const FlavorMeterBar = styled(Box)`
  && {
    flex: 1;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
`;

const FlavorMeterFill = styled(Box)<{ level: number; color: string }>`
  && {
    height: 100%;
    width: ${({ level }) => (level / 5) * 100}%;
    background: linear-gradient(90deg, ${({ color }) => color} 0%, ${({ color }) => color}CC 100%);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const FlavorMeterLabel = styled(Typography)`
  && {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6c757d;
    min-width: 24px;
  }
`;

const ProfileDescription = styled(Typography)`
  && {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #34495e;
    text-align: center;
    font-style: italic;
    background: rgba(255, 255, 255, 0.6);
    padding: 20px;
    border-radius: 16px;
    border-left: 4px solid #8B4513;
    margin-bottom: 32px;
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
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
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

const PersonalSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const PersonalTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3436;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '';
      width: 3px;
      height: 20px;
      background-color: #e17055;
      border-radius: 2px;
    }
  }
`;

const PersonalContent = styled(Typography)`
  && {
    line-height: 1.6;
    color: #2d3436;
    font-size: 0.95rem;
  }
`;

const BottomSection = styled(Box)`
  && {
    padding: 24px 32px 32px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(248, 249, 250, 0.8);
    
    @media (max-width: 600px) {
      padding: 20px 24px 24px;
    }
  }
`;

const DateInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 600px) {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
  }
`;

const DateText = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #7f8c8d;
    font-weight: 500;
  }
`;

// 사용 칵테일 섹션 스타일들
const CocktailsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
  }
`;

const SlideContainer = styled(Box)`
  && {
    margin-top: 16px;
    position: relative;
  }
`;

const SlideWrapper = styled(Box)`
  && {
    overflow: hidden;
    border-radius: 12px;
    padding: 8px 0;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
`;

const SlideTrack = styled(Box)`
  && {
    display: flex;
    gap: 16px;
    padding: 0 16px;
    width: max-content;
  }
`;

const SlideItem = styled(Box)`
  && {
    min-width: 140px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    @media (max-width: 600px) {
      min-width: 120px;
      padding: 12px;
    }
  }
`;

const SlideItemImage = styled(Box)`
  && {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      pointer-events: none;
      user-select: none;
    }
    
    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
    }
  }
`;

const SlideItemPlaceholder = styled(Box)`
  && {
    width: 32px;
    height: 32px;
    color: #adb5bd;
    
    @media (max-width: 600px) {
      width: 24px;
      height: 24px;
    }
  }
`;

const SlideItemEnglishName = styled(Typography)`
  && {
    font-size: 0.8rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 4px;
    line-height: 1.2;
    
    @media (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;

const SlideItemKoreanName = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #6c757d;
    line-height: 1.2;
    
    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
`;

const SlideCategoryTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #2e7d32;
    margin-bottom: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
`;

const CategorySection = styled(Box)`
  && {
    margin-bottom: 32px;
    position: relative;
    
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 24px;
      right: 10%;
      height: 2px;
      background: linear-gradient(90deg, rgba(76, 175, 80, 1) 0%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 100%);
      border-radius: 1px;
      box-shadow: 0 1px 3px rgba(76, 175, 80, 0.3);
    }
  }
`;