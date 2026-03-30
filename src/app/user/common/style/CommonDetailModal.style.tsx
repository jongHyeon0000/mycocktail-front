import styled from "styled-components";
import { Box, Modal, Paper, Typography } from "@mui/material";

// ── 모달 래퍼 ──────────────────────────────────────────────────────────────

export const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

/** 800px — 도구·기법·잔·재료 계열 */
export const ModalContainer = styled(Paper)`
  && {
    max-width: 800px;
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

/** 1000px — 칵테일·기주 */
export const ModalContainerWide = styled(Paper)`
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

// ── 헤더 ───────────────────────────────────────────────────────────────────

export const HeaderSection = styled(Box)`
  && {
    position: relative;
    padding: 32px;

    @media (max-width: 600px) {
      padding: 24px;
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

// ── InfoGrid ───────────────────────────────────────────────────────────────

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

// ── 콘텐츠 섹션 ────────────────────────────────────────────────────────────

export const ContentSection = styled(Box)`
  && {
    padding: 24px 32px 32px;
    background: #f2f4f7;

    @media (max-width: 600px) {
      padding: 20px 24px 24px;
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
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

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

// ── 개인 섹션 ──────────────────────────────────────────────────────────────

export const PersonalSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 16px;
    border-left: 4px solid #818cf8;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const PersonalTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #818cf8;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const PersonalContent = styled(Typography)`
  && {
    line-height: 1.7;
    color: #374151;
    font-size: 0.95rem;
  }
`;

// ── 관련 칵테일 섹션 ───────────────────────────────────────────────────────

export const AvailableCocktailsSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;

// ── 하단 섹션 ──────────────────────────────────────────────────────────────

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

// ── 플레이버 미터 (기주·주스·시럽·탄산 등 공용) ──────────────────────────

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
