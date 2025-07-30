// Styled Components for CocktailDetailModal
import styled from "styled-components";
import { Box, Typography, IconButton, Chip, Modal, Paper } from "@mui/material";

export const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

export const ModalContainer = styled(Paper)`
  && {
    max-width: 1000px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    
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

export const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.95);
    }
  }
`;

export const HeaderSection = styled(Box)`
  && {
    position: relative;
    padding: 32px;
    
    @media (max-width: 600px) {
      padding: 24px;
    }
  }
`;

export const CocktailImage = styled(Box)`
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

export const PlaceholderIcon = styled(Box)`
  && {
    font-size: 64px;
    color: white;
    
    @media (max-width: 600px) {
      font-size: 48px;
    }
  }
`;

export const TitleSection = styled(Box)`
  && {
    text-align: center;
    margin-bottom: 24px;
  }
`;

export const EnglishTitle = styled(Typography)`
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

export const KoreanTitle = styled(Typography)`
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

export const InfoGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
`;

export const InfoCard = styled(Box)`
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

export const InfoLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #7f8c8d;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const InfoValue = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const CategoryChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

export const DifficultyChip = styled(Chip)<{ difficulty: 'easy' | 'medium' | 'hard' }>`
  && {
    background: ${({ difficulty }) => 
      difficulty === 'easy' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' :
      difficulty === 'medium' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' :
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

export const VariantChip = styled(Chip)`
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

export const ProfileDescription = styled(Typography)`
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

export const ContentSection = styled(Box)`
  && {
    padding: 0 32px 32px;
    
    @media (max-width: 600px) {
      padding: 0 24px 24px;
    }
  }
`;

export const SectionTitle = styled(Typography)`
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

export const TextContent = styled(Box)`
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

export const PersonalSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export const PersonalTitle = styled(Typography)`
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

export const PersonalContent = styled(Typography)`
  && {
    line-height: 1.6;
    color: #2d3436;
    font-size: 0.95rem;
  }
`;

export const BottomSection = styled(Box)`
  && {
    padding: 24px 32px 32px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(248, 249, 250, 0.8);
    
    @media (max-width: 600px) {
      padding: 20px 24px 24px;
    }
  }
`;

export const ActionButtons = styled(Box)`
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

export const ActionButton = styled(Box)`
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

export const ActionIcon = styled(IconButton).withConfig({
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

export const ActionText = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const ActionCount = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #7f8c8d;
  }
`;

export const DateInfo = styled(Box)`
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

export const DateText = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #7f8c8d;
    font-weight: 500;
  }
`;

// 새로운 슬라이드 재료/기법 섹션 스타일들
export const IngredientsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
  }
`;

export const TechniquesSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8ff 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(33, 150, 243, 0.2);
  }
`;

export const SlideContainer = styled(Box)`
  && {
    margin-top: 16px;
    position: relative;
  }
`;

export const SlideWrapper = styled(Box)`
  && {
    overflow-x: auto;
    overflow-y: hidden;
    border-radius: 12px;
    padding: 8px 0;
    
    /* 스크롤바 스타일링 (PC용) */
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }
    }
    
    /* Firefox */
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
    
    /* 모바일 터치 스크롤 개선 */
    -webkit-overflow-scrolling: touch;
  }
`;

export const SlideTrack = styled(Box)`
  && {
    display: flex;
    gap: 16px;
    padding: 0 16px;
    width: max-content;
  }
`;

export const SlideItem = styled(Box)`
  && {
    min-width: 140px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
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

export const SlideItemImage = styled(Box)`
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
    }
    
    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
    }
  }
`;

export const SlideItemPlaceholder = styled(Box)`
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

export const SlideItemEnglishName = styled(Typography)`
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

export const SlideItemKoreanName = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #6c757d;
    line-height: 1.2;
    
    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
`;

export const SlideCategoryTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #2e7d32;
    margin-bottom: 16px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(76, 175, 80, 0.3);
    
    &.technique {
      color: #1565c0;
      border-color: rgba(33, 150, 243, 0.3);
    }
  }
`;

// 해시태그 스타일들
export const HashtagSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #fff3e0 0%, #fffbf5 100%);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(255, 152, 0, 0.2);
  }
`;

export const HashtagContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
`;

export const HashtagChip = styled(Chip)`
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

export const HashtagTitle = styled(Typography)`
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
export const CommentsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #f3e5f5 0%, #faf7fb 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(156, 39, 176, 0.2);
  }
`;

export const CommentItem = styled(Box)`
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

export const CommentHeader = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

export const CommentAuthor = styled(Typography)`
  && {
    font-size: 0.9rem;
    font-weight: 600;
    color: #7b1fa2;
  }
`;

export const CommentDate = styled(Typography)`
  && {
    font-size: 0.8rem;
    color: #9e9e9e;
  }
`;

export const CommentContent = styled(Typography)`
  && {
    font-size: 0.9rem;
    color: #424242;
    line-height: 1.5;
  }
`;

export const RepliesContainer = styled(Box)`
  && {
    margin-top: 12px;
    margin-left: 16px;
    border-left: 2px solid #e1bee7;
    padding-left: 16px;
  }
`;

export const ReplyItem = styled(Box)`
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

export const CommentsTitle = styled(Typography)`
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

