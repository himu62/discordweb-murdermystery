import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ScenarioListPage from "./page/ScenarioList/index.tsx";
import DiscordRedirectPage from "./page/DiscordRedirect/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
  {
    path: "/discord_redirect",
    element: <DiscordRedirectPage />,
  },
  {
    path: "/scenarios",
    element: <ScenarioListPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
