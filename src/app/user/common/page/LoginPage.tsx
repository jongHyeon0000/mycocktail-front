import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"; // Box는 LoginCard에 사용
import { motion } from "framer-motion";
import styled from "styled-components";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError("아이디를 입력해 주세요.");

      if (!hasError) {
        usernameRef.current?.focus();
        hasError = true;
      }
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");

      if (!hasError) {
        passwordRef.current?.focus();
      }
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        {/* 로고 / 타이틀 */}
        <TitleSection
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TitleText variant="h4">
            <BoldText>MyCocktail</BoldText>
          </TitleText>
          <SubtitleText variant="body2">
            나만의 칵테일 레시피 플랫폼
          </SubtitleText>
        </TitleSection>

        {/* 로그인 카드 */}
        <CardMotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LoginCard>
            {/* 아이디 입력 */}
            <StyledTextField
              fullWidth
              label="아이디"
              variant="outlined"
              size="medium"
              autoComplete="username"
              inputRef={usernameRef}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);

                if (usernameError) {
                  setUsernameError("")
                }
              }}
              error={!!usernameError}
              helperText={usernameError}
            />

            {/* 비밀번호 입력 */}
            <StyledTextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              size="medium"
              autoComplete="current-password"
              inputRef={passwordRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (passwordError) {
                  setPasswordError("")
                }
              }}
              error={!!passwordError}
              helperText={passwordError}
            />

            {/* 로그인 버튼 */}
            <LoginButton
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              fullWidth
              variant="contained"
              disableElevation
              onClick={handleLogin}
            >
              로그인
            </LoginButton>
          </LoginCard>
        </CardMotionWrapper>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 444px;
  padding: 0 16px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const TitleSection = styled(motion.div)`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const TitleText = styled(Typography)`
  && {
    color: #333;
    letter-spacing: 0.03em;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const SubtitleText = styled(Typography)`
  && {
    margin-top: 8px;
    color: #999;
  }
`;

const CardMotionWrapper = styled(motion.div)`
  width: 100%;
`;

const LoginCard = styled(Box)`
  && {
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 36px 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 12px;
      background-color: #fafafa;

      &:hover fieldset {
        border-color: #ddd;
      }

      &.Mui-focused fieldset {
        border-color: #888;
      }

      &.Mui-error fieldset {
        border-color: #e57373;
      }
    }

    & fieldset {
      border-color: #eee;
    }

    .MuiInputLabel-root.Mui-focused {
      color: #666;
    }

    .MuiInputLabel-root.Mui-error {
      color: #e57373;
    }

    .MuiFormHelperText-root {
      margin-left: 4px;
      font-size: 0.75rem;
    }

    .MuiFormHelperText-root.Mui-error {
      color: #e57373;
    }
  }
`;

const LoginButton = styled(Button)`
  && {
    height: 52px;
    border-radius: 12px;
    background-color: #333;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: none;
    margin-top: 8px;

    &:hover {
      background-color: #222;
    }
  }
` as typeof Button;
