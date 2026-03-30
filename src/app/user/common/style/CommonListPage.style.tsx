import { Box, Button, Select, TextField } from "@mui/material";
import styled from "styled-components";

export const PageContainer = styled(Box)`
  && {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-top: 96px;
  }
`;

export const ControlsContainer = styled(Box)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    gap: 16px;

    @media (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
`;

export const SortContainer = styled(Box)`
  && {
    display: flex;
    gap: 12px;
    align-items: center;
  }
`;

export const SortSelect = styled(Select)`
  && {
    background-color: #fff;
    border-radius: 12px;
    min-width: 150px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease;

    .MuiOutlinedInput-notchedOutline {
      border-color: #e0e0e0;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #bbb;
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
    }
  }
`;

export const SearchField = styled(TextField)`
  && {
    width: 300px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
    }

    .MuiOutlinedInput-root {
      border-radius: 12px;

      &:hover fieldset {
        border-color: #bbb;
      }

      &.Mui-focused fieldset {
        border-color: #666;
      }
    }

    & fieldset {
      border-color: #e0e0e0;
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const ItemList = styled(Box)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const RightControls = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 600px) {
      width: 100%;
      flex-wrap: wrap;
    }
  }
`;

export const RegisterButton = styled(Button)`
  && {
    background-color: #ff4757;
    color: #fff;
    border-radius: 12px;
    padding: 7px 20px;
    font-weight: 600;
    font-size: 0.875rem;
    white-space: nowrap;
    text-transform: none;
    box-shadow: 0 1px 4px rgba(255, 71, 87, 0.3);
    transition: box-shadow 0.2s ease, background-color 0.2s ease;

    &:hover {
      background-color: #e8404f;
      box-shadow: 0 4px 14px rgba(255, 71, 87, 0.45);
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;
