import React from 'react';
import { CircularProgress } from "@mui/material";
import {LoadingBackdrop, LoadingIconContainer, LoadingMessage} from "./style/LoadingOverlay_Style.tsx";

interface LoadingOverlayProps {
  open: boolean;
  size?: number;
  thickness?: number;
  color?: string;
  backdropColor?: string;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  open,
  size = 80,
  thickness = 4,
  color = '#1976d2',
  backdropColor = 'rgba(0, 0, 0, 0.3)',
  message
}) => {
  if (!open) return null;

  return (
    <LoadingBackdrop
      open={open}
      style={{ backgroundColor: backdropColor }}
    >
      <LoadingIconContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CircularProgress 
          size={size} 
          thickness={thickness}
          sx={{ color }}
        />
      </LoadingIconContainer>
      
      {message && (
        <LoadingMessage
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {message}
        </LoadingMessage>
      )}
    </LoadingBackdrop>
  );
};

export default LoadingOverlay;