import React from "react";
import { Box, Container, TextField, InputAdornment, Typography, IconButton, Paper } from "@mui/material";
import { motion } from "framer-motion";

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Container maxWidth="sm" sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        pt: { xs: 11, sm: 14, md: 16, lg: 18 },
        flex: 1,
      }}>
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
          <TextField
            fullWidth
            placeholder="칵테일 이름으로 검색해 보세요"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                backgroundColor: "#f5f5f5",
                "&:hover fieldset": {
                  borderColor: "#ddd",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#888",
                },
              },
              "& fieldset": {
                borderColor: "#eee",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "20px" }}>🔍</span>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>

      {/* 하단 네비게이션 */}
      <Box sx={{ 
        position: { xs: "relative", md: "absolute" },
        bottom: { xs: 0, md: 40 },
        left: 0,
        right: 0,
        mt: { xs: "auto", md: 0 },
        pb: { xs: 4, md: 0 },
      }}>
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
              { emoji: "🍸", label: "인기있는 칵테일" },
              { emoji: "🎲", label: "랜덤추천 칵테일" },
              { emoji: "🍹", label: "나만의 칵테일" },
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
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    width: 60,
                    height: 60,
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    "&:hover": {
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  {item.emoji}
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontSize: "0.7rem",
                    color: "#666",
                    textAlign: "center",
                    maxWidth: 70,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;