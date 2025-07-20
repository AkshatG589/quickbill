import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import SEO from '../Components/SEO'; // adjust path if needed

function SignUpPage() {
  return (
    <>
      <SEO
  title="QuickBills | Sign Up"
  description="Create your QuickBills account and start generating professional bills, managing products, and tracking billing history effortlessly."
  url="https://quickbills-ak.vercel.app/sign-up"
  image="https://quickbills-ak.vercel.app/preview.png"
  pageType="WebPage"
/>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <SignUp routing="path" path="/sign-up" />
      </div>
    </>
  );
}

export default SignUpPage;