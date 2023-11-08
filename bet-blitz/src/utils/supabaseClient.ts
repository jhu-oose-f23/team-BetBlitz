import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (supabaseToken: any) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    // TODO: Uncomment when we enable RLS on Supabase
    // {
    //   global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
    // },
  );
  return supabase;
};
