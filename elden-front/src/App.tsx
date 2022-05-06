import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/general/NavBar";
import HomePage from "./pages/HomePage";
import Player from "./components/general/player/Player";
import LogInPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ErrorMsj from "./components/general/ErrorMsj";
import AdminMenu from "./components/admin/AdminMenu";
import AdminArtistPage from "./pages/AdminArtistPage";
import ProtectRoute from "./components/other/ProtectRoute";
import ProtectRouteIfLoggedIn from "./components/other/ProtectRouteIfLoggedIn";
import AdminAlbumPage from "./pages/AdminAlbumPage";

function App() {
  return (
    <Router>
      <ErrorMsj />
      <NavBar />
      <Player />
      <AdminMenu />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <ProtectRouteIfLoggedIn>
              <LogInPage />
            </ProtectRouteIfLoggedIn>
          }
        />

        <Route
          path="/signin"
          element={
            <ProtectRouteIfLoggedIn>
              <SignInPage />
            </ProtectRouteIfLoggedIn>
          }
        />

        <Route
          path="/admin/artists"
          element={
            <ProtectRoute adminPermissions={true}>
              <AdminArtistPage />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin/albums"
          element={
            <ProtectRoute adminPermissions={true}>
              <AdminAlbumPage />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
