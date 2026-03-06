import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandMoreOutlined } from "@mui/icons-material";
import type { CocktailDetail } from "../interface/CocktailDetail.ts";
import styled from "styled-components";
import { Box } from "@mui/material";
import { CategorySlide } from "../../common/component/CategorySlide.tsx";
import { SPIRIT_CATEGORY_MAP } from "../constant/spiritCategories.ts";

interface CocktailIngredientsSectionProps {
  spiritCategories: CocktailDetail['spiritCategories'];
  ingredients: CocktailDetail['ingredients'];
}

const CocktailIngredientsSection: React.FC<CocktailIngredientsSectionProps> = ({
  spiritCategories,
  ingredients,
}) => {
  const [spiritExpanded, setSpiritExpanded] = useState(false);

  const spiritsRef = useRef<HTMLDivElement>(null);
  const juicesRef = useRef<HTMLDivElement>(null);
  const bittersRef = useRef<HTMLDivElement>(null);
  const syrupsRef = useRef<HTMLDivElement>(null);
  const carbonatedRef = useRef<HTMLDivElement>(null);
  const dairyRef = useRef<HTMLDivElement>(null);
  const garnishesRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);

  return (
    <IngredientsSection>
      {spiritCategories.length > 0 && (
        <SpiritCategorySection>
          <SpiritCategoryCard
            onClick={() => setSpiritExpanded(prev => !prev)}
            expanded={spiritExpanded}
          >
            <SpiritCategoryChips>
              {spiritCategories.map(cat => (
                <SpiritCatTag key={cat} $expanded={spiritExpanded}>
                  {SPIRIT_CATEGORY_MAP[cat].nameKr}
                </SpiritCatTag>
              ))}
            </SpiritCategoryChips>
            <SpiritExpandIcon expanded={spiritExpanded}>
              <ExpandMoreOutlined />
            </SpiritExpandIcon>
          </SpiritCategoryCard>

          <AnimatePresence>
            {spiritExpanded && ingredients.spirits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <SpiritDetailPanel>
                  <CategorySlide
                    title="세부 제품"
                    items={ingredients.spirits}
                    slideRef={spiritsRef}
                  />
                </SpiritDetailPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </SpiritCategorySection>
      )}

      {ingredients.juices.length > 0 && (
        <CategorySlide title="주스" items={ingredients.juices} slideRef={juicesRef} />
      )}
      {ingredients.bitters.length > 0 && (
        <CategorySlide title="비터스" items={ingredients.bitters} slideRef={bittersRef} />
      )}
      {ingredients.syrups.length > 0 && (
        <CategorySlide title="시럽" items={ingredients.syrups} slideRef={syrupsRef} />
      )}
      {ingredients.carbonated.length > 0 && (
        <CategorySlide title="탄산/소다" items={ingredients.carbonated} slideRef={carbonatedRef} />
      )}
      {ingredients.dairy.length > 0 && (
        <CategorySlide title="유제품/크림" items={ingredients.dairy} slideRef={dairyRef} />
      )}
      {ingredients.garnishes.length > 0 && (
        <CategorySlide title="가니쉬" items={ingredients.garnishes} slideRef={garnishesRef} />
      )}
      {ingredients.others.length > 0 && (
        <CategorySlide title="기타" items={ingredients.others} slideRef={othersRef} />
      )}
    </IngredientsSection>
  );
};

export default CocktailIngredientsSection;

const IngredientsSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;

const SpiritCategorySection = styled(Box)`
  && {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  }
`;

const SpiritCategoryCard = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded'
})<{ expanded: boolean }>`
  && {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: ${({ expanded }) =>
      expanded
        ? 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)'
        : 'rgba(255, 255, 255, 0.9)'};
    border: 1.5px solid ${({ expanded }) => expanded ? 'transparent' : 'rgba(76, 175, 80, 0.3)'};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s ease;
    user-select: none;

    &:hover {
      background: ${({ expanded }) =>
        expanded
          ? 'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)'
          : 'rgba(76, 175, 80, 0.08)'};
      box-shadow: 0 4px 16px rgba(76, 175, 80, 0.2);
    }
  }
`;

const SpiritCategoryChips = styled(Box)`
  && {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }
`;

const SpiritCatTag = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$expanded'
})<{ $expanded: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.5;
  background: ${({ $expanded }) => $expanded ? 'rgba(255,255,255,0.18)' : 'rgba(76,175,80,0.1)'};
  color: ${({ $expanded }) => $expanded ? '#ffffff' : '#2e7d32'};
  border: 1px solid ${({ $expanded }) => $expanded ? 'rgba(255,255,255,0.3)' : 'rgba(76,175,80,0.3)'};
  transition: all 0.25s ease;
`;

const SpiritExpandIcon = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded'
})<{ expanded: boolean }>`
  && {
    display: flex;
    align-items: center;
    color: ${({ expanded }) => expanded ? 'rgba(255,255,255,0.8)' : 'rgba(76, 175, 80, 0.6)'};
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.25s ease, color 0.25s ease;
    flex-shrink: 0;
  }
`;

const SpiritDetailPanel = styled(Box)`
  && {
    margin-top: 10px;
    margin-left: 14px;
    padding-left: 14px;
    border-left: 2px solid rgba(76, 175, 80, 0.25);
  }
`;
