import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FavoriteOutlined,
  ShareOutlined,
  CloseOutlined,
  LocalBarOutlined,
  LocalBarRounded
} from "@mui/icons-material";
import {
  StyledModal,
  ModalContainer,
  CloseButton,
  HeaderSection,
  CocktailImage,
  PlaceholderIcon,
  TitleSection,
  EnglishTitle,
  KoreanTitle,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  CategoryChip,
  DifficultyChip,
  VariantChip,
  ProfileDescription,
  ContentSection,
  SectionTitle,
  TextContent,
  PersonalSection,
  PersonalTitle,
  PersonalContent,
  IngredientsSection,
  TechniquesSection,
  SlideContainer,
  SlideWrapper,
  SlideTrack,
  SlideItem,
  SlideItemImage,
  SlideItemPlaceholder,
  SlideItemEnglishName,
  SlideItemKoreanName,
  SlideCategoryTitle,
  HashtagSection,
  HashtagContainer,
  HashtagChip,
  HashtagTitle,
  CommentsSection,
  CommentItem,
  CommentHeader,
  CommentAuthor,
  CommentDate,
  CommentContent,
  RepliesContainer,
  ReplyItem,
  CommentsTitle,
  BottomSection,
  ActionButtons,
  ActionButton,
  ActionIcon,
  ActionText,
  ActionCount,
  DateInfo,
  DateText
} from "../style/CocktailDetailModal_Style";
import type {CocktailDetailModalProps} from "../interface/CocktailDetailModalProps.ts";

