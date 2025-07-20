import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import SEO from "../Components/SEO";

function SignInPage() {
  return (
    <>
      <SEO
        title="Sign In | QuickBills"
        description="Securely sign in to your QuickBills account to create invoices, manage products, and view billing history."
        url="https://quickbills-ak.vercel.app/sign-in"
        image="https://quickbills-ak.vercel.app/preview.png"
      />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </>
  );
}

export default SignInPage;