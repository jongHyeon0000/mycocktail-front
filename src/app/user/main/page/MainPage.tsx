import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Box,
  CircularProgress,
  Container,
  InputAdornment,
  IconButton,
  List,
  ListItemButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import styled from "styled-components";
import useReadCocktailList from "../../cocktail/service/useReadCocktailList.tsx";
import useReadCocktail from "../../cocktail/service/useReadCocktail.tsx";
import CocktailDetailModal from "../../cocktail/component/CocktailDetailModal.tsx";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";

const MainPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { cocktailList, cocktailListLoading, fetchReadCocktailList } = useReadCocktailList();
  const { cocktail, cocktailLoading, fetchReadCocktail } = useReadCocktail();

  useEffect(() => {
    if (cocktail?.data) {
      setModalOpen(true);
    }
  }, [cocktail]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (!query.trim()) {
      setDropdownOpen(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetchReadCocktailList({ search: query.trim(), limit: 5, page: 1 });
      setDropdownOpen(true);
    }, 250);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    };
  }, [query]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setDropdownOpen(false), 150);
  }, []);

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
          sx={{ width: "100%", maxWidth: 400, position: "relative" }}
        >
          <SearchTextField
            fullWidth
            placeholder="칵테일 이름으로 검색해 보세요"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "20px" }}>🔍</span>
                </InputAdornment>
              ),
              endAdornment: cocktailListLoading && query ? (
                <InputAdornment position="end">
                  <CircularProgress size={16} sx={{ color: "#aaa" }} />
                </InputAdornment>
              ) : null,
            }}
          />

          {/* 자동검색 드롭다운 */}
          {dropdownOpen && (
            <SearchDropdown elevation={3}>
              {cocktailListLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <CircularProgress size={20} sx={{ color: "#aaa" }} />
                </Box>
              ) : cocktailList?.data && cocktailList.data.length > 0 ? (
                <List disablePadding>
                  {cocktailList.data.map((cocktail) => (
                    <ListItemButton
                      key={cocktail.cocktailId}
                      sx={{ px: 2, py: 1.2, gap: 1.5 }}
                      onClick={() => {
                        setDropdownOpen(false);
                        fetchReadCocktail(cocktail.cocktailId);
                      }}
                    >
                      {cocktail.image && (
                        <Box
                          component="img"
                          src={cocktail.image}
                          alt={cocktail.cocktailName}
                          sx={{ width: 36, height: 36, borderRadius: 1, objectFit: "cover", flexShrink: 0 }}
                        />
                      )}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#222", lineHeight: 1.3 }}>
                          {cocktail.cocktailName}
                        </Typography>
                        {cocktail.cocktailNameKr && (
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            {cocktail.cocktailNameKr}
                          </Typography>
                        )}
                      </Box>
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                <Box sx={{ px: 2, py: 2, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    검색 결과가 없습니다
                  </Typography>
                </Box>
              )}
            </SearchDropdown>
          )}
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
              maxWidth: 400,
              mx: "auto",
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
                { emoji: "🍸", label: "오늘의 픽" },
                { emoji: "🎲", label: "추천 칵테일" },
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
      {/* 칵테일 상세 모달 */}
      {cocktail?.data && (
        <CocktailDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={cocktail.data}
        />
      )}

      <LoadingOverlay open={cocktailLoading} message="칵테일 정보를 불러오는 중..." />
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled(Box)`
  && {
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
`;

const ContentContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 88px;
    flex: 1;
    
    @media (min-width: 600px) {
      padding-top: 112px;
    }
    
    @media (min-width: 900px) {
      padding-top: 128px;
    }
    
    @media (min-width: 1200px) {
      padding-top: 144px;
    }
  }
`;

const SearchTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 16px;
      background-color: #f5f5f5;
      
      &:hover fieldset {
        border-color: #ddd;
      }
      
      &.Mui-focused fieldset {
        border-color: #888;
      }
    }
    
    & fieldset {
      border-color: #eee;
    }
  }
`;

const BottomNavigation = styled(Box)`
  && {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: auto;
    padding-bottom: 32px;
    
    @media (min-width: 900px) {
      position: absolute;
      bottom: 40px;
      margin-top: 0;
      padding-bottom: 0;
    }
  }
`;

const NavIconButton = styled(IconButton)`
  && {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      background-color: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
  }
`;

const NavLabel = styled(Typography)`
  && {
    margin-top: 8px;
    font-size: 0.7rem;
    color: #666;
    text-align: center;
    max-width: 70px;
  }
`;

const SearchDropdown = styled(Paper)`
  && {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    z-index: 100;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
  }
`;