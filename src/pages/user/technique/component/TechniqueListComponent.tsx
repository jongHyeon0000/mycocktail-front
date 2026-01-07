import React from "react";
import {motion} from "framer-motion";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import styled from "styled-components";
import type {TechniqueDetail} from "../interface/TechniqueDetail.ts";
import {getTechniqueCategoryKorean} from "../common/TechniqueUtils.ts";
import {stripHtmlTags} from "../../common/utils/CommonUtils.ts";

interface TechniqueListComponentProps {
  technique: TechniqueDetail;
  index: number;
  onClickEvent: () => void;
}

const TechniqueListComponent: React.FC<TechniqueListComponentProps> = ({ technique, index, onClickEvent }) => {
  return (
      <Card
          key={`${technique.techniqueId}-${index}`}
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
                image={technique.image}
                alt={technique.techniqueNameKr}
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
                {technique.techniqueNameKr} ({technique.techniqueName})
              </TechniqueTitle>

              <TechniqueCategory variant="body2">
                {getTechniqueCategoryKorean(technique.techniqueCategory)}
              </TechniqueCategory>

              <TechniqueDescription variant="body2">
                {stripHtmlTags(technique.notes)}
              </TechniqueDescription>
            </Box>

            <BottomInfo>
              <DateText variant="caption">
                {technique.createdAt}
              </DateText>
            </BottomInfo>
          </ContentSection>
        </CardContentArea>
      </Card>
  );
}

export default TechniqueListComponent;

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

const TechniqueCategory = styled(Typography)`
  && {
    color: #2C3E50;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 12px;
    padding: 4px 12px;
    background-color: #ECF0F1;
    border-radius: 16px;
    display: inline-block;
    width: fit-content;
  }
`;

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
