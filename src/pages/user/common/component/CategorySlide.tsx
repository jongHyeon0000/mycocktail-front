import type {RefObject} from 'react';
import { motion } from 'framer-motion';
import { LocalBarRounded } from '@mui/icons-material';
import styled from "styled-components";
import {Box, Typography} from "@mui/material";
import {commonDragStyle} from "../style/CommonDrag.style.ts"; // 스타일 경로는 조정 필요

interface CategorySlideProps<T> {
  title: string;
  items: T[];
  slideRef: RefObject<HTMLDivElement | null>;
  getName: (item: T) => string;
  getNameKr: (item: T) => string;
  getImage?: (item: T) => string | undefined;
  getId: (item: T) => number | string;
  onItemClick?: (item: T) => void;
  className?: string;
}

export const CategorySlide = <T,>({
      title,
      items,
      slideRef,
      getName,
      getNameKr,
      getImage,
      getId,
      onItemClick,
      className,
    }: CategorySlideProps<T>) => {
  return (
      <CategorySection className={className}>
        <SlideCategoryTitle className={className}>{title}</SlideCategoryTitle>
        <SlideContainer ref={slideRef}>
          <SlideWrapper>
            <SlideTrack {...commonDragStyle(slideRef)}>
              {items.map((item) => {
                const id = getId(item);
                const name = getName(item);
                const nameKr = getNameKr(item);
                const image = getImage?.(item);

                return (
                    <SlideItem
                        key={id}
                        as={motion.div}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onItemClick?.(item)}
                        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
                    >
                      <SlideItemImage>
                        {image ? (
                            <img src={image} alt={name} />
                        ) : (
                            <SlideItemPlaceholder>
                              <LocalBarRounded fontSize="inherit" />
                            </SlideItemPlaceholder>
                        )}
                      </SlideItemImage>
                      <SlideItemEnglishName>{name}</SlideItemEnglishName>
                      <SlideItemKoreanName>{nameKr}</SlideItemKoreanName>
                    </SlideItem>
                );
              })}
            </SlideTrack>
          </SlideWrapper>
        </SlideContainer>
      </CategorySection>
  );
};

// 카테고리 구분을 위한 새로운 컨테이너 스타일
const CategorySection = styled(Box)`
  && {
    margin-bottom: 32px; /* 카테고리 간 간격 */
    position: relative;
    
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 24px; /* 카테고리 제목 위치에 맞춰 시작 */
      right: 10%;
      height: 2px;
      background: linear-gradient(90deg, rgba(76, 175, 80, 1) 0%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 100%);
      border-radius: 1px;
      box-shadow: 0 1px 3px rgba(76, 175, 80, 0.3);
    }
    
    /* 기법 섹션용 구분선 */
    &.technique:not(:last-child)::after {
      background: linear-gradient(90deg, rgba(33, 150, 243, 1) 0%, rgba(33, 150, 243, 0.8) 50%, rgba(33, 150, 243, 0.3) 100%);
      box-shadow: 0 1px 3px rgba(33, 150, 243, 0.3);
    }
  }
`;

const SlideCategoryTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #2e7d32;
    margin-bottom: 8px; /* 기존 16px에서 8px로 축소 */
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    display: inline-block;
    border: 1px solid rgba(76, 175, 80, 0.3);
    
    &.technique {
      color: #1565c0;
      border-color: rgba(33, 150, 243, 0.3);
    }
  }
`;

const SlideContainer = styled(Box)`
  && {
    margin-top: 16px;
    position: relative;
  }
`;

const SlideWrapper = styled(Box)`
  && {
    overflow: hidden; /* 스크롤바 완전 제거 */
    border-radius: 12px;
    padding: 8px 0;
    
    /* 모든 스크롤바 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Firefox */
    scrollbar-width: none;
    
    /* 모바일 터치 스크롤 개선 */
    -webkit-overflow-scrolling: touch;
  }
`;

const SlideTrack = styled(Box)`
  && {
    display: flex;
    gap: 16px;
    padding: 0 16px;
    width: max-content;
  }
`;

const SlideItem = styled(Box)`
  && {
    min-width: 140px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    @media (max-width: 600px) {
      min-width: 120px;
      padding: 12px;
    }
  }
`;

const SlideItemImage = styled(Box)`
  && {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      pointer-events: none; /* 이미지에서 드래그 방해 방지 */
      user-select: none;
    }
    
    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
    }
  }
`;

const SlideItemPlaceholder = styled(Box)`
  && {
    width: 32px;
    height: 32px;
    color: #adb5bd;
    
    @media (max-width: 600px) {
      width: 24px;
      height: 24px;
    }
  }
`;

const SlideItemEnglishName = styled(Typography)`
  && {
    font-size: 0.8rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 4px;
    line-height: 1.2;
    
    @media (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;

const SlideItemKoreanName = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #6c757d;
    line-height: 1.2;
    
    @media (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
`;