import React from "react";
import {motion} from "framer-motion";
import {Box, Card, CardMedia, Typography} from "@mui/material";
import styled from "styled-components";
import {stripHtmlTags} from "../../common/utils/CommonUtils.ts";
import type {GlasswareDetail} from "../interface/GlasswareDetail.ts";
import {getGlassTypeKorean} from "../common/GlasswareUtils.ts";
import {
  CardContentArea,
  CategoryBadge,
  ContentSection,
  ImageSection,
  ItemDescription,
  ItemTitle,
} from "../../common/style/CommonListComponent.style.tsx";

interface GlasswareListComponentProps {
  glassware: GlasswareDetail;
  index: number;
  onClickEvent: () => void;
}

const GlasswareListComponent: React.FC<GlasswareListComponentProps> = ({ glassware, index, onClickEvent }) => {
  return (
      <Card
          key={`${glassware.glassId}-${index}`}
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
                image={glassware.image}
                alt={glassware.glassNameKr}
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
                {glassware.glassNameKr} ({glassware.glassName})
              </ItemTitle>

              <CategoryBadge variant="body2">
                {getGlassTypeKorean(glassware.glassType)}
              </CategoryBadge>

              <ItemDescription variant="body2">
                {stripHtmlTags(glassware.notes)}
              </ItemDescription>
            </Box>

            <BottomInfo>
              <DateText variant="caption">
                {glassware.createdAt}
              </DateText>
            </BottomInfo>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default GlasswareListComponent;


const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
`;

const DateText = styled(Typography)`
  && {
    color: #999;
    font-size: 0.875rem;
    align-self: flex-end;
  }
`;
