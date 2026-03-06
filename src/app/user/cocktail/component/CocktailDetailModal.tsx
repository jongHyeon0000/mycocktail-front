import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FavoriteOutlined,
  ShareOutlined,
  LocalBarOutlined,
  SendOutlined,
  SubdirectoryArrowRightOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {COMMON_MODAL_STYLE} from "../../common/style/CommonModal.style.ts";
import useAuth from "../../auth/service/useAuth.ts";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import styled from "styled-components";
import {Box, Chip, IconButton, Typography} from "@mui/material";
import CocktailIngredientsSection from "./CocktailIngredientsSection.tsx";
import CocktailTechniquesSection from "./CocktailTechniquesSection.tsx";
import {
  StyledModal, ModalContainerWide, HeaderSection, PlaceholderIcon,
  TitleSection, EnglishTitle, KoreanTitle, InfoGrid, InfoCard, InfoLabel, InfoValue,
  ProfileDescription, ContentSection, SectionTitle, TextContent,
  PersonalSection, PersonalTitle, PersonalContent,
  BottomSection, DateInfo, DateText,
} from "../../common/style/CommonDetailModal.style.tsx";

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
  const [activeSection, setActiveSection] = useState<'ingredients' | 'techniques'>('ingredients');
  const [slideDirection, setSlideDirection] = useState(1);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (open) {
      setActiveSection('ingredients');
    }
  }, [open]);

  const handleSectionSwitch = (target: 'ingredients' | 'techniques') => {
    if (target === activeSection) return;
    setSlideDirection(target === 'techniques' ? 1 : -1);
    setActiveSection(target);
  };

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
          <ModalContainerWide
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
                  {data.author && (
                    <AuthorSection>
                      <AuthorAvatar>
                        {data.author.thumbnailImage ? (
                          <img src={data.author.thumbnailImage} alt={data.author.username} />
                        ) : (
                          <AuthorAvatarFallback>
                            {data.author.username.charAt(0)}
                          </AuthorAvatarFallback>
                        )}
                      </AuthorAvatar>
                      <AuthorInfo>
                        <AuthorLabel>등록자</AuthorLabel>
                        <AuthorName>{data.author.username}</AuthorName>
                      </AuthorInfo>
                    </AuthorSection>
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
                    <InfoLabel>제공량</InfoLabel>
                    <InfoValue>{data.servingSizeMl}ml</InfoValue>
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

                {/* 재료 / 제조 기법 토글 섹션 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SectionHeaderRow>
                    <SectionTitle style={{ marginBottom: 0 }}>
                      {activeSection === 'ingredients' ? '사용 재료' : '제조 기법'}
                    </SectionTitle>
                    <SectionSegmentedControl>
                      <SegmentOption
                        active={activeSection === 'ingredients'}
                        onClick={() => handleSectionSwitch('ingredients')}
                      >
                        재료
                      </SegmentOption>
                      <SegmentOption
                        active={activeSection === 'techniques'}
                        onClick={() => handleSectionSwitch('techniques')}
                      >
                        기법
                      </SegmentOption>
                    </SectionSegmentedControl>
                  </SectionHeaderRow>

                  <div style={{ overflow: 'hidden' }}>
                    <AnimatePresence mode="wait" custom={slideDirection}>
                      {activeSection === 'ingredients' ? (
                        <motion.div
                          key="ingredients"
                          custom={slideDirection}
                          initial={{ opacity: 0, x: slideDirection * 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -slideDirection * 60 }}
                          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <CocktailIngredientsSection
                            spiritCategories={data.spiritCategories}
                            ingredients={data.ingredients}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="techniques"
                          custom={slideDirection}
                          initial={{ opacity: 0, x: slideDirection * 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -slideDirection * 60 }}
                          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <CocktailTechniquesSection
                            tools={data.tools}
                            glassware={data.glassware}
                            techniques={data.techniques}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                  <TextContent dangerouslySetInnerHTML={{ __html: data.tipNote || '' }} />
                </motion.div>

                {/* 사용자 의견 */}
                {(data.personalNotes || data.makerTips || data.personalReview) && (
                  <SectionTitle>사용자 의견</SectionTitle>
                )}
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

                {data.makerTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <PersonalSection>
                      <PersonalTitle>개인적인 팁</PersonalTitle>
                      <PersonalContent>{data.makerTips}</PersonalContent>
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
                    <SectionTitle>태그</SectionTitle>
                    <HashtagSection>
                      <HashtagContainer>
                        <HashtagChip label={`#${data.hashtags.cocktailHashtag}`} size="small" />
                      </HashtagContainer>
                    </HashtagSection>
                  </motion.div>
                )}

              </ContentSection>

              {/* 댓글 섹션 (회색 밖) */}
              <CommentsWrapper>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SectionTitle>댓글 ({data.comments.length})</SectionTitle>

                  <CommentsSection>
                    {/* 댓글 목록 */}
                    {data.comments.map((comment) => (
                      <CommentItem key={comment.commentId}>
                        <CommentAuthorRow>
                          <CommentAvatar>
                            {comment.author.thumbnailImage
                              ? <img src={comment.author.thumbnailImage} alt={comment.author.username} />
                              : <CommentAvatarFallback>{comment.author.username.charAt(0)}</CommentAvatarFallback>
                            }
                          </CommentAvatar>
                          <CommentMeta>
                            <CommentAuthorName>{comment.author.username}</CommentAuthorName>
                            <CommentDate>{new Date(comment.createdAt).toLocaleDateString('ko-KR')}</CommentDate>
                          </CommentMeta>
                        </CommentAuthorRow>
                        <CommentContent>{comment.content}</CommentContent>

                        {isAuthenticated && (
                          <ReplyButton onClick={() => setReplyingTo(replyingTo === comment.commentId ? null : comment.commentId)}>
                            <SubdirectoryArrowRightOutlined sx={{ fontSize: 14 }} />
                            답글
                          </ReplyButton>
                        )}

                        {/* 답글 작성 폼 */}
                        <AnimatePresence>
                          {replyingTo === comment.commentId && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ReplyInputArea>
                                <CommentAvatar small>
                                  {user?.thumbnailImage
                                    ? <img src={user.thumbnailImage} alt={user.username} />
                                    : <CommentAvatarFallback>{user?.username.charAt(0)}</CommentAvatarFallback>
                                  }
                                </CommentAvatar>
                                <ReplyInputBox>
                                  <CommentTextarea placeholder="답글을 입력하세요..." rows={2} />
                                  <ReplyInputActions>
                                    <CancelButton onClick={() => setReplyingTo(null)}>
                                      <CloseOutlined sx={{ fontSize: 14 }} />
                                      취소
                                    </CancelButton>
                                    <SubmitButton>
                                      <SendOutlined sx={{ fontSize: 14 }} />
                                      등록
                                    </SubmitButton>
                                  </ReplyInputActions>
                                </ReplyInputBox>
                              </ReplyInputArea>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* 기존 답글 목록 */}
                        {comment.replies && comment.replies.length > 0 && (
                          <RepliesContainer>
                            {comment.replies.map((reply) => (
                              <ReplyItem key={reply.commentId}>
                                <CommentAuthorRow>
                                  <CommentAvatar small>
                                    {reply.author.thumbnailImage
                                      ? <img src={reply.author.thumbnailImage} alt={reply.author.username} />
                                      : <CommentAvatarFallback>{reply.author.username.charAt(0)}</CommentAvatarFallback>
                                    }
                                  </CommentAvatar>
                                  <CommentMeta>
                                    <CommentAuthorName>{reply.author.username}</CommentAuthorName>
                                    <CommentDate>{new Date(reply.createdAt).toLocaleDateString('ko-KR')}</CommentDate>
                                  </CommentMeta>
                                </CommentAuthorRow>
                                <CommentContent reply>{reply.content}</CommentContent>
                              </ReplyItem>
                            ))}
                          </RepliesContainer>
                        )}
                      </CommentItem>
                    ))}

                    {/* 새 댓글 작성 - 로그인 시에만 노출 */}
                    {isAuthenticated && (
                      <NewCommentInputArea>
                        <CommentAvatar>
                          {user?.thumbnailImage
                            ? <img src={user.thumbnailImage} alt={user.username} />
                            : <CommentAvatarFallback>{user?.username.charAt(0)}</CommentAvatarFallback>
                          }
                        </CommentAvatar>
                        <CommentInputBox>
                          <CommentTextarea placeholder="댓글을 입력하세요..." rows={3} />
                          <CommentInputActions>
                            <SubmitButton>
                              <SendOutlined sx={{ fontSize: 14 }} />
                              댓글 등록
                            </SubmitButton>
                          </CommentInputActions>
                        </CommentInputBox>
                      </NewCommentInputArea>
                    )}
                  </CommentsSection>
                </motion.div>
              </CommentsWrapper>

              {/* 하단 섹션 */}
              <BottomSection>
                <ActionButtons>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ActionButton onClick={handleLikeClick}>
                      <ActionIcon actionType="like"><FavoriteOutlined /></ActionIcon>
                      <ActionText>좋아요</ActionText>
                      <ActionCount>{data.likeCount}</ActionCount>
                    </ActionButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ActionButton onClick={handleShareClick}>
                      <ActionIcon actionType="share"><ShareOutlined /></ActionIcon>
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
            </ModalContainerWide>
        </StyledModal>
      )}
    </AnimatePresence>
  );
};

