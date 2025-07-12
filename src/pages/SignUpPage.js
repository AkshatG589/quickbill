// SignInPage.js
import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function SignUpPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}

export default SignUpPage;