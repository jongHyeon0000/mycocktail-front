import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import CommonErrorSnackbar from "../component/snackbar/CommonErrorSnackbar.tsx";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../auth/service/useAuth.ts";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login, isLoginLoading, errorResponse, isAuthenticated } = useAuth();

  // API 에러 발생 시 Snackbar + 해당 필드 focus
  useEffect(() => {
    if (!errorResponse) {
      return;
    }

    setSnackbarMessage(errorResponse.message);
    setSnackbarOpen(true);

    if (errorResponse.code === "USER_NOT_FOUND") {
      setEmailError("존재하는 이메일이 없습니다.");
      setTimeout(() => emailRef.current?.focus(), 0);
    } else if (errorResponse.code === "UNAUTHORIZED") {
      setPasswordError("패스워드가 일치하지 않습니다.");
      setTimeout(() => passwordRef.current?.focus(), 0);
    }
  }, [errorResponse]);

  const handleLogin = async () => {
    let hasError = false;

    if (!email.trim()) {
      setEmailError("이메일을 입력해 주세요.");

      if (!hasError) {
        emailRef.current?.focus();
        hasError = true;
      }
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해 주세요.");

      if (!hasError) {
        passwordRef.current?.focus();
      }
    }

    if (hasError || !email.trim() || !password.trim()) {
      return;
    }

    const result = await login({ email, password });

    if (result) {
      navigate("/");
    }
  };

  if (isAuthenticated) {
    return (
        <Navigate to="/" replace />
    );
  }

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
            {/* 이메일 입력 */}
            <StyledTextField
              fullWidth
              label="이메일"
              variant="outlined"
              size="medium"
              autoComplete="username"
              inputRef={emailRef}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (emailError) {
                  setEmailError("")
                }
              }}
              error={!!emailError}
              helperText={emailError}
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
                  setPasswordError("");
                }
              }}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin()
                }
              }}
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
              disabled={isLoginLoading}
            >
              {isLoginLoading ? "로그인 중..." : "로그인"}
            </LoginButton>
          </LoginCard>
        </CardMotionWrapper>
      </LoginContainer>

      {/* 에러 Snackbar */}
      <CommonErrorSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
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

    &.Mui-disabled {
      background-color: #999;
      color: #fff;
    }
  }
` as typeof Button;
