import { Box, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

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

export const ImageSection = styled(Box)`
  && {
    flex: 0 0 200px;

    @media (max-width: 600px) {
      flex: 0 0 120px;
    }
  }
` as typeof Box;

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
` as typeof Box;

export const ItemTitle = styled(Typography)`
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

export const ItemDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const CategoryBadge = styled(Typography)`
  && {
    color: #2c3e50;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 4px 12px;
    background-color: #ecf0f1;
    border-radius: 16px;
    display: inline-block;
    width: fit-content;
  }
`;
