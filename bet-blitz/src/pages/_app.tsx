import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster"


import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Navbar } from "~/components/ui/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ClerkProvider {...pageProps}>
        <Navbar />
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
}

export default api.withTRPC(MyApp);
