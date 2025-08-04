// Styled Components for SpiritDetailModal
import styled from "styled-components";
import { Box, Typography, Chip, Modal, Paper } from "@mui/material";

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

export const HeaderSection = styled(Box)`
  && {
    position: relative;
    padding: 32px;
    
    @media (max-width: 600px) {
      padding: 24px;
    }
  }
`;

export const SpiritImage = styled(Box)`
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
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

// 플레이버 미터 관련 스타일들
export const FlavorMeterContainer = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const FlavorMeterBar = styled(Box)`
  && {
    flex: 1;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
`;

export const FlavorMeterFill = styled(Box)<{ level: number; color: string }>`
  && {
    height: 100%;
    width: ${({ level }) => (level / 5) * 100}%;
    background: linear-gradient(90deg, ${({ color }) => color} 0%, ${({ color }) => color}CC 100%);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

export const FlavorMeterLabel = styled(Typography)`
  && {
    font-size: 0.75rem;
    font-weight: 600;
    color: #6c757d;
    min-width: 24px;
  }
`;

export const SweetnessMeter = styled(FlavorMeterFill)``;
export const CitrusMeter = styled(FlavorMeterFill)``;
export const HerbMeter = styled(FlavorMeterFill)``;

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
    border-left: 4px solid #8B4513;
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
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
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

// 사용 칵테일 섹션 스타일들
export const CocktailsSection = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
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
    margin-bottom: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
`;

export const CategorySection = styled(Box)`
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