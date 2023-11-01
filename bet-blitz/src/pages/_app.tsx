import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";

import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Navbar } from "~/components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className="min-h-screen bg-[#EEEEEE]">
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
