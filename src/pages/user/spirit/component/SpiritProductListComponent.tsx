import React from "react";
import {motion} from "framer-motion";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import type {SpiritProductDetail} from "../interface/SpiritProductDetail.ts";
import styled from "styled-components";

interface SpiritListComponentProps {
  spirit: SpiritProductDetail;
  index: number;
  onClickEvent: () => void;
}

const SpiritProductListComponent: React.FC<SpiritListComponentProps> = ({ spirit, index, onClickEvent }) => {
  /*
  * 기주 가격 formatting 함수
  * */
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
            </Box>

            <BottomInfo>
              <SpiritAlcohol variant="body2">
                abz {spirit.absPercentage}%
              </SpiritAlcohol>
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

const SpiritTitle = styled(Typography)`
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

const SpiritDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

const SpiritAlcohol = styled(Typography)`
  && {
    color: #8B4513;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const BottomInfo = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const DiscontinuedText = styled(Typography)<{ isDiscontinued: boolean }>`
  && {
    color: ${props => props.isDiscontinued ? '#ff4757' : '#2ed573'};
    font-size: 0.875rem;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
  }
`;

const PriceText = styled(Typography)`
  && {
    color: #333;
    font-size: 0.875rem;
    font-weight: 500;
    display: block;
  }
`;