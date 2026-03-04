import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Avatar,
  IconButton,
  Divider, AppBar, Toolbar, Button, Chip,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {APP_ROUTES} from "../../../../config/route/RoutesConfig.tsx";
import useAuth from "../../auth/service/useAuth.ts";
import styled from "styled-components";

const GNB: React.FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  /**
   * 가입일을 "YYYY년 MM월부터 함께해요" 형식으로 변환
   */
  const formatJoinDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월부터 함께해요`;
  };

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
            {isAuthenticated && user?.thumbnailImage ? (
              <Avatar
                src={user.thumbnailImage}
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <Person />
              </Avatar>
            )}
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
                  {isAuthenticated && user?.thumbnailImage ? (
                    <ProfileImage src={user.thumbnailImage} />
                  ) : (
                    <ProfileImage>
                      <Person sx={{ fontSize: 40 }} />
                    </ProfileImage>
                  )}
                </Box>

                {/* 사용자명 */}
                <UserName variant="h6">
                  {isAuthenticated ? user?.username : "Guest"}
                </UserName>

                {/* 가입일 (로그인 시만 표시) */}
                {isAuthenticated && user?.createdAt && (
                  <JoinDate variant="body2">
                    {formatJoinDate(user.createdAt)}
                  </JoinDate>
                )}

                <Divider sx={{ mb: 3 }} />

                {/* 자기소개 (로그인 시이고 profileNotes가 있을 때만 표시) */}
                {isAuthenticated && user?.profileNotes && (
                  <Box sx={{ mb: 4 }}>
                    <IntroTitle variant="subtitle2">
                      자기소개
                    </IntroTitle>
                    <IntroText variant="body2">
                      {user.profileNotes}
                    </IntroText>
                  </Box>
                )}

                {/* 하단 영역 - 마이페이지/로그인 버튼과 활성 상태 */}
                <Box sx={{ mt: "auto" }}>
                  {/* 마이페이지 또는 로그인 버튼 */}
                  <MyPageButton
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        navigate(isAuthenticated ? '/my-page' : '/login');
                        setIsProfileOpen(false);  // drawer 닫기
                      }}
                  >
                    {isAuthenticated ? '마이페이지' : '로그인'}
                  </MyPageButton>

                  {/* 로그아웃 + 활성 상태 (로그인 시만 표시) */}
                  {isAuthenticated && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <LogoutButton
                        variant="text"
                        size="small"
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                      >
                        로그아웃
                      </LogoutButton>
                      {user?.isActive && <ActiveChip label="활성 중" size="small" />}
                    </Box>
                  )}
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
    background-color: #e0e0e0;
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

const LogoutButton = styled(Button)`
  && {
    color: #888;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: none;
    padding: 4px 0;
    min-width: 0;
    letter-spacing: 0;

    &:hover {
      color: #e57373;
      background-color: transparent;
    }
  }
`;