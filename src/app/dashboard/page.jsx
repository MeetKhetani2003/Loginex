"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, redirecting...");
      window.location.href = "/login";
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "authToken=; Max-Age=0; path=/;";
    window.location.href = "/login";
  };

  if (loading) return <div className="p-6">Checking authentication...</div>;

  return (
    <div className="p-6">
      {user ? (
        <>
          <h1 className="text-xl">Welcome {user.email}</h1>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Unauthorized access</p>
      )}
    </div>
  );
}
