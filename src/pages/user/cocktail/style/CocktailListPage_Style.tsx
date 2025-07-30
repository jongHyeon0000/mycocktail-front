// Styled Components
import styled from "styled-components";
import {Box, CardContent, Chip, Select, TextField, Typography} from "@mui/material";

export const PageContainer = styled(Box)`
  && {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-top: 96px;
  }
`;

export const ControlsContainer = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    gap: 16px;
    
    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
`;

export const SortSelect = styled(Select)`
  && {
    background-color: #fff;
    border-radius: 16px;
    min-width: 150px;
    
    .MuiOutlinedInput-notchedOutline {
      border-color: #eee;
    }
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #ddd;
    }
  }
`;

export const SearchField = styled(TextField)`
  && {
    width: 300px;
    background-color: #fff;
    
    .MuiOutlinedInput-root {
      border-radius: 16px;
      
      &:hover fieldset {
        border-color: #ddd;
      }
      
      &.Mui-focused fieldset {
        border-color: #888;
      }
    }
    
    & fieldset {
      border-color: #eee;
    }
    
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const CocktailList = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

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

export const CocktailTitle = styled(Typography)`
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

export const CocktailDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const CocktailAlcohol = styled(Typography)`
  && {
    color: #ff6b6b;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

export const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const DateText = styled(Typography)`
  && {
    color: #999;
    font-size: 0.875rem;
  }
`;

export const LikeText = styled(Typography)`
  && {
    color: #ff4757;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const NewChip = styled(Chip)`
  && {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #ff4757;
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
  }
`;