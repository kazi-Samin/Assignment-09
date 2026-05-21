"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

const ProtectedRoute = ({
  children,
}) => {

  const router =
    useRouter();

  const {
    data: session,
    isPending,
  } =
    authClient.useSession();

  useEffect(() => {

    if (
      !isPending &&
      !session
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    session,
    isPending,
    router,
  ]);

  if (isPending) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <span className="loading loading-spinner loading-lg text-emerald-600"></span>

      </div>
    );

  }

  if (!session) {

    return null;

  }

  return children;
};

export default ProtectedRoute;