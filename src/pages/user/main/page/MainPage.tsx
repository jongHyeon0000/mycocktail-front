import React from "react";
import { Box, Container, InputAdornment, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  BottomNavigation,
  ContentContainer,
  MainContainer,
  NavIconButton, NavLabel,
  SearchTextField
} from "../style/MainPage_Style.tsx";

const MainPage: React.FC = () => {
  return (
    <MainContainer>
      <ContentContainer maxWidth="sm">
        {/* 상단 이미지 영역 */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 4 }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop"
            alt="Cocktail"
            sx={{
              width: { xs: 250, sm: 300, md: 350 },
              height: { xs: 167, sm: 200, md: 233 },
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
          />
        </Box>

        {/* 타이틀 */}
        <Typography
          component={motion.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          variant="h3"
          sx={{ 
            mb: 4,
            fontWeight: 300,
            color: "#333",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Helloooo!
        </Typography>

        {/* 검색창 */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <SearchTextField
            fullWidth
            placeholder="칵테일 이름으로 검색해 보세요"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "20px" }}>🔍</span>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </ContentContainer>

      {/* 하단 네비게이션 */}
      <BottomNavigation>
        <Container maxWidth="sm">
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: "#f8f8f8",
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {[
                { emoji: "🍸", label: "오늘의 인기있는 칵테일" },
                { emoji: "🎲", label: "추천 칵테일 찾기" },
                { emoji: "🍹", label: "나의 칵테일" },
                { emoji: "🥃", label: "모든 칵테일" },
              ].map((item, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <NavIconButton>
                    {item.emoji}
                  </NavIconButton>
                  <NavLabel variant="caption">
                    {item.label}
                  </NavLabel>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </BottomNavigation>
    </MainContainer>
  );
};

export default MainPage;