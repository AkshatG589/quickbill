import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Helmet } from "react-helmet";

function SignInPage() {
  return (
    <>
      <Helmet>
        <title>Sign In | QuickBills</title>
        <meta
          name="description"
          content="Securely sign in to your QuickBills account to create invoices, manage products, and view billing history."
        />
        {/* Open Graph */}
        <meta property="og:title" content="Sign In | QuickBills" />
        <meta
          property="og:description"
          content="Access your QuickBills account to manage billing and business data securely."
        />
        <meta property="og:image" content="https://quickbills-ak.vercel.app/preview.png" />
        <meta property="og:url" content="https://quickbills-ak.vercel.app/sign-in" />
        <meta property="og:type" content="website" />

        {/* Twitter card (optional, safe even without account) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign In | QuickBills" />
        <meta
          name="twitter:description"
          content="Sign in to QuickBills and manage your professional billing details easily."
        />
        <meta name="twitter:image" content="https://quickbills-ak.vercel.app/preview.png" />
      </Helmet>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </>
  );
}

export default SignInPage;