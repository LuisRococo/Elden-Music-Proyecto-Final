import React from "react";
import AuthPage from "../components/auth/AuthPage";
import LoginComp from "../components/auth/LoginComp";

export default function LogInPage() {
  return (
    <AuthPage
      msjTitle={"We are happy to see you here again!!!"}
      msjText={"New music awaits you"}
    >
      <LoginComp />
    </AuthPage>
  );
}
