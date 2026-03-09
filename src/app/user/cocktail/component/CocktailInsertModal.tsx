import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalBarOutlined, AddOutlined, CloseOutlined } from "@mui/icons-material";
import { COMMON_MODAL_STYLE } from "../../common/style/CommonModal.style.ts";
import useAuth from "../../auth/service/useAuth.ts";
import styled from "styled-components";
import {
  Box, Button, Chip, Divider, FormControl, FormHelperText,
  InputAdornment, MenuItem, Modal, Paper, Select, TextField, Typography
} from "@mui/material";
import { CategorySlide } from "../../common/component/CategorySlide.tsx";
import TipTapEditor from "../../common/component/editor/TipTapEditor.tsx";
import type { CommonSlideElement } from "../../common/interface/CommonSlideElement.ts";
import type { CocktailCategory } from "../interface/CocktailDetail.ts";
import UserSpiritInsertModal from "../../common/component/modal/insert/UserSpiritInsertModal.tsx";
import UserJuiceInsertModal from "../../common/component/modal/insert/UserJuiceInsertModal.tsx";
import UserBittersInsertModal from "../../common/component/modal/insert/UserBittersInsertModal.tsx";
import UserSyrupInsertModal from "../../common/component/modal/insert/UserSyrupInsertModal.tsx";
import UserCarbonatedInsertModal from "../../common/component/modal/insert/UserCarbonatedInsertModal.tsx";
import UserDairyCreamInsertModal from "../../common/component/modal/insert/UserDairyCreamInsertModal.tsx";
import UserGarnishesInsertModal from "../../common/component/modal/insert/UserGarnishesInsertModal.tsx";
import UserOtherIngredientsInsertModal from "../../common/component/modal/insert/UserOtherIngredientsInsertModal.tsx";
import UserToolInsertModal from "../../common/component/modal/insert/UserToolInsertModal.tsx";
import UserGlasswareInsertModal from "../../common/component/modal/insert/UserGlasswareInsertModal.tsx";
import UserTechniqueInsertModal from "../../common/component/modal/insert/UserTechniqueInsertModal.tsx";

interface CocktailInsertModalProps {
  open: boolean;
  onClose: () => void;
}

type IngredientKey = "spirits" | "juices" | "bitters" | "syrups" | "carbonated" | "dairy" | "garnishes" | "others";
type TechniqueKey = "tools" | "glassware" | "techniques";
type ModalKey = IngredientKey | TechniqueKey;
type FocusableField = "cocktailName" | "cocktailNameKr" | "absPercentage" | "servingSizeMl";

const INGREDIENT_LABELS: Record<IngredientKey, string> = {
  spirits: "기주",
  juices: "주스",
  bitters: "비터스",
  syrups: "시럽",
  carbonated: "탄산/소다",
  dairy: "유제품/크림",
  garnishes: "가니쉬",
  others: "기타",
};

const TECHNIQUE_LABELS: Record<TechniqueKey, string> = {
  tools: "도구/기물",
  glassware: "사용 잔",
  techniques: "제조 기법",
};

