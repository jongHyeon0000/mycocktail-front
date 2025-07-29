import { RecoilRoot } from "recoil";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./config/AppRoutes.tsx";

const App: React.FC = () => {
  return (
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {
              APP_ROUTES.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element}/>
              ))
            }
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );
};

export default App;