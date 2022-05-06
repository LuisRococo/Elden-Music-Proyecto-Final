import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/general/NavBar";
import HomePage from "./pages/HomePage";
import Player from "./components/general/player/Player";
import LogInPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ErrorMsj from "./components/other/ErrorMsj";
import AdminMenu from "./components/admin/AdminMenu";
import AdminArtistPage from "./pages/AdminArtistPage";

function App() {
  return (
    <Router>
      <ErrorMsj />
      <NavBar />
      <Player />
      <AdminMenu />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LogInPage />} />

        <Route path="/signin" element={<SignInPage />} />

        <Route path="/admin/artists" element={<AdminArtistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