export default CocktailDetailModal;

const CocktailImage = styled(Box)`
  && {
    position: relative;
    width: 480px;
    height: 480px;
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

const AuthorSection = styled(Box)`
  && {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 20px 5px 6px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 40px;
    z-index: 1;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }
`;

const AuthorAvatar = styled(Box)`
  && {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const AuthorAvatarFallback = styled(Typography)`
  && {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    line-height: 1;
  }
`;

const AuthorInfo = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const AuthorLabel = styled(Typography)`
  && {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.65);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    line-height: 1;
  }
`;

const AuthorName = styled(Typography)`
  && {
    font-size: 1.05rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
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

const ActionButtons = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 20px;

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

// 섹션 토글 헤더
const SectionHeaderRow = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
`;

const SectionSegmentedControl = styled(Box)`
  && {
    display: flex;
    background: #e2e6ea;
    border-radius: 12px;
    padding: 3px;
    gap: 2px;
  }
`;

const SegmentOption = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  && {
    padding: 6px 18px;
    border-radius: 9px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;
    background: ${({ active }) => active ? '#ffffff' : 'transparent'};
    color: ${({ active }) => active ? '#2c3e50' : '#9ca3af'};
    box-shadow: ${({ active }) => active ? '0 1px 6px rgba(0,0,0,0.12)' : 'none'};
  }
`;

// 해시태그 스타일들
const HashtagSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;

const HashtagContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const HashtagChip = styled(Chip)`
  && {
    background: #1e293b;
    color: #f1f5f9;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 20px;

    &:hover {
      background: #334155;
    }
  }
`;

const CommentsWrapper = styled(Box)`
  && {
    padding: 28px 32px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
      padding: 20px 24px;
    }
  }
