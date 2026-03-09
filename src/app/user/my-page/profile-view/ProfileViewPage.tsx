import React from "react";
import { Avatar, Box, Chip, Divider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  PersonOutlined,
  EmailOutlined,
  WcOutlined,
  CakeOutlined,
  NotesOutlined,
  CalendarTodayOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from "@mui/icons-material";
import useAuth from "../../auth/service/useAuth.ts";

/*
* "2024-01-15T09:30:00Z" → "2024년 01월 15일 09:30"
* */
const formatDateTime = (iso?: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}년 ${mm}월 ${dd}일 ${hh}:${min}`;
};

/*
* "1990-05-12" → "1990년 05월 12일"
* */
const formatDate = (date?: string): string => {
  if (!date) return "—";
  const parts = date.split("-");
  if (parts.length !== 3) return date;
  return `${parts[0]}년 ${parts[1]}월 ${parts[2]}일`;
};

const ProfileViewPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 페이지 타이틀 */}
      <PageTitle variant="h6">회원정보 조회</PageTitle>

      {/* 프로필 헤더 */}
      <ProfileHeader>
        <AvatarWrapper>
          <StyledAvatar src={user.thumbnailImage ?? ""} alt={user.username}>
            <PersonOutlined sx={{ fontSize: 56, color: "#bbb" }} />
          </StyledAvatar>
        </AvatarWrapper>

        <ProfileMeta>
          <UserName variant="h5">{user.username}</UserName>
          <UserEmail variant="body2">
            <EmailOutlined sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle", color: "#999" }} />
            {user.email}
          </UserEmail>
        </ProfileMeta>
      </ProfileHeader>

      <Divider sx={{ my: 3, borderColor: "#f0f0f0" }} />

      {/* 기본 정보 섹션 */}
      <SectionTitle>기본 정보</SectionTitle>
      <InfoGrid>
        <InfoCard>
          <InfoIconWrapper>
            <WcOutlined sx={{ fontSize: 20, color: "#888" }} />
          </InfoIconWrapper>
          <InfoContent>
            <InfoLabel>성별</InfoLabel>
            <InfoValue>{user.gender ?? "—"}</InfoValue>
          </InfoContent>
        </InfoCard>

        <InfoCard>
          <InfoIconWrapper>
            <CakeOutlined sx={{ fontSize: 20, color: "#888" }} />
          </InfoIconWrapper>
          <InfoContent>
            <InfoLabel>생일</InfoLabel>
            <InfoValue>{formatDate(user.birthDate)}</InfoValue>
          </InfoContent>
        </InfoCard>
      </InfoGrid>

      {/* 자기 소개 */}
      <BioCard>
        <BioHeader>
          <NotesOutlined sx={{ fontSize: 20, color: "#888" }} />
          <InfoLabel>자기 소개</InfoLabel>
        </BioHeader>
        <BioText>
          {user.profileNotes ?? "자기소개가 없습니다."}
        </BioText>
      </BioCard>

      <Divider sx={{ my: 3, borderColor: "#f0f0f0" }} />

      {/* 계정 정보 섹션 */}
      <SectionTitle>계정 정보</SectionTitle>
      <InfoGrid>
        <InfoCard>
          <InfoIconWrapper>
            <CalendarTodayOutlined sx={{ fontSize: 20, color: "#888" }} />
          </InfoIconWrapper>
          <InfoContent>
            <InfoLabel>가입일</InfoLabel>
            <InfoValue>{formatDateTime(user.createdAt)}</InfoValue>
          </InfoContent>
        </InfoCard>
      </InfoGrid>

      {/* 상태 정보 */}
      <StatusGrid>
        <StatusCard>
          <StatusRow>
            <StatusMeta>
              <CheckCircleOutlined sx={{ fontSize: 20, color: user.isActive ? "#4caf50" : "#bbb" }} />
              <InfoLabel>활성 여부</InfoLabel>
            </StatusMeta>
            <Chip
              label={user.isActive ? "활성" : "비활성"}
              size="small"
              sx={user.isActive ? activeChipSx : inactiveChipSx}
            />
          </StatusRow>
          <StatusDate>
            업데이트: {formatDateTime(user.deactivatedAt)}
          </StatusDate>
        </StatusCard>

        <StatusCard>
          <StatusRow>
            <StatusMeta>
              <CancelOutlined sx={{ fontSize: 20, color: user.isDeleted ? "#e57373" : "#bbb" }} />
              <InfoLabel>탈퇴 여부</InfoLabel>
            </StatusMeta>
            <Chip
              label={user.isDeleted ? "탈퇴" : "미탈퇴"}
              size="small"
              sx={user.isDeleted ? deletedChipSx : inactiveChipSx}
            />
          </StatusRow>
          <StatusDate>
            업데이트: {formatDateTime(user.deletedAt)}
          </StatusDate>
        </StatusCard>
      </StatusGrid>
    </motion.div>
  );
};

export default ProfileViewPage;

// ─── Styled Components ────────────────────────────────────────────────────────

const PageTitle = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 28px;
  }
`;

const ProfileHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
`;

const AvatarWrapper = styled(Box)`
  && {
    flex-shrink: 0;
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

const ProfileMeta = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const UserName = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: 700;
    color: #222;
  }
`;

const UserEmail = styled(Typography)`
  && {
    font-size: 0.9rem;
    color: #888;
    display: flex;
    align-items: center;
  }
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }
`;

const InfoGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const InfoCard = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 14px;
    background-color: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 16px 18px;
  }
`;

const InfoIconWrapper = styled(Box)`
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

const InfoContent = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #aaa;
    font-weight: 500;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #333;
  }
`;

const BioCard = styled(Box)`
  && {
    background-color: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 16px;
  }
`;

const BioHeader = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
`;

const BioText = styled(Typography)`
  && {
    font-size: 0.9375rem;
    color: #444;
    line-height: 1.65;
  }
`;

const StatusGrid = styled(Box)`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
  }
`;

const StatusCard = styled(Box)`
  && {
    background-color: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 14px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const StatusRow = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StatusMeta = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const StatusDate = styled(Typography)`
  && {
    font-size: 0.75rem;
    color: #bbb;
    font-weight: 500;
  }
`;

// ─── Chip sx ─────────────────────────────────────────────────────────────────

const activeChipSx = {
  backgroundColor: "rgba(76, 175, 80, 0.1)",
  color: "#388e3c",
  fontWeight: 600,
  fontSize: "0.75rem",
  borderRadius: "8px",
};

const inactiveChipSx = {
  backgroundColor: "#f5f5f5",
  color: "#aaa",
  fontWeight: 600,
  fontSize: "0.75rem",
  borderRadius: "8px",
};

const deletedChipSx = {
  backgroundColor: "rgba(229, 115, 115, 0.1)",
  color: "#c62828",
  fontWeight: 600,
  fontSize: "0.75rem",
  borderRadius: "8px",
};
