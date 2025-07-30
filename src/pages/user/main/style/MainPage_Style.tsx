// Styled Components (정적 스타일만)
import styled from "styled-components";
import {Box, Container, IconButton, TextField, Typography} from "@mui/material";

export const MainContainer = styled(Box)`
  && {
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
`;

export const ContentContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 88px;
    flex: 1;
    
    @media (min-width: 600px) {
      padding-top: 112px;
    }
    
    @media (min-width: 900px) {
      padding-top: 128px;
    }
    
    @media (min-width: 1200px) {
      padding-top: 144px;
    }
  }
`;

export const SearchTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 16px;
      background-color: #f5f5f5;
      
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
  }
`;

export const BottomNavigation = styled(Box)`
  && {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: auto;
    padding-bottom: 32px;
    
    @media (min-width: 900px) {
      position: absolute;
      bottom: 40px;
      margin-top: 0;
      padding-bottom: 0;
    }
  }
`;

export const NavIconButton = styled(IconButton)`
  && {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      background-color: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
  }
`;

export const NavLabel = styled(Typography)`
  && {
    margin-top: 8px;
    font-size: 0.7rem;
    color: #666;
    text-align: center;
    max-width: 70px;
  }
`;