import React from "react";
import {motion} from "framer-motion";
import {Box, Card, CardMedia} from "@mui/material";
import {stripHtmlTags} from "../../../common/utils/CommonUtils.ts";
import type {OtherIngredientsDetail} from "../interface/OtherIngredientsDetail.ts";
import {
  CardContentArea,
  ContentSection,
  ImageSection,
  ItemDescription,
  ItemTitle,
} from "../../../common/style/CommonListComponent.style.tsx";

interface OtherIngredientsListComponentProps {
  data: OtherIngredientsDetail;
  index: number;
  onClickEvent: () => void;
}

const OtherIngredientsListComponent: React.FC<OtherIngredientsListComponentProps> = ({ data, index, onClickEvent }) => {
  return (
      <Card
          key={`${data.otherIngredientId}-${index}`}
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
                image={data.image}
                alt={data.otherIngredientNameKr}
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
                {data.otherIngredientNameKr} ({data.otherIngredientName})
              </ItemTitle>

              <ItemDescription variant="body2">
                {stripHtmlTags(data.notes)}
              </ItemDescription>
            </Box>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default OtherIngredientsListComponent;
