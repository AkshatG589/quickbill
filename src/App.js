import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateBill from "./pages/CreateBill";
import History from "./pages/History";
import Products from "./pages/Products";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutUs from "./pages/AboutUs";
import BusinessDetails from "./pages/BusinessDetails";
import Admin from "./pages/Admin";
import NavBar from "./Components/NavBar";
import NotFound from "./Components/NotFound";
import usePageTracking from "./Components/usePageTracking";
import useAdminCheck from "./hooks/useAdminCheck";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  usePageTracking();
  const { isAdmin, loading } = useAdminCheck();

  return (
    <div>
      <NavBar />

      {/* Routes for Signed In Users */}
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={true} />} />
          <Route path="/create-bill" element={<CreateBill />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/bill-history" element={<History />} />
          <Route path="/products" element={<Products />} />
          <Route path="/business-details" element={<BusinessDetails />} />
          <Route path="/sign-in" element={<Navigate to="/" />} />
          <Route path="/sign-up" element={<Navigate to="/" />} />

          {/* Conditionally render admin route */}
          {isAdmin && !loading && (
            <Route path="/admin" element={<Admin />} />
          )}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignedIn>

      {/* Routes for Signed Out Users */}
      <SignedOut>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={false} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/create-bill" element={<Navigate to="/sign-in" />} />
          <Route path="/bill-history" element={<Navigate to="/sign-in" />} />
          <Route path="/products" element={<Navigate to="/sign-in" />} />
          <Route path="/business-details" element={<Navigate to="/sign-in" />} />
          <Route path="/admin" element={<Navigate to="/sign-in" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignedOut>
    </div>
  );
}

export default App;