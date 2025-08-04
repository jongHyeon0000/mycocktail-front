import React from "react";
import {motion} from "framer-motion";
import {
  BottomInfo,
  CardContentArea, 
  SpiritAlcohol, 
  SpiritDescription,
  SpiritTitle,
  ContentSection, 
  DateText,
  PriceText,
  DiscontinuedText
} from "./style/SpiritProductListComponent_Style.tsx";
import {Box, Card, CardMedia} from "@mui/material";
import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";

interface SpiritListComponentProps {
  spirit: SpiritProductDetail;
  index: number;
  onClickEvent: () => void;
}

const SpiritProductListComponent: React.FC<SpiritListComponentProps> = ({ spirit, index, onClickEvent }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
      <Card
          key={`${spirit.spiritProductId}-${index}`}
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
          <Box sx={{
            flex: "0 0 200px",
            "@media (max-width: 600px)": {
              flex: "0 0 120px"
            }
          }}>
            <CardMedia
                component="img"
                height="200"
                image={spirit.image}
                alt={spirit.spiritName}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%"
                }}
            />
          </Box>

          {/* 콘텐츠 섹션 */}
          <ContentSection>
            <Box>
              <SpiritTitle variant="h6">
                {spirit.spiritNameKr} ({spirit.spiritName})
              </SpiritTitle>

              <SpiritDescription variant="body2">
                {spirit.profileNote}
              </SpiritDescription>

              <SpiritAlcohol variant="body2">
                {spirit.spiritName} • {spirit.absPercentage}%
              </SpiritAlcohol>
            </Box>

            <BottomInfo>
              <DateText variant="caption">
                {spirit.createAt}
              </DateText>
              <Box sx={{ textAlign: 'right' }}>
                <DiscontinuedText 
                  variant="caption" 
                  isDiscontinued={spirit.isDiscontinued}
                >
                  {spirit.isDiscontinued ? '단종' : '판매중'}
                </DiscontinuedText>
                <PriceText variant="caption">
                  {formatPrice(spirit.price)}
                </PriceText>
              </Box>
            </BottomInfo>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default SpiritProductListComponent;