const CocktailInsertModal: React.FC<CocktailInsertModalProps> = ({ open, onClose }) => {
  const { user } = useAuth();

  /*
  * 태그 state 제어
  * */
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  /*
  * Modal State 제어
  * */
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  /*
  * validation 에러 state 제어
  * */
  const [validationError, setValidationError] = useState<Record<string, string>>({});

  /*
  * form 필드 state (NOT NULL 필드)
  * */
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailNameKr, setCocktailNameKr] = useState("");
  const [category, setCategory] = useState<CocktailCategory | "">("");
  const [absPercentage, setAbsPercentage] = useState("");
  const [servingSizeMl, setServingSizeMl] = useState("");
  const [difficulty, setDifficulty] = useState<number | "">("");
  const [source, setSource] = useState<"official" | "community" | "">("");

  /*
  * 포커스 제어 refs
  * */
  const FORM_REFS: Record<FocusableField, React.RefObject<HTMLInputElement | null>> = {
    cocktailName: useRef<HTMLInputElement>(null),
    cocktailNameKr: useRef<HTMLInputElement>(null),
    absPercentage: useRef<HTMLInputElement>(null),
    servingSizeMl: useRef<HTMLInputElement>(null),
  };

  /*
  * 재료 선택 state
  * */
  const [selectedIngredients, setSelectedIngredients] = useState<Record<IngredientKey, CommonSlideElement[]>>({
    spirits: [],
    juices: [],
    bitters: [],
    syrups: [],
    carbonated: [],
    dairy: [],
    garnishes: [],
    others: [],
  });

  /*
  * 기법 선택 state
  * */
  const [selectedTechniques, setSelectedTechniques] = useState<Record<TechniqueKey, CommonSlideElement[]>>({
    tools: [],
    glassware: [],
    techniques: [],
  });

  /*
  * 재료 슬라이드 제어 refs
  * */
  const INGREDIENT_REFS: Record<IngredientKey, React.RefObject<HTMLDivElement | null>> = {
    spirits: useRef<HTMLDivElement>(null),
    juices: useRef<HTMLDivElement>(null),
    bitters: useRef<HTMLDivElement>(null),
    syrups: useRef<HTMLDivElement>(null),
    carbonated: useRef<HTMLDivElement>(null),
    dairy: useRef<HTMLDivElement>(null),
    garnishes: useRef<HTMLDivElement>(null),
    others: useRef<HTMLDivElement>(null),
  };

  /*
  * 제조 기법 슬라이드 제어 refs
  * */
  const TECHNIQUE_REFS: Record<TechniqueKey, React.RefObject<HTMLDivElement | null>> = {
    tools: useRef<HTMLDivElement>(null),
    glassware: useRef<HTMLDivElement>(null),
    techniques: useRef<HTMLDivElement>(null),
  };

  const handleSelectIngredient = (key: IngredientKey) => (item: CommonSlideElement) => {
    setSelectedIngredients((prev) => {
      if (prev[key].some((i) => i.id === item.id)) {
        return prev
      }

      return { ...prev, [key]: [...prev[key], item] };
    });
    setOpenModal(null);
  };

  const handleSelectSpirits = (items: CommonSlideElement[]) => {
    setSelectedIngredients((prev) => {
      const newItems = items.filter(i => !prev.spirits.some(e => e.id === i.id));
      return { ...prev, spirits: [...prev.spirits, ...newItems] };
    });
    setOpenModal(null);
  };

  const handleRemoveIngredient = (key: IngredientKey, id: number) => {
    setSelectedIngredients((prev) => ({ ...prev, [key]: prev[key].filter((i) => i.id !== id) }));
  };

  const handleSelectTechnique = (key: TechniqueKey) => (item: CommonSlideElement) => {
    setSelectedTechniques((prev) => {
      if (prev[key].some((i) => i.id === item.id)) {
        return prev
      }

      return { ...prev, [key]: [...prev[key], item] };
    });
    setOpenModal(null);
  };

  const handleRemoveTechnique = (key: TechniqueKey, id: number) => {
    setSelectedTechniques((prev) => ({ ...prev, [key]: prev[key].filter((i) => i.id !== id) }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, "");

    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const clearError = (field: string) => {
    setValidationError((prev) => {
      if (!prev[field]) {
        return prev
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!cocktailName.trim()) newErrors.cocktailName = "칵테일 이름(영문)을 입력해 주세요.";
    if (!cocktailNameKr.trim()) newErrors.cocktailNameKr = "칵테일 이름(한글)을 입력해 주세요.";
    if (!category) newErrors.category = "카테고리를 선택해 주세요.";
    if (!absPercentage) newErrors.absPercentage = "예상 도수를 입력해 주세요.";
    if (!servingSizeMl) newErrors.servingSizeMl = "표준 제공량을 입력해 주세요.";
    if (!difficulty) newErrors.difficulty = "난이도를 선택해 주세요.";
    if (!source) newErrors.source = "출처를 선택해 주세요.";

    setValidationError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstFocusable = (["cocktailName", "cocktailNameKr", "absPercentage", "servingSizeMl"] as FocusableField[])
        .find((key) => newErrors[key]);
      if (firstFocusable) FORM_REFS[firstFocusable].current?.focus();
      return;
    }

    // TODO: API 호출
    console.log("submit");
  };

  return (
    <>
    <AnimatePresence>
      {open && (
        <StyledModal
          open={open}
          onClose={onClose}
          closeAfterTransition
        >
          <ModalContainer
            as={motion.div}
            variants={COMMON_MODAL_STYLE}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 헤더 섹션 */}
            <HeaderSection>
              <ImageUploadArea>
                <PlaceholderIcon>
                  <LocalBarOutlined fontSize="inherit" />
                </PlaceholderIcon>
                <ImageUploadText>이미지 업로드</ImageUploadText>
              </ImageUploadArea>

              <TitleInfoGroup>
                <TitleSection>
                  <StyledTextField
                    inputRef={FORM_REFS.cocktailName}
                    placeholder="칵테일 이름 (영문)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={cocktailName}
                    onChange={(e) => { setCocktailName(e.target.value); clearError("cocktailName"); }}
                    error={!!validationError.cocktailName}
                    helperText={validationError.cocktailName}
                  />
                  <StyledTextField
                    inputRef={FORM_REFS.cocktailNameKr}
                    placeholder="칵테일 이름 (한글)"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={cocktailNameKr}
                    onChange={(e) => { setCocktailNameKr(e.target.value); clearError("cocktailNameKr"); }}
                    error={!!validationError.cocktailNameKr}
                    helperText={validationError.cocktailNameKr}
                  />
                </TitleSection>

                <InfoGrid>
                  <InfoCard>
                    <InfoLabel>카테고리</InfoLabel>
                    <FormControl error={!!validationError.category} size="small" fullWidth>
                      <StyledSelect
                        value={category}
                        onChange={(e) => { setCategory(e.target.value as CocktailCategory); clearError("category"); }}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>선택</MenuItem>
                        <MenuItem value="classic">클래식</MenuItem>
                        <MenuItem value="contemporary">컨템포러리</MenuItem>
                        <MenuItem value="signature">시그니처</MenuItem>
                        <MenuItem value="mocktail">목테일</MenuItem>
                        <MenuItem value="other">기타</MenuItem>
                      </StyledSelect>
                      {validationError.category && <FormHelperText>{validationError.category}</FormHelperText>}
                    </FormControl>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>예상 도수</InfoLabel>
                    <StyledTextField
                      inputRef={FORM_REFS.absPercentage}
                      placeholder="0"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={absPercentage}
                      onChange={(e) => { setAbsPercentage(e.target.value); clearError("absPercentage"); }}
                      error={!!validationError.absPercentage}
                      helperText={validationError.absPercentage}
                      InputProps={{ endAdornment: <span>%</span> }}
                    />
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>표준 제공량</InfoLabel>
                    <StyledTextField
                      inputRef={FORM_REFS.servingSizeMl}
                      placeholder="0"
                      variant="outlined"
                      size="small"
                      type="number"
                      fullWidth
                      value={servingSizeMl}
                      onChange={(e) => { setServingSizeMl(e.target.value); clearError("servingSizeMl"); }}
                      error={!!validationError.servingSizeMl}
                      helperText={validationError.servingSizeMl}
                      InputProps={{ endAdornment: <span>ml</span> }}
                    />
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>난이도</InfoLabel>
                    <FormControl error={!!validationError.difficulty} size="small" fullWidth>
                      <StyledSelect
                        value={difficulty}
                        onChange={(e) => { setDifficulty(e.target.value as number); clearError("difficulty"); }}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>선택</MenuItem>
                        <MenuItem value={1}>1 - 매우 쉬움</MenuItem>
                        <MenuItem value={2}>2 - 쉬움</MenuItem>
                        <MenuItem value={3}>3 - 보통</MenuItem>
                        <MenuItem value={4}>4 - 어려움</MenuItem>
                        <MenuItem value={5}>5 - 매우 어려움</MenuItem>
                      </StyledSelect>
                      {validationError.difficulty && <FormHelperText>{validationError.difficulty}</FormHelperText>}
                    </FormControl>
                  </InfoCard>

                  <InfoCard>
                    <InfoLabel>출처</InfoLabel>
                    <FormControl error={!!validationError.source} size="small" fullWidth>
                      <StyledSelect
                        value={source}
                        onChange={(e) => { setSource(e.target.value as "official" | "community"); clearError("source"); }}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>선택</MenuItem>
                        <MenuItem value="official">공식</MenuItem>
                        <MenuItem value="community">커뮤니티 레시피</MenuItem>
                      </StyledSelect>
                      {validationError.source && <FormHelperText>{validationError.source}</FormHelperText>}
                    </FormControl>
                  </InfoCard>
                </InfoGrid>

                <StyledTextField
                  placeholder="한 줄 소개..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                />
              </TitleInfoGroup>
            </HeaderSection>

            {/* 콘텐츠 섹션 */}
            <ContentSection>
              <SectionDivider />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <SectionTitle>역사</SectionTitle>
                <TipTapEditor placeholder="칵테일의 역사를 입력하세요..." />
              </motion.div>

              <SectionDivider />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SectionTitle>사용 재료</SectionTitle>
                <IngredientPanel>
                  {(Object.keys(INGREDIENT_LABELS) as IngredientKey[]).map((key) => (
                    <CategoryRow key={key}>
                      <CategoryRowHeader>
                        <CategoryLabel>{INGREDIENT_LABELS[key]}</CategoryLabel>
                        <CategoryAddButton
                          size="small"
                          variant="outlined"
                          startIcon={<AddOutlined />}
                          onClick={() => setOpenModal(key)}
                        >
                          추가
                        </CategoryAddButton>
                      </CategoryRowHeader>
                      {selectedIngredients[key].length > 0 ? (
                        <CategorySlide
                          title={INGREDIENT_LABELS[key]}
                          items={selectedIngredients[key]}
                          slideRef={INGREDIENT_REFS[key]}
                          onItemRemove={(item) => handleRemoveIngredient(key, item.id)}
                        />
                      ) : (
                        <EmptyHint>선택된 항목이 없습니다.</EmptyHint>
                      )}
                    </CategoryRow>
                  ))}
                </IngredientPanel>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SectionTitle>제조 기법</SectionTitle>
                <TechniquePanel>
                  {(Object.keys(TECHNIQUE_LABELS) as TechniqueKey[]).map((key) => (
                    <CategoryRow key={key}>
                      <CategoryRowHeader>
                        <CategoryLabel>{TECHNIQUE_LABELS[key]}</CategoryLabel>
                        <CategoryAddButton
                          size="small"
                          variant="outlined"
                          startIcon={<AddOutlined />}
                          onClick={() => setOpenModal(key)}
                          className="technique"
                        >
                          추가
                        </CategoryAddButton>
                      </CategoryRowHeader>
                      {selectedTechniques[key].length > 0 ? (
                        <CategorySlide
                          title={TECHNIQUE_LABELS[key]}
                          items={selectedTechniques[key]}
                          slideRef={TECHNIQUE_REFS[key]}
                          onItemRemove={(item) => handleRemoveTechnique(key, item.id)}
                          className="technique"
                        />
                      ) : (
                        <EmptyHint>선택된 항목이 없습니다.</EmptyHint>
                      )}
                    </CategoryRow>
                  ))}
                </TechniquePanel>
              </motion.div>

              <SectionDivider />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SectionTitle>제조법</SectionTitle>
                <TipTapEditor placeholder="제조법을 입력하세요..." />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <SectionTitle>제조 팁</SectionTitle>
                <TipTapEditor placeholder="제조 팁을 입력하세요..." />
              </motion.div>

              <SectionDivider />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <PersonalSection>
                  <PersonalTitle>{user?.username ?? '나'}님의 설명</PersonalTitle>
                  <StyledTextField
                    placeholder="개인적인 설명을 입력하세요..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </PersonalSection>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <PersonalSection>
                  <PersonalTitle>{user?.username ?? '나'}님의 팁</PersonalTitle>
                  <StyledTextField
                    placeholder="개인적인 팁을 입력하세요..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </PersonalSection>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <PersonalSection>
                  <PersonalTitle>{user?.username ?? '나'}님의 후기</PersonalTitle>
                  <StyledTextField
                    placeholder="개인적인 후기를 입력하세요..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </PersonalSection>
              </motion.div>

              {/* 태그 섹션 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <TagSection>
                  <TagSectionHeader>
                    <TagSectionTitle>태그</TagSectionTitle>
                    <TagSectionDesc>Enter 또는 추가 버튼으로 태그를 입력하세요.</TagSectionDesc>
                  </TagSectionHeader>
                  <TagInputRow>
                    <StyledTextField
                      placeholder="태그 입력 (예: 클래식)"
                      variant="outlined"
                      size="small"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TagHash>#</TagHash>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TagAddButton
                      variant="contained"
                      disableElevation
                      onClick={handleAddTag}
                      startIcon={<AddOutlined />}
                    >
                      추가
                    </TagAddButton>
                  </TagInputRow>
                  {tags.length > 0 && (
                    <TagChipContainer>
                      {tags.map((tag) => (
                        <TagChip
                          key={tag}
                          label={`#${tag}`}
                          onDelete={() => handleRemoveTag(tag)}
                          deleteIcon={<CloseOutlined style={{ fontSize: 14 }} />}
                        />
                      ))}
                    </TagChipContainer>
                  )}
                </TagSection>
              </motion.div>

              <SectionDivider />
            </ContentSection>

            {/* 하단 버튼 섹션 */}
            <BottomSection>
              <ActionButtons>
                <CancelButton
                  variant="outlined"
                  onClick={onClose}
                >
                  취소
                </CancelButton>
                <SubmitButton
                  variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                >
                  등록
                </SubmitButton>
              </ActionButtons>
            </BottomSection>
          </ModalContainer>
        </StyledModal>
      )}

    </AnimatePresence>

      {/* 재료 sub-modals */}
      <UserSpiritInsertModal open={openModal === "spirits"} onClose={() => setOpenModal(null)} onSelect={handleSelectSpirits} />
      <UserJuiceInsertModal open={openModal === "juices"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("juices")} />
      <UserBittersInsertModal open={openModal === "bitters"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("bitters")} />
      <UserSyrupInsertModal open={openModal === "syrups"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("syrups")} />
      <UserCarbonatedInsertModal open={openModal === "carbonated"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("carbonated")} />
      <UserDairyCreamInsertModal open={openModal === "dairy"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("dairy")} />
      <UserGarnishesInsertModal open={openModal === "garnishes"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("garnishes")} />
      <UserOtherIngredientsInsertModal open={openModal === "others"} onClose={() => setOpenModal(null)} onSelect={handleSelectIngredient("others")} />

      {/* 제조 기법 sub-modals */}
      <UserToolInsertModal open={openModal === "tools"} onClose={() => setOpenModal(null)} onSelect={handleSelectTechnique("tools")} />
      <UserGlasswareInsertModal open={openModal === "glassware"} onClose={() => setOpenModal(null)} onSelect={handleSelectTechnique("glassware")} />
      <UserTechniqueInsertModal open={openModal === "techniques"} onClose={() => setOpenModal(null)} onSelect={handleSelectTechnique("techniques")} />
    </>
  );
};

export default CocktailInsertModal;

const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

const ModalContainer = styled(Paper)`
  && {
    max-width: 1000px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    margin: auto;

    &:focus {
      outline: none;
    }

    @media (max-width: 600px) {
      margin: 16px;
      max-height: 95vh;
      border-radius: 16px;
    }
  }
`;

const HeaderSection = styled(Box)`
  && {
    position: relative;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 600px) {
      padding: 24px;
    }
  }
`;

const ImageUploadArea = styled(Box)`
  && {
    width: 220px;
    height: 220px;
    border-radius: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ffa726);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
    cursor: pointer;
    gap: 8px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }
`;

const PlaceholderIcon = styled(Box)`
  && {
    font-size: 56px;
    color: white;
  }
`;

const ImageUploadText = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
  }
