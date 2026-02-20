import React from "react";
import { Box, Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import MyPageSidebar from "./component/MyPageSidebar";
import {MY_PAGE_SUB_ROUTES} from "../../../route/MyPageRoutes.tsx";

const MyPageLayout: React.FC = () => {
  return (
    <PageContainer>
      <Container maxWidth="lg">
        <ContentWrapper>
          {/* 좌측 사이드바 */}
          <MyPageSidebar />

          {/* 우측 컨텐츠 영역 */}
          <ContentArea>
            <Routes>
              {/* 기본 경로는 나의 레시피로 리다이렉트 */}
              <Route index element={<Navigate to="recipes" replace />} />

              {/* 동적으로 서브 라우트 생성 */}
              {MY_PAGE_SUB_ROUTES.map((route) => {
                // '/my-page/recipes' -> 'recipes' 추출
                const subPath = route.path.replace('/my-page/', '');

                return (
                  <Route
                    key={route.path}
                    path={subPath}
                    element={route.element}
                  />
                );
              })}
            </Routes>
          </ContentArea>
        </ContentWrapper>
      </Container>
    </PageContainer>
  );
};

export default MyPageLayout;

const PageContainer = styled(Box)`
  && {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-top: 96px;
    padding-bottom: 48px;

    @media (max-width: 600px) {
      padding-top: 80px;
    }
  }
`;

const ContentWrapper = styled(Box)`
  && {
    display: flex;
    gap: 32px;

    @media (max-width: 900px) {
      flex-direction: column;
      gap: 0;
    }
  }
`;

const ContentArea = styled(Box)`
  && {
    flex: 1;
    background-color: #fff;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    min-height: 600px;

    @media (max-width: 600px) {
      padding: 24px;
      border-radius: 12px;
    }
  }
`;