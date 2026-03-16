import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

const CommonSuccessSnackbar: React.FC<Props> = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSuccessSnackbar;
