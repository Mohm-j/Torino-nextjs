import { useAuth, useRequireAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../common/Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const { data: user, isLoading } = useAuth();
  const { ensureAuth } = useRequireAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const ok = await ensureAuth();

      if (!ok) {
        router.replace("/");
      }

      setChecked(true);
    };

    if (!isLoading) {
      checkAuth();
    }
  }, [isLoading, ensureAuth, router]);

  if (isLoading || !checked) {
    return <Loader />;
  }

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
