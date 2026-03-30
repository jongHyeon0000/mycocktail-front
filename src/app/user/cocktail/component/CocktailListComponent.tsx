import React from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {motion} from "framer-motion";
import {Box, Card, CardMedia, Chip, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import {
  CardContentArea,
  ContentSection,
  ImageSection,
  ItemDescription,
  ItemTitle,
} from "../../common/style/CommonListComponent.style.tsx";

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
              <ItemTitle variant="h6">
                {cocktail.cocktailNameKr} ({cocktail.cocktailName})
              </ItemTitle>

              <ItemDescription variant="body2">
                {cocktail.profileNote}
              </ItemDescription>
            </Box>

            <BottomInfo>
              <AbvBadge>ABV {cocktail.absPercentage}%</AbvBadge>
              <RightBadgeGroup>
                {cocktail.isNew && (
                    <NewChip label="NEW" size="small" />
                )}
                <LikeBox>
                  <FavoriteIcon sx={{ fontSize: 14, color: "#ff4757" }} />
                  <LikeText variant="caption">{cocktail.likeCount}</LikeText>
                </LikeBox>
              </RightBadgeGroup>
            </BottomInfo>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default CocktailListComponent;


const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const AbvBadge = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    background-color: #fff3f3;
    color: #e63950;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #ffd6d9;
  }
` as typeof Box;

const LikeBox = styled(Box)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: #fff3f3;
    border: 1px solid #ffd6d9;
    border-radius: 20px;
    padding: 3px 10px;
  }
` as typeof Box;

const LikeText = styled(Typography)`
  && {
    color: #e63950;
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1;
  }
`;

const RightBadgeGroup = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
  }
` as typeof Box;

const NewChip = styled(Chip)`
  && {
    background-color: #fff3f3;
    color: #e63950;
    border: 1px solid #ffd6d9;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    height: 24px;
  }
`;