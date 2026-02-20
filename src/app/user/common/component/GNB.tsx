import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Avatar,
  IconButton,
  Divider, AppBar, Toolbar, Button, Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {APP_ROUTES} from "../../../../route/RoutesConfig.tsx";
import styled from "styled-components";

const GNB: React.FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <StyledAppBar position="fixed" elevation={0}>
        <StyledToolbar>
          <MenuContainer>
            {APP_ROUTES.filter(
                item => item.type === 'gnb' || item.type === 'root'
            ).map((item, index) => (
                <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {item.nameKr === "재료" ? (
                      <Box
                          onMouseEnter={() => setIsSubMenuOpen(true)}
                          onMouseLeave={() => setIsSubMenuOpen(false)}
                          sx={{ position: "relative" }}
                      >
                        <Typography
                            component="span"
                            onClick={() => navigate(item.path)}
                            sx={{
                              color: "#333",
                              fontWeight: 500,
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                              textDecoration: "none",
                              cursor: "pointer",
                              position: "relative",
                              display: "inline-block",
                              py: 1,
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                width: "0%",
                                height: "2px",
                                bottom: 0,
                                left: "50%",
                                backgroundColor: "#333",
                                transition: "all 0.3s ease",
                                transform: "translateX(-50%)",
                              },
                              "&:hover": {
                                color: "#000",
                              },
                              "&:hover::after": {
                                width: "80%",
                              },
                            }}
                        >
                          {item.nameKr}
                        </Typography>
                        <AnimatePresence>
                          {isSubMenuOpen && (
                              <Paper
                                  component={motion.div}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  elevation={3}
                                  sx={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    mt: 1,
                                    minWidth: 180,
                                    borderRadius: 2,
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                                    backgroundColor: "#fff",
                                    zIndex: 1000,
                                  }}
                              >
                                <Box sx={{ py: 1 }}>
                                  {APP_ROUTES.filter(subItem => subItem.type === 'gnb-ingredients').map((subItem, subIndex) => (
                                      <Box
                                          key={subIndex}
                                          component={motion.div}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: subIndex * 0.03 }}
                                          onClick={() => navigate(subItem.path)}
                                          sx={{
                                            px: 2,
                                            py: 1.5,
                                            fontSize: "0.875rem",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s",
                                            "&:hover": {
                                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                          }}
                                      >
                                        {subItem.nameKr}
                                      </Box>
                                  ))}
                                </Box>
                              </Paper>
                          )}
                        </AnimatePresence>
                      </Box>
                  ) : (
                      <Typography
                          component={motion.a}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(item.path)}
                          sx={{
                            color: "#333",
                            fontWeight: 500,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            textDecoration: "none",
                            cursor: "pointer",
                            position: "relative",
                            display: "inline-block",
                            py: 1,
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              width: "0%",
                              height: "2px",
                              bottom: 0,
                              left: "50%",
                              backgroundColor: "#333",
                              transition: "all 0.3s ease",
                              transform: "translateX(-50%)",
                            },
                            "&:hover": {
                              color: "#000",
                            },
                            "&:hover::after": {
                              width: "80%",
                            },
                          }}
                      >
                        {item.nameKr}
                      </Typography>
                  )}
                </Box>
            ))}
          </MenuContainer>
          
          {/* 프로필 버튼 */}
          <IconButton
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ p: 0 }}
          >
            <Avatar 
              src="https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj"
              sx={{ 
                width: { xs: 36, sm: 40 }, 
                height: { xs: 36, sm: 40 },
                border: "2px solid rgba(0, 0, 0, 0.08)",
              }}
            />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>

      {/* 배경 오버레이 */}
      <AnimatePresence>
        {isProfileOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1200,
            }}
          />
        )}
      </AnimatePresence>

      {/* 프로필 Drawer */}
      <AnimatePresence>
        {isProfileOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1201,
            }}
          >
            <Box
              component={motion.div}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: { xs: 280, sm: 320 },
                backgroundColor: "#fff",
                boxShadow: "0 0 50px rgba(0, 0, 0, 0.1)",
                overflow: "auto",
              }}
            >
              <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                {/* 프로필 이미지 */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <ProfileImage src="https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj" />
                </Box>

                {/* 사용자명 */}
                <UserName variant="h6">
                  아야츠노 유니
                </UserName>

                {/* 가입일 */}
                <JoinDate variant="body2">
                  2024년 1월부터 함께해요
                </JoinDate>

                <Divider sx={{ mb: 3 }} />

                {/* 자기소개 */}
                <Box sx={{ mb: 4 }}>
                  <IntroTitle variant="subtitle2">
                    자기소개
                  </IntroTitle>
                  <IntroText variant="body2">
                    아야츠노 유니입니다. 🍸
                    안녕하시지~~~~
                  </IntroText>
                </Box>

                {/* 하단 영역 - 마이페이지와 활성 상태 */}
                <Box sx={{ mt: "auto" }}>
                  {/* 마이페이지 버튼 */}
                  <MyPageButton variant="outlined" fullWidth>
                    마이페이지
                  </MyPageButton>

                  {/* 활성 상태 */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ActiveChip label="활성 중" size="small" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
};

export default GNB;

const StyledAppBar = styled(AppBar)`
  && {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    min-height: 56px;
    justify-content: space-between;
    
    @media (min-width: 600px) {
      min-height: 64px;
    }
  }
`;

const MenuContainer = styled(Box)`
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

const ProfileImage = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    border: 3px solid rgba(0, 0, 0, 0.08);
  }
`;

const UserName = styled(Typography)`
  && {
    text-align: center;
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

const JoinDate = styled(Typography)`
  && {
    text-align: center;
    color: #666;
    margin-bottom: 24px;
  }
`;

const IntroTitle = styled(Typography)`
  && {
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

const IntroText = styled(Typography)`
  && {
    color: #666;
    line-height: 1.6;
  }
`;

const MyPageButton = styled(Button)`
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

const ActiveChip = styled(Chip)`
  && {
    background-color: #4caf50;
    color: white;
    font-weight: 500;
  }
`;