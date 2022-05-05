import { Alert } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { hideError } from "../../redux/reducers/errorReducer";

export default function ErrorMsj() {
  const error = useSelector((state: RootState) => state.error.error);
  const dispatch = useDispatch();

  return (
    error && (
      <div className="error-msj">
        <Alert
          severity={error.severity}
          sx={{ pointerEvents: "auto", marginTop: "30px", width: "80%" }}
          onClose={() => {
            dispatch(hideError());
          }}
        >
          {error.message}
        </Alert>
      </div>
    )
  );
}
