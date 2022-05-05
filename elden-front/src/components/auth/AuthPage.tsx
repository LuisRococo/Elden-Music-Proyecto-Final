import React from "react";
import AuthPgMessage from "./AuthPgMessage";

export default function AuthPage({ children, msjTitle, msjText }) {
  return (
    <div className="auth-pg">
      <div className="auth-page__comp">{children}</div>

      <div className="auth-pg__decor">
        <AuthPgMessage title={msjTitle} message={msjText} />
      </div>
    </div>
  );
}
