// Styled Components (정적 스타일만)
import styled from "styled-components";
import {AppBar, Avatar, Box, Button, Chip, Toolbar, Typography} from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  && {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

export const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 56px;
    justify-content: space-between;
    
    @media (min-width: 600px) {
      min-height: 64px;
    }
  }
`;

export const MenuContainer = styled(Box)`
  && {
    display: flex;
    gap: 16px;
    
    @media (min-width: 600px) {
      gap: 24px;
    }
    
    @media (min-width: 900px) {
      gap: 32px;
    }
  }
`;

export const ProfileImage = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    border: 3px solid rgba(0, 0, 0, 0.08);
  }
`;

export const UserName = styled(Typography)`
  && {
    text-align: center;
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

export const JoinDate = styled(Typography)`
  && {
    text-align: center;
    color: #666;
    margin-bottom: 24px;
  }
`;

export const IntroTitle = styled(Typography)`
  && {
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

export const IntroText = styled(Typography)`
  && {
    color: #666;
    line-height: 1.6;
  }
`;

export const MyPageButton = styled(Button)`
  && {
    padding: 12px 0;
    margin-bottom: 16px;
    border-radius: 16px;
    border-color: #ddd;
    color: #333;
    
    &:hover {
      border-color: #333;
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
`;

export const ActiveChip = styled(Chip)`
  && {
    background-color: #4caf50;
    color: white;
    font-weight: 500;
  }
`;