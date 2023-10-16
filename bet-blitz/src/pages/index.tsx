import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId, getToken } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      // const supabase = createClient(
      //   process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
      //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      // );
      const token = await getToken({ template: "supabase" });
      console.log("token");
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
