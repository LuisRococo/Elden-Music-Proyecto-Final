import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "./components/other/MaterialTheme";
import Player from "./components/general/player/Player";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