`;

const TitleInfoGroup = styled(Box)`
  && {
    background: rgba(240, 242, 248, 0.85);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid rgba(103, 126, 234, 0.15);
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TitleSection = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const InfoGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
`;

const InfoCard = styled(Box)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;

    .MuiOutlinedInput-root {
      border-radius: 12px;

      &.Mui-error fieldset {
        border-color: #e57373;
      }
    }

    .MuiFormHelperText-root.Mui-error {
      color: #e57373;
      margin-left: 4px;
      font-size: 0.75rem;
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;

    .MuiOutlinedInput-notchedOutline {
      border-radius: 12px;
    }
  }
`;

const ContentSection = styled(Box)`
  && {
    padding: 0 32px 32px;

    @media (max-width: 600px) {
      padding: 0 24px 24px;
    }
  }
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }
`;

const IngredientPanel = styled(Box)`
  && {
    background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(76, 175, 80, 0.2);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const TechniquePanel = styled(Box)`
  && {
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8ff 100%);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(33, 150, 243, 0.2);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const CategoryRow = styled(Box)`
  && {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }
  }
`;

const CategoryRowHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;

const CategoryLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    font-weight: 600;
    color: #2c3e50;
  }
`;

const CategoryAddButton = styled(Button)`
  && {
    border-radius: 8px;
    padding: 2px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: none;
    border-color: rgba(76, 175, 80, 0.5);
    color: #388e3c;
    min-width: unset;

    &:hover {
      border-color: #388e3c;
      background-color: rgba(76, 175, 80, 0.06);
    }

    &.technique {
      border-color: rgba(33, 150, 243, 0.5);
      color: #1976d2;

      &:hover {
        border-color: #1976d2;
        background-color: rgba(33, 150, 243, 0.06);
      }
    }
  }
