import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/general/NavBar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Player from "./components/general/player/Player";
import LogInPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ErrorMsj from "./components/other/ErrorMsj";

function App() {
  return (
    <Router>
      <NavBar />
      <Player />
      <ErrorMsj />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/login" element={<LogInPage />} />

        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
