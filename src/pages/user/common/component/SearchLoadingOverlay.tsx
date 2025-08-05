import React from 'react';
import { CircularProgress } from "@mui/material";
import {SearchLoadingContainer, SearchLoadingMessage} from "./style/SearchLoadingOverlay_Style.tsx";

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