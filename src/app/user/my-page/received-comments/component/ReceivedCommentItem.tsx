import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { LocalBarOutlined, SubdirectoryArrowRightOutlined } from "@mui/icons-material";
import styled from "styled-components";
import type { UserComment } from "../../../cocktail/interface/UserComment.ts";

interface ReceivedCommentItemProps {
  comment: UserComment;
  index: number;
  onClick: () => void;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
};

const ReceivedCommentItem: React.FC<ReceivedCommentItemProps> = ({ comment, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
    >
      <CardWrapper onClick={onClick}>
        <AccentBar />

        <Thumbnail>
          {comment.cocktailImage ? (
            <img src={comment.cocktailImage} alt={comment.cocktailName} />
          ) : (
            <PlaceholderIcon>
              <LocalBarOutlined fontSize="small" />
            </PlaceholderIcon>
          )}
        </Thumbnail>

        <CocktailInfo>
          <CocktailNameRow>
            <CocktailNameEn>{comment.cocktailName}</CocktailNameEn>
            {comment.isChildComment && (
              <ReplyBadge>
                <SubdirectoryArrowRightOutlined sx={{ fontSize: 11 }} />
                답글
              </ReplyBadge>
            )}
          </CocktailNameRow>
          <CocktailNameKr>{comment.cocktailNameKr}</CocktailNameKr>
        </CocktailInfo>

        <CommentInfo>
          {comment.commentedBy && (
            <UserAvatar>
              {comment.commentedBy.thumbnailImage ? (
                <img src={comment.commentedBy.thumbnailImage} alt={comment.commentedBy.username} />
              ) : (
                <AvatarFallback>{comment.commentedBy.username.charAt(0)}</AvatarFallback>
              )}
            </UserAvatar>
          )}
          <CommentContent>
            {comment.commentedBy && (
              <CommentAuthor>{comment.commentedBy.username}</CommentAuthor>
            )}
            {comment.content}
          </CommentContent>
        </CommentInfo>

        <DateLabel>{formatDate(comment.createdAt)}</DateLabel>
      </CardWrapper>
    </motion.div>
  );
};

export default ReceivedCommentItem;

const CardWrapper = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #ffffff;
    border-radius: 14px;
    padding: 14px 20px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
      border-color: rgba(102, 126, 234, 0.3);
    }
  }
`;

const AccentBar = styled(Box)`
  && {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    border-radius: 14px 0 0 14px;
  }
`;

const Thumbnail = styled(Box)`
  && {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #ff6b6b, #ffa726);
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

const PlaceholderIcon = styled(Box)`
  && {
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CocktailInfo = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 130px;
    max-width: 160px;
    flex-shrink: 0;
  }
`;

const CocktailNameRow = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
`;

const CocktailNameEn = styled(Typography)`
  && {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
`;

const CocktailNameKr = styled(Typography)`
  && {
    font-size: 0.78rem;
    color: #94a3b8;
    font-weight: 500;
    line-height: 1;
  }
`;

const ReplyBadge = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px 7px;
    background: #f1f5f9;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #64748b;
    white-space: nowrap;
  }
`;

const CommentInfo = styled(Box)`
  && {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const UserAvatar = styled(Box)`
  && {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const AvatarFallback = styled(Typography)`
  && {
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
    line-height: 1;
  }
`;

const CommentContent = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.55;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    min-width: 0;
  }
`;

const CommentAuthor = styled.strong`
  color: #1e293b;
  font-weight: 700;
  margin-right: 4px;
`;

const DateLabel = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #cbd5e1;
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 500;
  }
`;