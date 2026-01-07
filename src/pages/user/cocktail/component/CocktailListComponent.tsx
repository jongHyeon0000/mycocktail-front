import React from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {motion} from "framer-motion";
import {Box, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import styled from "styled-components";

interface CocktailListComponentProps {
  cocktail: CocktailDetail;
  index: number;
  onClickEvent: () => void;
}

const CocktailListComponent: React.FC<CocktailListComponentProps> = ({ cocktail, index, onClickEvent }) => {
  return (
      <Card
          key={`${cocktail.cocktailId}-${index}`}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index % 6) * 0.1, duration: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={onClickEvent}
          sx={{
            position: "relative",
            cursor: "pointer",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#fff",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            }
          }}
      >
        {/* NEW 태그 */}
        {cocktail.isNew && (
            <NewChip label="NEW" size="small" />
        )}

        <CardContentArea>
          {/* 이미지 섹션 */}
          <ImageSection>
            <CardMedia
                component="img"
                height="200"
                image={cocktail.image}
                alt={cocktail.cocktailName}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%"
                }}
            />
          </ImageSection>

          {/* 콘텐츠 섹션 */}
          <ContentSection>
            <Box>
              <CocktailTitle variant="h6">
                {cocktail.cocktailNameKr} ({cocktail.cocktailName})
              </CocktailTitle>

              <CocktailDescription variant="body2">
                {cocktail.profileNote}
              </CocktailDescription>

              <CocktailAlcohol variant="body2">
                abz {cocktail.absPercentage}%
              </CocktailAlcohol>
            </Box>

            <BottomInfo>
              <DateText variant="caption">
                {cocktail.createAt}
              </DateText>
              <LikeText variant="caption">
                ❤️ {cocktail.likeCount}
              </LikeText>
            </BottomInfo>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default CocktailListComponent;

const CardContentArea = styled(CardContent)`
  && {
    padding: 0;
    display: flex;
    height: 200px;
    
    &:last-child {
      padding-bottom: 0;
    }
    
    @media (max-width: 600px) {
      height: 180px;
    }
  }
`;

const ImageSection = styled(Box)`
  && {
    flex: 0 0 200px;
    
    @media (max-width: 600px) {
      flex: 0 0 120px;
    }
  }
`;

const ContentSection = styled(Box)`
  && {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  }
`;

const CocktailTitle = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 8px;
    
    @media (max-width: 600px) {
      font-size: 1.25rem;
    }
  }
`;

const CocktailDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

const CocktailAlcohol = styled(Typography)`
  && {
    color: #ff6b6b;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const DateText = styled(Typography)`
  && {
    color: #999;
    font-size: 0.875rem;
  }
`;

const LikeText = styled(Typography)`
  && {
    color: #ff4757;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const NewChip = styled(Chip)`
  && {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #ff4757;
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
  }
`;