import styled from "styled-components";
import {motion} from "framer-motion";

export const SearchLoadingContainer = styled(motion.div)`
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

export const SearchLoadingMessage = styled(motion.div)`
  color: #666;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
`;