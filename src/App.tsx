import { RecoilRoot } from "recoil";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./config/RoutesConfig.tsx";
import { Box } from "@mui/material";
import GNB from "./pages/user/common/component/GNB.tsx";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Box>
          <GNB />
          <Box>
            <Routes>
              {APP_ROUTES.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;