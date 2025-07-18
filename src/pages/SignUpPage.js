import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Helmet } from "react-helmet";

function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>Sign Up | QuickBills</title>
        <meta
          name="description"
          content="Create your QuickBills account and start generating professional bills, managing products, and tracking billing history effortlessly."
        />
        {/* Open Graph */}
        <meta property="og:title" content="Sign Up | QuickBills" />
        <meta
          property="og:description"
          content="Join QuickBills today and simplify your business billing process."
        />
        <meta property="og:image" content="https://quickbills-ak.vercel.app/preview.png" />
        <meta property="og:url" content="https://quickbills-ak.vercel.app/sign-up" />
        <meta property="og:type" content="website" />

        {/* Twitter card (safe even without an account) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up | QuickBills" />
        <meta
          name="twitter:description"
          content="Register for QuickBills and manage all your invoices in one place."
        />
        <meta name="twitter:image" content="https://quickbills-ak.vercel.app/preview.png" />
      </Helmet>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <SignUp routing="path" path="/sign-up" />
      </div>
    </>
  );
}

export default SignUpPage;