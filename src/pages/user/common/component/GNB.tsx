import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  Paper,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {GNB_MENU_TYPE, GNB_SUBMENU_TYPE} from "../menu/GnbMenuItem.tsx";

const GNB: React.FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: { xs: 2, sm: 3, md: 4 } }}>
            {GNB_MENU_TYPE.map((item, index) => (
              <Box
                key={index}
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {item.name === "재료" ? (
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
                      {item.name}
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
                            {GNB_SUBMENU_TYPE.map((subItem, subIndex) => (
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
                                {subItem.name}
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
                    {item.name}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          
          {/* 프로필 버튼 */}
          <IconButton
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ p: 0 }}
          >
            <Avatar 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              sx={{ 
                width: { xs: 36, sm: 40 }, 
                height: { xs: 36, sm: 40 },
                border: "2px solid rgba(0, 0, 0, 0.08)",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

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
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                    sx={{ 
                      width: 80, 
                      height: 80,
                      border: "3px solid rgba(0, 0, 0, 0.08)",
                    }}
                  />
                </Box>

                {/* 사용자명 */}
                <Typography variant="h6" sx={{ textAlign: "center", mb: 1, fontWeight: 600 }}>
                  김칵테일
                </Typography>

                {/* 가입일 */}
                <Typography variant="body2" sx={{ textAlign: "center", color: "#666", mb: 3 }}>
                  2024년 1월부터 함께해요
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* 자기소개 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    자기소개
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                    칵테일을 사랑하는 홈텐더입니다. 🍸
                    주말마다 새로운 레시피에 도전하고 있어요!
                  </Typography>
                </Box>

                {/* 하단 영역 - 마이페이지와 활성 상태 */}
                <Box sx={{ mt: "auto" }}>
                  {/* 마이페이지 버튼 */}
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.5,
                      mb: 2,
                      borderRadius: 2,
                      borderColor: "#ddd",
                      color: "#333",
                      "&:hover": {
                        borderColor: "#333",
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  >
                    마이페이지 &gt;
                  </Button>

                  {/* 활성 상태 */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Chip
                      label="활성 중"
                      size="small"
                      sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        fontWeight: 500,
                      }}
                    />
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