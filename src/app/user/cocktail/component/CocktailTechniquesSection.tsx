import React, { useRef } from "react";
import type { CocktailDetail } from "../interface/CocktailDetail.ts";
import styled from "styled-components";
import { Box } from "@mui/material";
import { CategorySlide } from "../../common/component/CategorySlide.tsx";

interface CocktailTechniquesSectionProps {
  tools: CocktailDetail['tools'];
  glassware: CocktailDetail['glassware'];
  techniques: CocktailDetail['techniques'];
}

const CocktailTechniquesSection: React.FC<CocktailTechniquesSectionProps> = ({
  tools,
  glassware,
  techniques,
}) => {
  const toolsRef = useRef<HTMLDivElement>(null);
  const glasswareRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  return (
    <TechniquesSection>
      {tools.length > 0 && (
        <CategorySlide title="도구/기물" items={tools} slideRef={toolsRef} className="technique" />
      )}
      {glassware.length > 0 && (
        <CategorySlide title="사용 잔" items={glassware} slideRef={glasswareRef} className="technique" />
      )}
      {techniques.length > 0 && (
        <CategorySlide title="제조 기법" items={techniques} slideRef={methodsRef} className="technique" />
      )}
    </TechniquesSection>
  );
};

export default CocktailTechniquesSection;

const TechniquesSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;
