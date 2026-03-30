import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./config/route/RoutesConfig.tsx";
import { Box } from "@mui/material";
import GNB from "./app/user/common/component/GNB.tsx";
import RequireAuth from "./app/user/auth/RequireAuth.tsx";
import useInitAuth from "./app/user/auth/service/useInitAuth.ts";
import { useAuthStore } from "./store/authStore.ts";

const AppContent: React.FC = () => {
  useInitAuth();
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) return null;

  return (
    <Box>
      <GNB />
      <Box>
        <Routes>
          {APP_ROUTES.filter(r => !r.requireAuth).map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
          <Route element={<RequireAuth />}>
            {APP_ROUTES.filter(r => r.requireAuth).map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
