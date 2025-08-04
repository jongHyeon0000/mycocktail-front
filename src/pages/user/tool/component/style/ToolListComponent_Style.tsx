// Styled Components for ToolListComponent
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

export const ToolTitle = styled(Typography)`
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

export const ToolDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const ToolCategory = styled(Typography)`
  && {
    color: #2C3E50;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 4px 12px;
    background-color: #ECF0F1;
    border-radius: 16px;
    display: inline-block;
    width: fit-content;
  }
`;

export const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
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
