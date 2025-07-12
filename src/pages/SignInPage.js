// SignInPage.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function SignInPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}

export default SignInPage;