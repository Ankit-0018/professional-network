import { useEffect, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { PostProvider } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) return <div className="text-center p-4">Loading...</div>;

  return (
    <PostProvider>{children}</PostProvider>
  );
}

export default AuthLayout;
