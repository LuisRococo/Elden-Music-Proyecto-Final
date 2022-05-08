import { Container, Divider } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import logoImg from "../../img/logo.png";

export default function Footer() {
  const hideInRoutes = ["/login", "/signin"];
  const location = useLocation();

  function shouldElementHide(actualPath) {
    for (let index = 0; index < hideInRoutes.length; index++) {
      const bannedRoute = hideInRoutes[index];
      if (actualPath === bannedRoute) return true;
    }
    return false;
  }

  if (shouldElementHide(location.pathname)) return null;

  return (
    <footer>
      <Container maxWidth={"lg"}>
        <div className="footer__logo-cont">
          <div className="footer__logo-wrapper">
            <img src={logoImg} alt="" />
          </div>
          <p className="footer__logo-title">Elden Music</p>
        </div>
        <Divider sx={{ backgroundColor: "white", marginY: "30px" }} />
        <div className="footer__info-cont">
          <p className="footer__txt-main">Remember to follow your dreams</p>
          <p className="footer__txt-secondary">©2022</p>
        </div>
      </Container>
    </footer>
  );
}
