import { Button, Fab } from "@mui/material";
import React from "react";

export default function UploadButton({ title, updateFile, name }) {
  return (
    <label htmlFor={name}>
      <input
        style={{ display: "none" }}
        id={name}
        name={name}
        type="file"
        onChange={updateFile}
        required
      />
      <Button
        sx={{ width: "100%", height: "100%" }}
        color="secondary"
        variant="contained"
        component="span"
      >
        {title}
      </Button>
    </label>
  );
}
