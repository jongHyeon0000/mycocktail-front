import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CommonSuccessSnackbar from "../../common/component/snackbar/CommonSuccessSnackbar.tsx";
import CommonErrorSnackbar from "../../common/component/snackbar/CommonErrorSnackbar.tsx";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  CakeOutlined,
  CameraAltOutlined,
  EmailOutlined,
  NotesOutlined,
  PersonOutlined,
  SaveOutlined,
  WcOutlined,
} from "@mui/icons-material";
import useAuth from "../../auth/service/useAuth.ts";
import useUpdateUserInfo from "../../auth/service/useUpdateUserInfo.ts";
import { useAuthStore } from "../../../../store/authStore.ts";

const ProfileEditPage: React.FC = () => {
  const { user } = useAuth();
  const { updateUserInfoResponse, fetchUpdateUserInfo, updateUserInfoLoading } = useUpdateUserInfo();
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string>(user?.thumbnailImage ?? "");
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [gender, setGender] = useState<string>(user?.gender ?? "");
  const [birthDate, setBirthDate] = useState<string>(user?.birthDate ?? "");
  const [profileNotes, setProfileNotes] = useState<string>(user?.profileNotes ?? "");

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    if (!updateUserInfoResponse) return;
    if (updateUserInfoResponse.code === 'OK') {
      if (updateUserInfoResponse.data) setUser(updateUserInfoResponse.data);
      setSnackbarSeverity("success");
      setSnackbarMessage("회원정보가 수정되었습니다.");
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage(updateUserInfoResponse.message);
    }
    setSnackbarOpen(true);
  }, [updateUserInfoResponse]);

  if (!user) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
  };

  const handleSubmit = () => {
    fetchUpdateUserInfo({
      ...user,
      username,
      gender,
      birthDate,
      profileNotes,
      thumbnailImage: previewImage,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 페이지 타이틀 */}
      <PageTitle variant="h6">회원정보 수정</PageTitle>

      {/* 썸네일 이미지 */}
      <AvatarSection>
        <AvatarWrapper onClick={handleImageClick}>
          <StyledAvatar src={previewImage} alt={username}>
            <PersonOutlined sx={{ fontSize: 56, color: "#bbb" }} />
          </StyledAvatar>
          <AvatarOverlay>
            <CameraAltOutlined sx={{ fontSize: 24, color: "#fff" }} />
          </AvatarOverlay>
        </AvatarWrapper>
        <AvatarHint variant="body2">클릭하여 이미지 변경</AvatarHint>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </AvatarSection>

      <Divider sx={{ my: 3, borderColor: "#f0f0f0" }} />

      {/* 기본 정보 섹션 */}
      <SectionTitle>기본 정보</SectionTitle>

      <FieldStack>
        {/* 유저명 */}
        <FieldRow>
          <FieldIconWrapper>
            <PersonOutlined sx={{ fontSize: 20, color: "#888" }} />
          </FieldIconWrapper>
          <StyledTextField
            fullWidth
            label="유저명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ maxLength: 20 }}
          />
        </FieldRow>

        {/* 이메일 (수정 불가) */}
        <FieldRow>
          <FieldIconWrapper>
            <EmailOutlined sx={{ fontSize: 20, color: "#bbb" }} />
          </FieldIconWrapper>
          <StyledTextField
            fullWidth
            label="이메일"
            value={user.email}
            disabled
            helperText="이메일은 변경할 수 없습니다."
          />
        </FieldRow>

        {/* 성별 */}
        <FieldRow>
          <FieldIconWrapper>
            <WcOutlined sx={{ fontSize: 20, color: "#888" }} />
          </FieldIconWrapper>
          <StyledFormControl fullWidth>
            <InputLabel>성별</InputLabel>
            <Select
              label="성별"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">선택 안함</MenuItem>
              <MenuItem value="M">남성</MenuItem>
              <MenuItem value="F">여성</MenuItem>
            </Select>
          </StyledFormControl>
        </FieldRow>

        {/* 생일 */}
        <FieldRow>
          <FieldIconWrapper>
            <CakeOutlined sx={{ fontSize: 20, color: "#888" }} />
          </FieldIconWrapper>
          <DateFieldWrapper>
            <DateLabel>생일</DateLabel>
            <DateInput
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </DateFieldWrapper>
        </FieldRow>

        {/* 자기 소개 */}
        <FieldRow sx={{ alignItems: "flex-start" }}>
          <FieldIconWrapper sx={{ mt: "14px" }}>
            <NotesOutlined sx={{ fontSize: 20, color: "#888" }} />
          </FieldIconWrapper>
          <StyledTextField
            fullWidth
            label="자기 소개"
            multiline
            rows={4}
            value={profileNotes}
            onChange={(e) => setProfileNotes(e.target.value)}
            inputProps={{ maxLength: 300 }}
            helperText={`${profileNotes.length} / 300`}
          />
        </FieldRow>
      </FieldStack>

      <Divider sx={{ my: 3, borderColor: "#f0f0f0" }} />

      {/* 저장 버튼 */}
      <ButtonRow>
        <SaveButton
          variant="contained"
          startIcon={<SaveOutlined />}
          disableElevation
          onClick={handleSubmit}
          disabled={updateUserInfoLoading}
        >
          {updateUserInfoLoading ? "저장 중..." : "저장하기"}
        </SaveButton>
      </ButtonRow>

      {/* 성공 / 실패 Snackbar */}
      {snackbarSeverity === "success" ? (
        <CommonSuccessSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={() => setSnackbarOpen(false)}
        />
      ) : (
        <CommonErrorSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={() => setSnackbarOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default ProfileEditPage;

// ─── Styled Components ────────────────────────────────────────────────────────

const PageTitle = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 28px;
  }
`;

const AvatarSection = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const AvatarWrapper = styled(Box)`
  && {
    position: relative;
    width: 100px;
    height: 100px;
    cursor: pointer;
    border-radius: 50%;

    &:hover > div {
      opacity: 1;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;
    border: 2px solid #eee;
  }
`;

const AvatarOverlay = styled(Box)`
  && {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
`;

const AvatarHint = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #bbb;
  }
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 20px;
  }
`;

const FieldStack = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const FieldRow = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 14px;
  }
`;

const FieldIconWrapper = styled(Box)`
  && {
    width: 36px;
    height: 36px;
    background-color: #f0f0f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
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

      &.Mui-disabled {
        background-color: #f5f5f5;
      }
    }

    & fieldset {
      border-color: #eee;
    }

    .MuiInputLabel-root.Mui-focused {
      color: #666;
    }

    .MuiFormHelperText-root {
      margin-left: 4px;
      font-size: 0.75rem;
      color: #bbb;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
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
    }

    & fieldset {
      border-color: #eee;
    }

    .MuiInputLabel-root.Mui-focused {
      color: #666;
    }
  }
`;

/* 생일 — native date input */
const DateFieldWrapper = styled(Box)`
  && {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 10px 14px;
    transition: border-color 0.2s ease;

    &:focus-within {
      border-color: #888;
    }
  }
`;

const DateLabel = styled(Typography)`
  && {
    font-size: 0.72rem;
    color: #aaa;
    font-weight: 500;
    line-height: 1;
  }
`;

const DateInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #333;
  font-family: inherit;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ButtonRow = styled(Box)`
  && {
    display: flex;
    justify-content: flex-end;
  }
`;

const SaveButton = styled(Button)`
  && {
    height: 46px;
    padding: 0 28px;
    border-radius: 12px;
    background-color: #333;
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: none;

    &:hover {
      background-color: #222;
    }

    &.Mui-disabled {
      background-color: #999;
      color: #fff;
    }
  }
` as typeof Button;