`;

// 댓글 스타일들
const CommentsSection = styled(Box)`
  && {
    background: #edf0f7;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    border: 1px solid #d8dde8;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const CommentItem = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
`;

const CommentAuthorRow = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
`;

const CommentAvatar = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>`
  && {
    width: ${({ small }) => small ? '30px' : '36px'};
    height: ${({ small }) => small ? '30px' : '36px'};
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const CommentAvatarFallback = styled(Typography)`
  && {
    font-size: 0.85rem;
    font-weight: 700;
    color: white;
    line-height: 1;
  }
`;

const CommentMeta = styled(Box)`
  && {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex: 1;
  }
`;

const CommentAuthorName = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 700;
    color: #2c3e50;
  }
`;

const CommentDate = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #adb5bd;
    font-weight: 400;
  }
`;

const CommentContent = styled(Typography).withConfig({
  shouldForwardProp: (prop) => prop !== 'reply',
})<{ reply?: boolean }>`
  && {
    font-size: 0.9rem;
    color: #374151;
    line-height: 1.65;
    padding-left: ${({ reply }) => reply ? '0' : '46px'};
  }
`;

const RepliesContainer = styled(Box)`
  && {
    margin-top: 12px;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const ReplyItem = styled(Box)`
  && {
    background: #dde2ef;
    border-radius: 10px;
    padding: 12px 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ReplyButton = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    margin-left: 46px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #9ca3af;
    cursor: pointer;
    user-select: none;
    transition: color 0.15s ease;

    &:hover {
      color: #667eea;
    }
  }
`;

const NewCommentInputArea = styled(Box)`
  && {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding-top: 16px;
    border-top: 1px solid #d8dde8;
    margin-top: 4px;
  }
`;

const ReplyInputArea = styled(Box)`
  && {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-top: 10px;
    margin-left: 46px;
    overflow: hidden;
  }
`;

const CommentInputBox = styled(Box)`
  && {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const ReplyInputBox = styled(Box)`
  && {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  resize: none;
  border: 1.5px solid #e2e6ea;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #2c3e50;
  background: #f8f9fa;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #adb5bd;
  }

  &:focus {
    border-color: #667eea;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.12);
  }
`;

const CommentInputActions = styled(Box)`
  && {
    display: flex;
    justify-content: flex-end;
  }
`;

const ReplyInputActions = styled(Box)`
  && {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
`;

const SubmitButton = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.2s ease, transform 0.15s ease;

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const CancelButton = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 8px 14px;
    border-radius: 20px;
    background: #e9ecef;
    color: #6c757d;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;

    &:hover {
      background: #dee2e6;
    }
  }
`;