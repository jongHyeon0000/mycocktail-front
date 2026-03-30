import type {RefObject} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LocalBarRounded } from '@mui/icons-material';
import styled from "styled-components";
import {Box, Typography} from "@mui/material";
import {commonDragStyle} from "../style/CommonDrag.style.ts";
import type {CommonSlideElement} from "../interface/CommonSlideElement.ts";
import {useEffect} from "react";

interface CategorySlideProps {
  title: string;
  items: CommonSlideElement[];
  slideRef: RefObject<HTMLDivElement | null>;
  onItemClick?: (item: CommonSlideElement) => void;
  onItemRemove?: (item: CommonSlideElement) => void;
  className?: string;
}

export const CategorySlide = ({
      title,
      items,
      slideRef,
      onItemClick,
      onItemRemove,
      className,
    }: CategorySlideProps) => {
  const controls = useAnimation();

  useEffect(() => {
    // 아이템이 적을 때 초기 위치로 설정
    if (slideRef.current) {
      const container = slideRef.current;
      const track = container.querySelector('[data-track="true"]') as HTMLElement;
      
      if (track) {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        
        // 콘텐츠가 컨테이너보다 작으면 드래그 제한
        if (trackWidth <= containerWidth) {
          controls.start({ x: 0 });
        }
      }
    }
  }, [items, slideRef, controls]);

  const handleDragEnd = () => {
    if (slideRef.current) {
      const container = slideRef.current;
      const track = container.querySelector('[data-track="true"]') as HTMLElement;
      
      if (track) {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        
        // 콘텐츠가 컨테이너보다 작으면 원위치로 복귀
        if (trackWidth <= containerWidth) {
          controls.start({
            x: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 25
            }
          });
        }
      }
    }
  };

  return (
      <CategorySection className={className}>
        <SlideCategoryTitle className={className}>{title}</SlideCategoryTitle>
        <SlideContainer ref={slideRef}>
          <SlideWrapper>
            <SlideTrack 
              {...commonDragStyle(slideRef)}
              data-track="true"
              animate={controls}
              onDragEnd={handleDragEnd}
            >
              {items.map((item) => {
                return (
                    <SlideItem
                        key={item.id}
                        as={motion.div}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onItemClick?.(item)}
                        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
                    >
                      {onItemRemove && (
                        <RemoveButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemRemove(item);
                          }}
                        >
                          ×
                        </RemoveButton>
                      )}
                      <SlideItemImage>
                        {item?.image ? (
                            <img src={item?.image} alt={item.name} />
                        ) : (
                            <SlideItemPlaceholder>
                              <LocalBarRounded fontSize="inherit" />
                            </SlideItemPlaceholder>
                        )}
                      </SlideItemImage>
                      <SlideItemEnglishName>{item.name}</SlideItemEnglishName>
                      <SlideItemKoreanName>{item.nameKr}</SlideItemKoreanName>
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
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 1px;
    }

    /* 기법 섹션용 구분선 */
    &.technique:not(:last-child)::after {
      background: rgba(0, 0, 0, 0.07);
    }
  }
`;

const SlideCategoryTitle = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 700;
    color: #2e7d32;
    margin-bottom: 12px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: none;
    border: none;
    border-radius: 0;

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4caf50;
      flex-shrink: 0;
    }

    &.technique {
      color: #1565c0;
    }

    &.technique::before {
      background: #42a5f5;
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
    min-width: 130px;
    position: relative;
    background: #f2f4f6;
    border-radius: 16px;
    padding: 16px 12px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;

    &:hover {
      background: #e8ecf0;
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
    }

    @media (max-width: 600px) {
      min-width: 110px;
      padding: 12px 10px;
    }
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 0.85rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s;
  z-index: 1;

  &:hover {
    background: #e74c3c;
  }
`;

const SlideItemImage = styled(Box)`
  && {
    width: 72px;
    height: 72px;
    border-radius: 14px;
    background: #efefef;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    overflow: hidden;
    box-shadow: none;
    
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