// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while fetching current user

  // Fetch current logged-in user from backend (/get-info)
 const loadUser = useCallback(async () => {
  try {
    setLoading(true);
    const data = await authApi.getUserInfo(); // expects { message, user }
    setUser(data?.user ?? null);
  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Sign in using credentials { email, password }
  const signIn = async ({ email, password }) => {
  try {
    await authApi.loginUser({ email, password }); // cookies set here
    await loadUser();
    window.dispatchEvent(new Event("userLoggedIn"));
    return { success: true };
  } catch (err) {
    const message =
      err?.response?.data?.message || err?.response?.data?.error || err.message || "Login failed";
    return { success: false, message };
  }
};


  // Sign out
  const signOut = async () => {
  try {
    await authApi.logoutUser(); 
  } catch (err) {
    console.warn("Logout request failed:", err);
  } finally {
    setUser(null);
    window.dispatchEvent(new Event("userLoggedOut"));
  }
};


  const signInWithGoogle = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Google login failed");

    await loadUser();
    window.dispatchEvent(new Event("userLoggedIn"));

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

  // Provide value
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        reloadUser: loadUser,
        signInWithGoogle, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);
