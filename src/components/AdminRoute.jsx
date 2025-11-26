import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/get-info`,
          { withCredentials: true }
        );

        if (res.data?.user?.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);


  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
