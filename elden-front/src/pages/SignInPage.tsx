import React from "react";
import AuthPage from "../components/auth/AuthPage";
import SigninComp from "../components/auth/SigninComp";

export default function SignInPage() {
  return (
    <AuthPage
      msjTitle={"Join the biggest music community!!!"}
      msjText={"We are waiting for you"}
    >
      <SigninComp />
    </AuthPage>
  );
}
