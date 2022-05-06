import { Button, Fab } from "@mui/material";
import React from "react";

export default function UploadButton({ title, updateFile }) {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: "none" }}
        id="upload-photo"
        name="upload-photo"
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
