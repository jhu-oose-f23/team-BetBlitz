import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const { userId, getToken } = useAuth();

  const [name, setName] = useState();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetch = async () => {
      const { data: bettor } = await supabase
        .from("Bettor")
        .select("name")
        .eq("id", userId)
        .single();

      setName(bettor?.name);
    }
    if (userId) fetch();
  }, [userId]);



  useEffect(() => {
    const fetch = async () => {
      // const supabase = createClient(
      //   process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
      //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      // );
      const token = await getToken({ template: "supabase" });
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex min-h-[93vh] flex-col items-center py-2 bg-black">
        <img
          src="https://hineon.com/wp-content/uploads/2023/08/HN-PAT-FLASH-W-2000x2000-2.jpg"
          className="mr-3 h-8"
          alt="BetBlitz Logo"
          style={{ width: "30rem", height: "30rem" }}
        />
        {name && <span className="text-white text-5xl font-black uppercase ">{`Hello,   ${name}`}</span>}
        <div className="flex grow flex-col justify-end items-end">
          <span className="text-white text-3xl font-bold  my-10">Welcome to Bet Blitz</span>
        </div>
      </div>
    </>
  );
}