`;


const EmptyHint = styled(Typography)`
  && {
    font-size: 0.78rem;
    color: #b0b0b0;
    font-style: italic;
    padding: 2px 0;
  }
`;

const PersonalSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 16px;
    border-left: 4px solid #818cf8;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const PersonalTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #818cf8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const SectionDivider = styled(Divider)`
  && {
    margin: 28px 0;
    border-color: rgba(0, 0, 0, 0.18);
    border-style: dashed;
  }
`;

const TagSection = styled(Box)`
  && {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;

const TagSectionHeader = styled(Box)`
  && {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
`;

const TagSectionTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #d1d5db;
    }
  }
`;

const TagSectionDesc = styled(Typography)`
  && {
    font-size: 0.8rem;
    color: #a0a0a0;
  }
`;

const TagInputRow = styled(Box)`
  && {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const TagHash = styled.span`
  font-weight: 700;
  color: #9ca3af;
  font-size: 1rem;
`;

const TagAddButton = styled(Button)`
  && {
    background-color: #1e293b;
    color: #fff;
    border-radius: 12px;
    padding: 7px 20px;
    font-weight: 600;
    text-transform: none;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
      background-color: #334155;
    }
  }
`;

const TagChipContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const TagChip = styled(Chip)`
  && {
    background: #1e293b;
    color: #f1f5f9;
    font-weight: 500;
    font-size: 0.8rem;
    border-radius: 20px;

    & .MuiChip-deleteIcon {
      color: rgba(241, 245, 249, 0.6);

      &:hover {
        color: #f1f5f9;
      }
    }

    &:hover {
      background: #334155;
    }
  }
`;

const BottomSection = styled(Box)`
  && {
    padding: 24px 32px 32px;
    background: rgba(248, 249, 250, 0.8);

    @media (max-width: 600px) {
      padding: 20px 24px 24px;
    }
  }
`;

const ActionButtons = styled(Box)`
  && {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;

const CancelButton = styled(Button)`
  && {
    border-radius: 12px;
    padding: 8px 24px;
    font-weight: 600;
    text-transform: none;
    border-color: #ddd;
    color: #7f8c8d;

    &:hover {
      border-color: #bbb;
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

const SubmitButton = styled(Button)`
  && {
    background-color: #ff4757;
    color: #fff;
    border-radius: 12px;
    padding: 8px 32px;
    font-weight: 600;
    text-transform: none;

    &:hover {
      background-color: #e8404f;
    }
  }
`;
