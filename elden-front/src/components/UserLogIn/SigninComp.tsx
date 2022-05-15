import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Button, SxProps, TextField } from "@mui/material";
import LogoImg from "../../img/logo.png";
import { fetchSignin } from "../../util/requests";
import { hideError, showError } from "../../redux/reducers/errorReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SigninComp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signIn(event) {
    try {
      event.target.reportValidity();
      event.preventDefault();

      const res = await fetchSignin(userName, password, email);
      if (res.status !== 200) {
        dispatch(showError("Error - check your data"));
      } else {
        dispatch(hideError());
        navigate("/login");
      }
    } catch (e) {
      dispatch(showError("Unexpected error - Try later"));
      console.info(e);
    }
  }

  return (
    <div>
      <div className="logo-comp">
        <img src={LogoImg} alt="" className="logo-comp__img" />
        <p>Elden Music</p>
      </div>
      <div className="auth-card">
        <Typography
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
          variant="h5"
        >
          Sign In
        </Typography>
        <Divider light={false} sx={{ marginY: "20px" }} />

        <form
          onSubmit={(e) => {
            signIn(e);
          }}
          className="auth-pg__form"
        >
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            required={true}
            sx={{ marginBottom: "15px" }}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            required={true}
            sx={{ marginBottom: "15px" }}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            required={true}
            sx={{ marginBottom: "15px" }}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            size="large"
            sx={{ width: 1, marginTop: "20px" }}
            variant="contained"
            type="submit"
          >
            Sign In
          </Button>
          <Link
            style={{
              textAlign: "right",
              color: "#d16e17",
              textDecoration: "none",
            }}
            to={"/login"}
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
