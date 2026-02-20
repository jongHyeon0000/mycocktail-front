import React from "react";
import {motion} from "framer-motion";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import styled from "styled-components";
import {stripHtmlTags} from "../../../common/utils/CommonUtils.ts";
import type {UnifiedIngredient} from "../interface/IngredientList.ts";

interface IngredientListComponentProps {
  data: UnifiedIngredient;
  index: number;
  onClickEvent: () => void;
}

const getIngredientId = (data: UnifiedIngredient): number => {
  switch (data.type) {
    case 'juice': return data.juiceId;
    case 'bitters': return data.bittersId;
    case 'carbonated': return data.carbonatedId;
    case 'dairyCream': return data.dairyCreamId;
    case 'garnishes': return data.garnishId;
    case 'syrup': return data.syrupId;
    case 'other': return data.otherIngredientId;
  }
};

const getIngredientName = (data: UnifiedIngredient): string => {
  switch (data.type) {
    case 'juice': return data.juiceName;
    case 'bitters': return data.bittersName;
    case 'carbonated': return data.carbonatedName;
    case 'dairyCream': return data.dairyCreamName;
    case 'garnishes': return data.garnishName;
    case 'syrup': return data.syrupName;
    case 'other': return data.otherIngredientName;
  }
};

const getIngredientNameKr = (data: UnifiedIngredient): string => {
  switch (data.type) {
    case 'juice': return data.juiceNameKr;
    case 'bitters': return data.bittersNameKr;
    case 'carbonated': return data.carbonatedNameKr;
    case 'dairyCream': return data.dairyCreamNameKr;
    case 'garnishes': return data.garnishNameKr;
    case 'syrup': return data.syrupNameKr;
    case 'other': return data.otherIngredientNameKr;
  }
};

const IngredientListComponent: React.FC<IngredientListComponentProps> = ({ data, index, onClickEvent }) => {
  const id = getIngredientId(data);
  const name = getIngredientName(data);
  const nameKr = getIngredientNameKr(data);

  return (
      <Card
          key={`${id}-${index}`}
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
                image={data.image}
                alt={nameKr}
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
              <TechniqueTitle variant="h6">
                {nameKr} ({name})
              </TechniqueTitle>

              <TechniqueDescription variant="body2">
                {stripHtmlTags(data.notes)}
              </TechniqueDescription>
            </Box>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default IngredientListComponent;

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

const TechniqueTitle = styled(Typography)`
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

const TechniqueDescription = styled(Typography)`
  && {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;