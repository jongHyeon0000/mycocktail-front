import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FavoriteOutlined,
  ShareOutlined,
  LocalBarOutlined,
  LocalBarRounded
} from "@mui/icons-material";
import {
  StyledModal,
  ModalContainer,
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
  CategorySection,
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
} from "./style/CocktailDetailModal_Style";
import {COMMON_DRAG_STYLE} from "../../common/style/CommonDragStyle.ts";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModalStyle.ts";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";

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
                    <InfoValue>{data.abs_percentage}%</InfoValue>
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
                      <CategorySection>
                        <SlideCategoryTitle>기주</SlideCategoryTitle>
                        <SlideContainer ref={spiritsRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(spiritsRef)}>
                              {data.ingredients.spirits.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.spiritName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.spiritName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.spiritNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 주스 */}
                    {data.ingredients.juices.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>주스</SlideCategoryTitle>
                        <SlideContainer ref={juicesRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(juicesRef)}>
                              {data.ingredients.juices.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.juiceName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.juiceName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.juiceNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 비터스 */}
                    {data.ingredients.bitters.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>비터스</SlideCategoryTitle>
                        <SlideContainer ref={bittersRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(bittersRef)}>
                              {data.ingredients.bitters.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.bitterName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.bitterName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.bitterNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 시럽 */}
                    {data.ingredients.syrups.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>시럽</SlideCategoryTitle>
                        <SlideContainer ref={syrupsRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(syrupsRef)}>
                              {data.ingredients.syrups.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.syrupName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.syrupName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.syrupNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 탄산/소다 */}
                    {data.ingredients.carbonated.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>탄산/소다</SlideCategoryTitle>
                        <SlideContainer ref={carbonatedRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(carbonatedRef)}>
                              {data.ingredients.carbonated.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.carbonatedName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.carbonatedName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.carbonatedNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 유제품/크림 */}
                    {data.ingredients.dairy.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>유제품/크림</SlideCategoryTitle>
                        <SlideContainer ref={dairyRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(dairyRef)}>
                              {data.ingredients.dairy.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.dairyName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.dairyName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.dairyNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 가니쉬 */}
                    {data.ingredients.garnishes.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>가니쉬</SlideCategoryTitle>
                        <SlideContainer ref={garnishesRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(garnishesRef)}>
                              {data.ingredients.garnishes.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.garnishName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.garnishName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.garnishNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 기타 */}
                    {data.ingredients.others.length > 0 && (
                      <CategorySection>
                        <SlideCategoryTitle>기타</SlideCategoryTitle>
                        <SlideContainer ref={othersRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(othersRef)}>
                              {data.ingredients.others.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.otherIngredientName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.otherIngredientName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.otherIngredientNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
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
                      <CategorySection className="technique">
                        <SlideCategoryTitle className="technique">도구/기물</SlideCategoryTitle>
                        <SlideContainer ref={toolsRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(toolsRef)}>
                              {data.tools.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.toolName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.toolName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.toolNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 사용 잔 */}
                    {data.glassware.length > 0 && (
                      <CategorySection className="technique">
                        <SlideCategoryTitle className="technique">사용 잔</SlideCategoryTitle>
                        <SlideContainer ref={glasswareRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(glasswareRef)}>
                              {data.glassware.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.glassName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.glassName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.glassNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
                    )}

                    {/* 제조 기법 */}
                    {data.techniques.length > 0 && (
                      <CategorySection className="technique">
                        <SlideCategoryTitle className="technique">제조 기법</SlideCategoryTitle>
                        <SlideContainer ref={methodsRef}>
                          <SlideWrapper>
                            <SlideTrack {...COMMON_DRAG_STYLE(methodsRef)}>
                              {data.techniques.map((item) => (
                                <SlideItem 
                                  key={item.id}
                                  as={motion.div}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SlideItemImage>
                                    {item.image ? (
                                      <img src={item.image} alt={item.techniqueName} />
                                    ) : (
                                      <SlideItemPlaceholder>
                                        <LocalBarRounded fontSize="inherit" />
                                      </SlideItemPlaceholder>
                                    )}
                                  </SlideItemImage>
                                  <SlideItemEnglishName>{item.techniqueName}</SlideItemEnglishName>
                                  <SlideItemKoreanName>{item.techniqueNameKr}</SlideItemKoreanName>
                                </SlideItem>
                              ))}
                            </SlideTrack>
                          </SlideWrapper>
                        </SlideContainer>
                      </CategorySection>
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