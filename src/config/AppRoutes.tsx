import * as React from "react";

type RouteType = {
  path: string;
  name: string;
  element: React.ReactNode;
};

export const APP_ROUTES: readonly RouteType[] = [
  // { path: '/', name: 'root', element: <Navigate to="/main" replace />},
] as const;
