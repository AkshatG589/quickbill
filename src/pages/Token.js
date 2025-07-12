import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Token = () => {
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwt = await getToken();
        setToken(jwt);
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    };

    if (isSignedIn) {
      fetchToken();
    }
  }, [isSignedIn, getToken]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token).then(() => {
      alert("Token copied to clipboard!");
    });
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>Your JWT Token</h2>
      {token ? (
        <>
          <textarea
            readOnly
            value={token}
            rows={6}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              fontSize: "0.9rem",
            }}
          />
          <button onClick={copyToClipboard} style={{
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            Copy to Clipboard
          </button>
        </>
      ) : (
        <p>{isSignedIn ? "Fetching token..." : "Please sign in to get token."}</p>
      )}
    </div>
  );
};

export default Token;