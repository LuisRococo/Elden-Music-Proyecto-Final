import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Password } from "@mui/icons-material";
import { Button, SxProps, TextField } from "@mui/material";
import LogoImg from "../../img/logo.png";
import { fetchLogin } from "../../util/requests";
import { hideError, showError } from "../../redux/reducers/errorReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToken } from "../../redux/reducers/tokenReducer";
import { RootState } from "../../redux/store";

export default function LoginComp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logIn(event) {
    try {
      event.target.reportValidity();
      event.preventDefault();

      const res = await fetchLogin(userName, password);
      if (res.status !== 200) {
        dispatch(showError("Incorrect data - Check your info"));
      } else {
        dispatch(addToken(await res.json()));
        navigate("/");
      }
    } catch (e) {
      dispatch(showError("Unexpected error - Try later"));
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
          Login
        </Typography>
        <Divider light={false} sx={{ marginY: "20px" }} />

        <form
          onSubmit={(e) => {
            logIn(e);
          }}
          className="auth-pg__form"
        >
          <TextField
            id="standard-basic"
            label="Username or Email"
            variant="standard"
            sx={{ marginBottom: "15px" }}
            required={true}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            sx={{ marginBottom: "24px" }}
            type={"password"}
            required={true}
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
            Log In
          </Button>

          <Link
            style={{
              textAlign: "right",
              color: "#d16e17",
              textDecoration: "none",
            }}
            to="/signin"
          >
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