const CocktailDetailModal: React.FC<CocktailDetailModalProps> = ({
  open,
  onClose,
  data
}) => {
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '보통';
    }
  };

  const handleLikeClick = () => {
    console.log('좋아요 클릭');
  };

  const handleShareClick = () => {
    console.log('공유 클릭');
  };

  // 스크롤 슬라이드 렌더링 컴포넌트
  const renderScrollSlideSection = (
    title: string,
    items: Array<{ id: number; image?: string; englishName: string; koreanName: string; }>,
    isIngredient: boolean = true
  ) => {
    if (items.length === 0) return null;

    return (
      <div>
        <SlideCategoryTitle className={isIngredient ? '' : 'technique'}>
          {title}
        </SlideCategoryTitle>
        <SlideContainer>
          <SlideWrapper>
            <SlideTrack>
              {items.map((item) => (
                <SlideItem key={item.id}>
                  <SlideItemImage>
                    {item.image ? (
                      <img src={item.image} alt={item.englishName} />
                    ) : (
                      <SlideItemPlaceholder>
                        <LocalBarRounded fontSize="inherit" />
                      </SlideItemPlaceholder>
                    )}
                  </SlideItemImage>
                  <SlideItemEnglishName>{item.englishName}</SlideItemEnglishName>
                  <SlideItemKoreanName>{item.koreanName}</SlideItemKoreanName>
                </SlideItem>
              ))}
            </SlideTrack>
          </SlideWrapper>
        </SlideContainer>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <StyledModal
          open={open}
          onClose={onClose}
          closeAfterTransition
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              outline: 'none',
              border: 'none'
            }}
          >
            <ModalContainer>
              <CloseButton onClick={onClose}>
                <CloseOutlined />
              </CloseButton>

              {/* 헤더 섹션 */}
              <HeaderSection>
                <CocktailImage>
                  {data.image ? (
                    <img src={data.image} alt={data.englishName} />
                  ) : (
                    <PlaceholderIcon>
                      <LocalBarOutlined fontSize="inherit" />
                    </PlaceholderIcon>
                  )}
                </CocktailImage>

                <TitleSection>
                  <EnglishTitle>{data.englishName}</EnglishTitle>
                  <KoreanTitle>{data.koreanName}</KoreanTitle>
                </TitleSection>

                <InfoGrid>
                  <InfoCard>
                    <InfoLabel>카테고리</InfoLabel>
                    <CategoryChip label={data.category} size="small" />
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>예상 도수</InfoLabel>
                    <InfoValue>{data.alcoholContent}%</InfoValue>
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>난이도</InfoLabel>
                    <DifficultyChip 
                      difficulty={data.difficulty}
                      label={getDifficultyText(data.difficulty)} 
                      size="small" 
                    />
                  </InfoCard>
                  
                  <InfoCard>
                    <InfoLabel>변형 레시피</InfoLabel>
                    <VariantChip 
                      label={data.isVariant ? "파생 레시피" : "오리지널"}
                      size="small"
                      color={data.isVariant ? "default" : "success"}
                    />
                  </InfoCard>
                </InfoGrid>

                <ProfileDescription>
                  {data.profileDescription}
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
                  <TextContent dangerouslySetInnerHTML={{ __html: data.history }} />
                </motion.div>

                {/* 제조법 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SectionTitle>제조법</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.recipe }} />
                </motion.div>

                {/* 제조 팁 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SectionTitle>제조 팁</SectionTitle>
                  <TextContent dangerouslySetInnerHTML={{ __html: data.tips }} />
                </motion.div>

                {/* 개인적인 정보들 */}
                {data.personalDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 설명</PersonalTitle>
                      <PersonalContent>{data.personalDescription}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {data.personalTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 팁</PersonalTitle>
                      <PersonalContent>{data.personalTips}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {data.personalReview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 후기</PersonalTitle>
                      <PersonalContent>{data.personalReview}</PersonalContent>
                    </PersonalSection>
                  </motion.div>
                )}

                {/* 재료 정보 섹션 - 스크롤 슬라이드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <SectionTitle>사용 재료</SectionTitle>
                  <IngredientsSection>
                    {renderScrollSlideSection("기주", data.ingredients.spirits)}
                    {renderScrollSlideSection("주스", data.ingredients.juices)}
                    {renderScrollSlideSection("비터스", data.ingredients.bitters)}
                    {renderScrollSlideSection("시럽", data.ingredients.syrups)}
                    {renderScrollSlideSection("탄산/소다", data.ingredients.carbonated)}
                    {renderScrollSlideSection("유제품/크림", data.ingredients.dairy)}
                    {renderScrollSlideSection("가니쉬", data.ingredients.garnishes)}
                    {renderScrollSlideSection("기타", data.ingredients.others)}
                  </IngredientsSection>
                </motion.div>

                {/* 제조 기법 섹션 - 스크롤 슬라이드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <SectionTitle>제조 기법</SectionTitle>
                  <TechniquesSection>
                    {renderScrollSlideSection("도구/기물", data.techniques.tools, false)}
                    {renderScrollSlideSection("사용 잔", data.techniques.glassware, false)}
                    {renderScrollSlideSection("제조 기법", data.techniques.methods, false)}
                    {data.techniques.servingStyle && (
                      <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <SlideCategoryTitle className="technique">
                          서빙 스타일: {data.techniques.servingStyle}
                        </SlideCategoryTitle>
                      </div>
                    )}
                  </TechniquesSection>
                </motion.div>

                {/* 해시태그 섹션 */}
                {data.hashtags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <HashtagSection>
                      <HashtagTitle>태그</HashtagTitle>
                      <HashtagContainer>
                        {data.hashtags.map((tag, index) => (
                          <HashtagChip key={index} label={`#${tag}`} size="small" />
                        ))}
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
                            <CommentAuthor>{comment.author}</CommentAuthor>
                            <CommentDate>{comment.date}</CommentDate>
                          </CommentHeader>
                          <CommentContent>{comment.content}</CommentContent>
                          
                          {comment.replies && comment.replies.length > 0 && (
                            <RepliesContainer>
                              {comment.replies.map((reply) => (
                                <ReplyItem key={reply.id}>
                                  <CommentHeader>
                                    <CommentAuthor>{reply.author}</CommentAuthor>
                                    <CommentDate>{reply.date}</CommentDate>
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
                  <DateText>등록일: {data.createdAt}</DateText>
                  <DateText>최종 업데이트: {data.updatedAt}</DateText>
                </DateInfo>
              </BottomSection>
            </ModalContainer>
          </motion.div>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default CocktailDetailModal;
