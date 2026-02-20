import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import {MY_PAGE_SUB_ROUTES} from "../../../../route/MyPageRoutes.tsx";

const MyPageSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SidebarContainer>
        {/* 타이틀 */}
        <SidebarTitle variant="h5">마이페이지</SidebarTitle>

        {/* 메뉴 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <MenuContainer>
            {/* 마이페이지 서브 라우트 사용 */}
            {MY_PAGE_SUB_ROUTES.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ x: 4 }}
                >
                  <MenuItem
                    onClick={() => handleMenuClick(item.path)}
                    className={isActive ? "active" : ""}
                  >
                    <MenuLabel className={isActive ? "active" : ""}>
                      {item.nameKr}
                    </MenuLabel>
                  </MenuItem>
                </motion.div>
              );
            })}
          </MenuContainer>
        </motion.div>
      </SidebarContainer>
    </motion.div>
  );
};

export default MyPageSidebar;

const SidebarContainer = styled(Box)`
  && {
    width: 250px;
    padding: 0 16px;

    @media (max-width: 900px) {
      width: 100%;
      padding: 0 16px 24px;
    }
  }
`;

const SidebarTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
    padding-left: 4px;
  }
`;

const MenuContainer = styled(Box)`
  && {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const MenuItem = styled(Box)`
  && {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    margin-bottom: 4px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    &.active {
      background-color: #f5f5f5;
      border-left-color: #333;
    }
  }
`;

const MenuLabel = styled(Typography)`
  && {
    font-size: 15px;
    color: #666;
    font-weight: 500;
    transition: all 0.2s ease;

    &.active {
      color: #333;
      font-weight: 600;
    }
  }
`;