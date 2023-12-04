import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId, getToken } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const token = await getToken({ template: "supabase" });
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        Logged in as {userId}
      </div>
    </>
  );
}
