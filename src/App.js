import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import CreateBill from "./pages/CreateBill"
import History from "./pages/History"
import Products from "./pages/Products"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Token from "./pages/Token"
import BusinessDetails from "./pages/BusinessDetails"
import NavBar from "./Components/NavBar"

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Token />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/bill-history" element={<History />} />
         <Route path="/products" element={<Products/>} />
        <Route path="/business-details" element={<BusinessDetails/>} />
         
        <Route path="/sign-in/*" element={<SignInPage />} />
         <Route path="/sign-up/*" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App