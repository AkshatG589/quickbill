import React from 'react';

function Home() {
  const Host = process.env.REACT_APP_HOST;
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to QuickBill</h1>
      <p>Your easy billing and invoice management app.</p>
      <p>{Host}</p>
    </div>
  );
}

export default Home;