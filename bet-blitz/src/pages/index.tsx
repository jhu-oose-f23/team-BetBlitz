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
      

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BetBlitz</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="odds" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Odds</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Page 2</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Page 3</a>
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        Logged in as {userId}
      </div>

    </>
  );
}