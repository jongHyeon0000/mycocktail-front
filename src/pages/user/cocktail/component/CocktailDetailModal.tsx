import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FavoriteOutlined,
  ShareOutlined,
  LocalBarOutlined,
} from "@mui/icons-material";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModal.style.ts";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import styled from "styled-components";
import {Box, Chip, IconButton, Modal, Paper, Typography} from "@mui/material";
import {CategorySlide} from "../../common/component/CategorySlide.tsx";

interface CocktailDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: CocktailDetail
}

const CocktailDetailModal: React.FC<CocktailDetailModalProps> = ({
  open,
  onClose,
  data
}) => {
  // 각 슬라이드 섹션마다 별도의 ref 생성
  const spiritsRef = useRef<HTMLDivElement>(null);
  const juicesRef = useRef<HTMLDivElement>(null);
  const bittersRef = useRef<HTMLDivElement>(null);
  const syrupsRef = useRef<HTMLDivElement>(null);
  const carbonatedRef = useRef<HTMLDivElement>(null);
  const dairyRef = useRef<HTMLDivElement>(null);
  const garnishesRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const glasswareRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  const handleLikeClick = () => {
    console.log('좋아요 클릭');
  };

  const handleShareClick = () => {
    console.log('공유 클릭');
  };

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
                <CocktailImage>
                  {data.image ? (
                    <img src={data.image} alt={data.cocktailName} />
                  ) : (
                    <PlaceholderIcon>
                      <LocalBarOutlined fontSize="inherit" />
                    </PlaceholderIcon>
                  )}
                </CocktailImage>

                <TitleSection>
                  <EnglishTitle>{data.cocktailName}</EnglishTitle>
                  <KoreanTitle>{data.cocktailNameKr}</KoreanTitle>
                </TitleSection>

                <InfoGrid>
                  <InfoCard>
                    <InfoLabel>카테고리</InfoLabel>
                    <CategoryChip label={data.category} size="small" />
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>예상 도수</InfoLabel>
                    <InfoValue>{data.absPercentage}%</InfoValue>
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>난이도</InfoLabel>
                    <DifficultyChip 
                      difficulty={data.difficulty}
                      label={data.difficulty}
                      size="small" 
                    />
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>출처</InfoLabel>
                    <VariantChip 
                      label={data.isVariation ? "커뮤니티 레시피" : "공식"}
                      size="small"
                      color={data.isVariation ? "default" : "success"}
                    />
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

                {/* 재료 정보 섹션 - 드래그 스크롤 슬라이드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SectionTitle>사용 재료</SectionTitle>
                  <IngredientsSection>
                    {/* 기주 */}
                    {data.ingredients.spirits.length > 0 && (
                      <CategorySlide
                        title="기주"
                        items={data.ingredients.spirits}
                        slideRef={spiritsRef}
                        getName={(item) => item.spiritName}
                        getNameKr={(item) => item.spiritNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 주스 */}
                    {data.ingredients.juices.length > 0 && (
                      <CategorySlide
                        title="주스"
                        items={data.ingredients.juices}
                        slideRef={juicesRef}
                        getName={(item) => item.juiceName}
                        getNameKr={(item) => item.juiceNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 비터스 */}
                    {data.ingredients.bitters.length > 0 && (
                      <CategorySlide
                        title="비터스"
                        items={data.ingredients.bitters}
                        slideRef={bittersRef}
                        getName={(item) => item.bitterName}
                        getNameKr={(item) => item.bitterNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 시럽 */}
                    {data.ingredients.syrups.length > 0 && (
                      <CategorySlide
                        title="시럽"
                        items={data.ingredients.syrups}
                        slideRef={syrupsRef}
                        getName={(item) => item.syrupName}
                        getNameKr={(item) => item.syrupNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 탄산/소다 */}
                    {data.ingredients.carbonated.length > 0 && (
                      <CategorySlide
                        title="탄산/소다"
                        items={data.ingredients.carbonated}
                        slideRef={carbonatedRef}
                        getName={(item) => item.carbonatedName}
                        getNameKr={(item) => item.carbonatedNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 유제품/크림 */}
                    {data.ingredients.dairy.length > 0 && (
                      <CategorySlide
                        title="유제품/크림"
                        items={data.ingredients.dairy}
                        slideRef={dairyRef}
                        getName={(item) => item.dairyName}
                        getNameKr={(item) => item.dairyNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 가니쉬 */}
                    {data.ingredients.garnishes.length > 0 && (
                      <CategorySlide
                        title="가니쉬"
                        items={data.ingredients.garnishes}
                        slideRef={garnishesRef}
                        getName={(item) => item.garnishName}
                        getNameKr={(item) => item.garnishNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}

                    {/* 기타 */}
                    {data.ingredients.others.length > 0 && (
                      <CategorySlide
                        title="기타"
                        items={data.ingredients.others}
                        slideRef={othersRef}
                        getName={(item) => item.otherIngredientName}
                        getNameKr={(item) => item.otherIngredientNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                      />
                    )}
                  </IngredientsSection>
                </motion.div>

                {/* 제조 기법 섹션 - 드래그 스크롤 슬라이드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <SectionTitle>제조 기법</SectionTitle>
                  <TechniquesSection>
                    {/* 도구/기물 */}
                    {data.tools.length > 0 && (
                      <CategorySlide
                        title="도구/기물"
                        items={data.tools}
                        slideRef={toolsRef}
                        getName={(item) => item.toolName}
                        getNameKr={(item) => item.toolNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                        className="technique"
                      />
                    )}

                    {/* 사용 잔 */}
                    {data.glassware.length > 0 && (
                      <CategorySlide
                        title="사용 잔"
                        items={data.glassware}
                        slideRef={glasswareRef}
                        getName={(item) => item.glassName}
                        getNameKr={(item) => item.glassNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                        className="technique"
                      />
                    )}

                    {/* 제조 기법 */}
                    {data.techniques.length > 0 && (
                      <CategorySlide
                        title="제조 기법"
                        items={data.techniques}
                        slideRef={methodsRef}
                        getName={(item) => item.techniqueName}
                        getNameKr={(item) => item.techniqueNameKr}
                        getImage={(item) => item.image}
                        getId={(item) => item.id}
                        className="technique"
                      />
                    )}
                  </TechniquesSection>
                </motion.div>

                {/* 제조법 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                  <SectionTitle>제조법</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.note || '' }} />
                </motion.div>

                {/* 제조 팁 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <SectionTitle>제조 팁</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.tip_note || '' }} />
                </motion.div>

                {/* 개인적인 정보들 */}
                {data.personalNotes && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 설명</PersonalTitle>
                      <PersonalContent>{data.personalNotes}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {data.MakerTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 팁</PersonalTitle>
                      <PersonalContent>{data.MakerTips}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {data.personalReview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 후기</PersonalTitle>
                      <PersonalContent>{data.personalReview}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {/* 해시태그 섹션 */}
                {data.hashtags && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <HashtagSection>
                      <HashtagTitle>태그</HashtagTitle>
                      <HashtagContainer>
                        <HashtagChip label={`#${data.hashtags.cocktailHashtag}`} size="small" />
                      </HashtagContainer>
                    </HashtagSection>
                  </motion.div>
                )}

                {/* 댓글 섹션 */}
                {data.comments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <CommentsSection>
                      <CommentsTitle>댓글 ({data.comments.length})</CommentsTitle>
                      {data.comments.map((comment) => (
                        <CommentItem key={comment.id}>
                          <CommentHeader>
                            <CommentAuthor>{comment.username}</CommentAuthor>
                            <CommentDate>{comment.createdDate}</CommentDate>
                          </CommentHeader>
                          <CommentContent>{comment.content}</CommentContent>
                          
                          {comment.replies && comment.replies.length > 0 && (
                            <RepliesContainer>
                              {comment.replies.map((reply) => (
                                <ReplyItem key={reply.id}>
                                  <CommentHeader>
                                    <CommentAuthor>{reply.username}</CommentAuthor>
                                    <CommentDate>{reply.createdDate}</CommentDate>
                                  </CommentHeader>
                                  <CommentContent>{reply.content}</CommentContent>
                                </ReplyItem>
                              ))}
                            </RepliesContainer>
                          )}
                        </CommentItem>
                      ))}
                    </CommentsSection>
                  </motion.div>
                )}
              </ContentSection>

              {/* 하단 섹션 */}
              <BottomSection>
                <ActionButtons>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionButton onClick={handleLikeClick}>
                      <ActionIcon actionType="like">
                        <FavoriteOutlined />
                      </ActionIcon>
                      <ActionText>좋아요</ActionText>
                      <ActionCount>{data.likeCount}</ActionCount>
                    </ActionButton>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionButton onClick={handleShareClick}>
                      <ActionIcon actionType="share">
                        <ShareOutlined />
                      </ActionIcon>
                      <ActionText>공유</ActionText>
                      <ActionCount>{data.shareCount}</ActionCount>
                    </ActionButton>
                  </motion.div>
                </ActionButtons>

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

export default CocktailDetailModal;

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
    margin: auto; /* 중앙 정렬을 위해 추가 */
    
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

const CocktailImage = styled(Box)`
  && {
    width: 440px;
    height: 440px;
    border-radius: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ffa726);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
    
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

const DifficultyChip = styled(Chip)<{ difficulty: number }>`
  && {
    background: ${({ difficulty }) => {
  switch(difficulty) {
    case 1: return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'; // 매우 쉬움 - 파란색
    case 2: return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'; // 쉬움 - 연두색
    case 3: return 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)'; // 보통 - 노란색
    case 4: return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'; // 어려움 - 주황색
    case 5: return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'; // 매우 어려움 - 빨간색
    default: return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'; // 기본값
  }
}};
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

const VariantChip = styled(Chip)`
  && {
    background: ${props => props.color === 'success' ?
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
};
    color: ${props => props.color === 'success' ? 'white' : '#8B4513'};
    font-weight: 600;
    border-radius: 20px;
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
    border-left: 4px solid #3498db;
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const ActionButtons = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 24px;
    
    @media (max-width: 600px) {
      gap: 16px;
    }
  }
`;

const ActionButton = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 16px;
    border-radius: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const ActionIcon = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== 'actionType'
})<{ actionType: 'like' | 'share' }>`
  && {
    background: ${({ actionType }) =>
    actionType === 'like'
        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
        : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
};
    color: white;
    width: 56px;
    height: 56px;
    
    &:hover {
      background: ${({ actionType }) =>
    actionType === 'like'
        ? 'linear-gradient(135deg, #ee5a24 0%, #d63031 100%)'
        : 'linear-gradient(135deg, #0984e3 0%, #2d3436 100%)'
};
      transform: scale(1.1);
    }
  }
`;

const ActionText = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

const ActionCount = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #7f8c8d;
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

// 새로운 슬라이드 재료/기법 섹션 스타일들
const IngredientsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
  }
`;

const TechniquesSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8ff 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(33, 150, 243, 0.2);
  }
`;

// 해시태그 스타일들
const HashtagSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #fff3e0 0%, #fffbf5 100%);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 152, 0, 0.2);
  }
`;

const HashtagContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
`;

const HashtagChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
    color: white;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 16px;
    
    &:hover {
      background: linear-gradient(135deg, #f57c00 0%, #ef6c00 100%);
    }
  }
`;

const HashtagTitle = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 600;
    color: #e65100;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '';
      width: 3px;
      height: 18px;
      background-color: #ff9800;
      border-radius: 2px;
    }
  }
`;

// 댓글 스타일들
const CommentsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #f3e5f5 0%, #faf7fb 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(156, 39, 176, 0.2);
  }
`;

const CommentItem = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CommentHeader = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const CommentAuthor = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 600;
    color: #7b1fa2;
  }
`;

const CommentDate = styled(Typography)`
  && {
    font-size: 0.8rem;
    color: #9e9e9e;
  }
`;

const CommentContent = styled(Typography)`
  && {
    font-size: 0.9rem;
    color: #424242;
    line-height: 1.5;
  }
`;

const RepliesContainer = styled(Box)`
  && {
    margin-top: 12px;
    margin-left: 16px;
    border-left: 2px solid #e1bee7;
    padding-left: 16px;
  }
`;

const ReplyItem = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CommentsTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    font-weight: 600;
    color: #7b1fa2;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '';
      width: 3px;
      height: 20px;
      background-color: #9c27b0;
      border-radius: 2px;
    }
  }
`;