import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Grid,
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  TextField, 
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

const CocktailListPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState("recent");

  // 임시 데이터
  const cocktails = [
    { 
      id: 1, 
      name: "모히토", 
      date: "2024.11.15", 
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: true 
    },
    { 
      id: 2, 
      name: "마가리타", 
      date: "2024.10.28", 
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 3,
      name: "올드 패션드",
      date: "2024.10.12",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 4,
      name: "네그로니",
      date: "2024.09.30",
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 5,
      name: "위스키 사워",
      date: "2024.09.15",
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false
    },
    {
      id: 6,
      name: "에스프레소 마티니",
      date: "2024.08.20",
      image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=500&fit=crop",
      isNew: false 
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", pt: 12 }}>
      <Container maxWidth="lg">
        {/* 상단 컨트롤 영역 */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 4,
            gap: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" }
          }}
        >
          {/* 정렬 드롭다운 */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eee",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ddd",
                },
              }}
            >
              <MenuItem value="recent">최신순</MenuItem>
              <MenuItem value="popular">인기순</MenuItem>
              <MenuItem value="name">이름순</MenuItem>
              <MenuItem value="rating">평점순</MenuItem>
            </Select>
          </FormControl>

          {/* 검색창 */}
          <TextField
            placeholder="칵테일 검색..."
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: 300 },
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
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
                  <span style={{ fontSize: "18px" }}>🔍</span>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* 칵테일 리스트 */}
        <Grid container spacing={3}>
          {cocktails.map((cocktail, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cocktail.id}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                  },
                  position: "relative",
                }}
              >
                {/* 이미지 */}
                <CardMedia
                  component="img"
                  height={240}
                  image={cocktail.image}
                  alt={cocktail.name}
                  sx={{ objectFit: "cover" }}
                />
                
                {/* NEW 태그 */}
                {cocktail.isNew && (
                  <Chip
                    label="NEW"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "#ff4757",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                )}

                {/* 콘텐츠 */}
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "#333",
                      }}
                    >
                      {cocktail.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: "#999",
                        fontSize: "0.875rem",
                      }}
                    >
                      {cocktail.date}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CocktailListPage;