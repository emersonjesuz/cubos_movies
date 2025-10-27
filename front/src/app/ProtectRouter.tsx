import { useEffect, useState, type JSX } from "react";
import api from "../api/axios";
import { Navigate, Outlet, useParams } from "react-router-dom";

export function ProtectRouter({ redirect }: { redirect: string }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !id) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        await api.head("/movie/" + id);
        setAllowed(true);
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [id, token]);

  if (loading) return <p>Verificando acesso...</p>;
  if (!allowed) return <Navigate to={redirect} />;
  return <Outlet />;
}
