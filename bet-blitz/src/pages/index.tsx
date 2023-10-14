import Head from "next/head";

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

import { supabaseClient } from "~/utils/supabaseClient";
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const { userId, getToken } = useAuth();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      // const supabase = createClient(
      //   process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
      //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      // );
      const token = await getToken({ template: "supabase" });
      console.log("token")
    }
    fetch();
  }, []);



  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        Logged in as {userId}
      </div>

    </>
  );
}