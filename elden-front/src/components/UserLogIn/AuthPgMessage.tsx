import React from "react";

export default function AuthPgMessage({ title, message }) {
  return (
    <div className="auth-pg__decor-cont">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
