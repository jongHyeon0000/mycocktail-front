import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MarkChatUnreadOutlined } from "@mui/icons-material";
import styled from "styled-components";
import CocktailDetailModal from "../../cocktail/component/CocktailDetailModal.tsx";
import useReadCocktail from "../../cocktail/service/useReadCocktail.tsx";
import LoadingOverlay from "../../common/component/loading/LoadingOverlay.tsx";
import CommonErrorSnackbar from "../../common/component/snackbar/CommonErrorSnackbar";
import useReadReceivedComments from "./service/useReadReceivedComments.tsx";
import MyCommentItem from "../my-comments/component/MyCommentItem.tsx";
import {
  ControlsContainer,
  PageContainer,
  RightControls,
  SearchField,
} from "../../common/style/CommonListPage.style.tsx";
import { useAuthStore } from "../../../../store/authStore.ts";

const PAGE_SIZE = 15;

const ReceivedCommentsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { user } = useAuthStore();
  const { receivedCommentList, receivedCommentListLoading, receivedCommentListLoadingMore, receivedCommentListHasMore, fetchReadReceivedComments } = useReadReceivedComments();
  const { cocktail, cocktailLoading, fetchReadCocktail } = useReadCocktail();

  useEffect(() => {
    if (user?.userId) {
      fetchReadReceivedComments({
        page: 1,
        limit: PAGE_SIZE,
        userId: user.userId,
        search: searchKeyword.trim() || undefined,
      });
    }
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    setIsSearching(true);

    const newTimer = setTimeout(() => {
      setCurrentPage(1);
      fetchReadReceivedComments({
        page: 1,
        limit: PAGE_SIZE,
        userId: user!.userId,
        search: keyword.trim() || undefined,
      }).finally(() => setIsSearching(false));
    }, 250);

    setSearchDebounceTimer(newTimer);
  }, [searchDebounceTimer, user?.userId]);

  const handleSearchClear = useCallback(() => {
    setSearchKeyword("");
    setCurrentPage(1);
    setIsSearching(true);

    fetchReadReceivedComments({
      page: 1,
      limit: PAGE_SIZE,
      userId: user!.userId,
    }).finally(() => setIsSearching(false));
  }, [user?.userId]);

  const handleScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      if (receivedCommentListHasMore && !receivedCommentListLoading && !receivedCommentListLoadingMore) {
        await fetchReadReceivedComments({
          page: currentPage + 1,
          limit: PAGE_SIZE,
          userId: user!.userId,
          search: searchKeyword.trim() || undefined,
        }, true);
        setCurrentPage(prev => prev + 1);
      }
    }
  }, [currentPage, searchKeyword, receivedCommentListHasMore, receivedCommentListLoading, receivedCommentListLoadingMore, user?.userId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    };
  }, [handleScroll, searchDebounceTimer]);

  useEffect(() => {
    if (cocktail?.data) setModalOpen(true);
  }, [cocktail]);

  useEffect(() => {
    if (receivedCommentList && receivedCommentList.code !== 'OK') {
      setSnackbarMessage(receivedCommentList.message);
      setSnackbarOpen(true);
    }
  }, [receivedCommentList]);

  useEffect(() => {
    if (cocktail && cocktail.code !== 'OK') {
      setSnackbarMessage(cocktail.message);
      setSnackbarOpen(true);
    }
  }, [cocktail]);

  const isEmpty = !receivedCommentListLoading && !isSearching && (receivedCommentList?.data?.length ?? 0) === 0;

  return (
    <PageContainer>
      <LoadingOverlay open={receivedCommentListLoading && !isSearching} message="댓글을 불러오는 중..." />
      <LoadingOverlay open={cocktailLoading} message="칵테일 정보를 불러오는 중..." />

      <Container maxWidth="lg">
        <ControlsContainer>
          <RightControls>
            <SearchField
              placeholder="칵테일명으로 검색..."
              variant="outlined"
              size="small"
              value={searchKeyword}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ fontSize: "18px" }}>🔍</span>
                  </InputAdornment>
                ),
                endAdornment: searchKeyword && (
                  <InputAdornment position="end">
                    <span
                      style={{ fontSize: "16px", cursor: "pointer", padding: "4px" }}
                      onClick={handleSearchClear}
                    >
                      ✕
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </RightControls>
        </ControlsContainer>

        <CommentList>
          {isSearching ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={36} />
            </Box>
          ) : isEmpty ? (
            <EmptyState>
              <MarkChatUnreadOutlined sx={{ fontSize: 52, color: "#d1d5db", mb: 2 }} />
              <Typography variant="body1" color="text.secondary" fontWeight={500}>
                아직 받은 댓글이 없습니다
              </Typography>
              <Typography variant="body2" color="text.disabled" mt={0.5}>
                레시피를 등록하면 댓글을 받을 수 있어요!
              </Typography>
            </EmptyState>
          ) : (
            receivedCommentList?.data?.map((comment, index) => (
              <MyCommentItem
                key={comment.commentId}
                comment={comment}
                index={index}
                onClick={() => fetchReadCocktail(comment.cocktailId)}
              />
            ))
          )}
        </CommentList>

        {receivedCommentListLoadingMore && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress size={40} />
          </Box>
        )}

        {!isSearching && !receivedCommentListHasMore && (receivedCommentList?.data?.length ?? 0) > 0 && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
              모든 댓글을 불러왔습니다
            </Typography>
          </Box>
        )}
      </Container>

      {cocktail?.data && (
        <CocktailDetailModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={cocktail.data}
        />
      )}

      <CommonErrorSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </PageContainer>
  );
};

export default ReceivedCommentsPage;

const CommentList = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const EmptyState = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
    text-align: center;
  }
`;
