import React from "react";
import type {CocktailDetail} from "../interface/CocktailDetail.ts";
import {motion} from "framer-motion";
import {
  BottomInfo,
  CardContentArea, CocktailAlcohol, CocktailDescription,
  CocktailTitle,
  ContentSection, DateText,
  ImageSection, LikeText,
  NewChip
} from "./style/CocktailListComponent_Style.tsx";
import {Box, Card, CardMedia} from "@mui/material";

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
                abz {cocktail.abs_percentage}%
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