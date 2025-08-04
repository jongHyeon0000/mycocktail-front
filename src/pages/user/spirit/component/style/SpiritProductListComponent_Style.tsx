// Styled Components for SpiritListComponent
import styled from "styled-components";
import {Box, CardContent, Typography} from "@mui/material";

export const CardContentArea = styled(CardContent)`
  && {
    padding: 0;
    display: flex;
    height: 200px;
    
    &:last-child {
      padding-bottom: 0;
    }
    
    @media (max-width: 600px) {
      height: 180px;
    }
  }
`;

export const ContentSection = styled(Box)`
  && {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  }
`;

export const SpiritTitle = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 8px;
    
    @media (max-width: 600px) {
      font-size: 1.25rem;
    }
  }
`;

export const SpiritDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const SpiritAlcohol = styled(Typography)`
  && {
    color: #8B4513;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

export const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const DateText = styled(Typography)`
  && {
    color: #999;
    font-size: 0.875rem;
    align-self: flex-end;
  }
`;

export const DiscontinuedText = styled(Typography)<{ isDiscontinued: boolean }>`
  && {
    color: ${props => props.isDiscontinued ? '#ff4757' : '#2ed573'};
    font-size: 0.875rem;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
  }
`;

export const PriceText = styled(Typography)`
  && {
    color: #333;
    font-size: 0.875rem;
    font-weight: 500;
    display: block;
  }
`;