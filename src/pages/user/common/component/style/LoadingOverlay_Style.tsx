import styled from "styled-components";
import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";

export const LoadingBackdrop = styled(Backdrop)`
  color: #fff;
  z-index: 1400;
  backdrop-filter: blur(4px);
  flex-direction: column;
  gap: 16px;
`;

export const LoadingIconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMessage = styled(motion.div)`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
`;