import React from 'react';
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import {motion} from "framer-motion";

interface SearchLoadingOverlayProps {
  open: boolean;
  message?: string;
}

const SearchLoadingOverlay: React.FC<SearchLoadingOverlayProps> = ({
  open,
  message = "검색 중..."
}) => {
  if (!open) return null;

  return (
    <SearchLoadingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <CircularProgress 
        size={32} 
        thickness={4}
        sx={{ color: '#1976d2' }}
      />
      
      <SearchLoadingMessage
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {message}
      </SearchLoadingMessage>
    </SearchLoadingContainer>
  );
};

export default SearchLoadingOverlay;

const SearchLoadingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 245, 245, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  z-index: 10;
  border-radius: 8px;
  height: 200px;
  width: 100%;
`;

const SearchLoadingMessage = styled(motion.div)`
  color: #666;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;