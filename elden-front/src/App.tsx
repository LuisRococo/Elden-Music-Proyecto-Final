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
import AdminSongPage from "./pages/AdminSongPage";
import ProtectRoute from "./components/other/ProtectRoute";
import ProtectRouteIfLoggedIn from "./components/other/ProtectRouteIfLoggedIn";
import AdminAlbumPage from "./pages/AdminAlbumPage";
import Footer from "./components/general/Footer";
import ArtistsPage from "./pages/ArtistsPage";
import ArtistPage from "./pages/ArtistPage";
import ScrollToTop from "./components/other/ScrollToTop";
import AlbumPage from "./pages/AlbumPage";
import ShoppingCarPage from "./pages/ShoppingCarPage";
import PaymentPage from "./pages/PaymentPage";
import AddressPage from "./pages/AddressPage";

function App() {
  return (
    <Router>
      <ErrorMsj />
      <NavBar />
      <Player />
      <AdminMenu />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/artists" element={<ArtistsPage />} />

        <Route path="/artist/:idArtist" element={<ArtistPage />} />

        <Route path="/album/:idAlbum" element={<AlbumPage />} />

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

        <Route
          path="/admin/songs"
          element={
            <ProtectRoute adminPermissions={true}>
              <AdminSongPage />
            </ProtectRoute>
          }
        />

        <Route
          path="/shopping-car"
          element={
            <ProtectRoute adminPermissions={false}>
              <ShoppingCarPage />
            </ProtectRoute>
          }
        />

        <Route
          path="/payment-page"
          element={
            <ProtectRoute adminPermissions={false}>
              <PaymentPage />
            </ProtectRoute>
          }
        />

        <Route
          path="/address-management"
          element={
            <ProtectRoute adminPermissions={false}>
              <AddressPage />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
