import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import logo from '../logo.svg';
import '../Style/NavBar.css';

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser(); // Get current signed-in user
  const location = useLocation();
  return (
    <>
      {/* Top Nav */}
<nav className="navbar navbar-light bg-light shadow-sm px-3 border rounded-pill mx-3 mt-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="QuickBill Logo" height="40" />
          </Link>
          <button className="btn" onClick={() => setShowMenu(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`side-drawer ${showMenu ? 'open' : ''}`}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setShowMenu(false)}>
            <img src={logo} alt="QuickBill Logo" height="40" />
          </Link>
          <button className="btn-close" onClick={() => setShowMenu(false)}></button>
        </div>

        {/* Body */}
        <div className="p-3 flex-grow-1 overflow-auto">
<ul className="nav flex-column">
  <li className={`nav-item mb-2 px-2 rounded ${location.pathname === '/' ? 'active-nav-item' : ''}`}>
    <Link className="nav-link d-flex align-items-center" to="/" onClick={() => setShowMenu(false)}>
      <i className="bi bi-house-fill me-2"></i> Home
    </Link>
  </li>
  <li className={`nav-item mb-2 px-2 rounded ${location.pathname === '/create-bill' ? 'active-nav-item' : ''}`}>
    <Link className="nav-link d-flex align-items-center" to="/create-bill" onClick={() => setShowMenu(false)}>
      <i className="bi bi-receipt me-2"></i> Create Bill
    </Link>
  </li>
  <li className={`nav-item mb-2 px-2 rounded ${location.pathname === '/products' ? 'active-nav-item' : ''}`}>
    <Link className="nav-link d-flex align-items-center" to="/products" onClick={() => setShowMenu(false)}>
      <i className="bi bi-box-fill me-2"></i> Products
    </Link>
  </li>
  <li className={`nav-item mb-2 px-2 rounded ${location.pathname === '/bill-history' ? 'active-nav-item' : ''}`}>
    <Link className="nav-link d-flex align-items-center" to="/bill-history" onClick={() => setShowMenu(false)}>
      <i className="bi bi-clock-history me-2"></i> Bill History
    </Link>
  </li>
  <li className={`nav-item mb-2 px-2 rounded ${location.pathname === '/business-details' ? 'active-nav-item' : ''}`}>
    <Link className="nav-link d-flex align-items-center" to="/business-details" onClick={() => setShowMenu(false)}>
<i class="bi bi-briefcase-fill me-2"></i> Business Details
    </Link>
  </li>
</ul>
        </div>

        {/* Footer (fixed to bottom) */}
        <div className="sidebar-footer border-top p-3">
          <SignedIn>
            <div className="text-center d-flex align-items-center gap-3">
              <UserButton
              appearance={{
              elements: { userButtonAvatarBox: "user-avatar-xl" },
              }}/>
              <div className="text-start">
                <p className="mb-0 text-dark text-bold">{user?.fullName || user?.username || "User"}</p>
                <p className="mb-0 text-muted small">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-primary w-100" to="/sign-in" onClick={() => setShowMenu(false)}>
                Login
              </Link>
              <Link className="btn btn-primary w-100" to="/sign-up" onClick={() => setShowMenu(false)}>
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>

      {/* Overlay */}
      {showMenu && (
        <div className="overlay" onClick={() => setShowMenu(false)}></div>
      )}
    </>
  );
}

export default NavBar;