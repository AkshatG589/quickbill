import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import CreateBill from "./pages/CreateBill";
import History from "./pages/History";
import Products from "./pages/Products";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import BusinessDetails from "./pages/BusinessDetails";
import NavBar from "./Components/NavBar";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <NavBar />

      {/* Routes for Signed In Users */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={true} />} />
          <Route path="/create-bill" element={<CreateBill />} />
          <Route path="/bill-history" element={<History />} />
          <Route path="/products" element={<Products />} />
          <Route path="/business-details" element={<BusinessDetails />} />

          {/* Redirect logged-in users away from sign-in/up */}
          <Route path="/sign-in" element={<Navigate to="/" />} />
          <Route path="/sign-up" element={<Navigate to="/" />} />
        </Routes>
      </SignedIn>

      {/* Routes for Signed Out Users */}
      <SignedOut>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={false} />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* Any other route redirects to sign-in */}
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </SignedOut>
    </div>
  );
}

export default App;