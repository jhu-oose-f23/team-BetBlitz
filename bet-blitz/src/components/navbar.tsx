"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-40 bg-black shadow-xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="flex items-center whitespace-nowrap text-2xl font-semibold text-white"
            >
              <img
                src="https://hineon.com/wp-content/uploads/2023/08/HN-PAT-FLASH-W-2000x2000-2.jpg"
                className="mr-3 h-8"
                alt="BetBlitz Logo"
                style={{ width: "3rem", height: "3rem" }}
              />
              BetBlitz
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/bet"
                  className={twMerge(
                    "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-white",
                    router.pathname === "/odds" ? "bg-gray-500" : "",
                  )}
                >
                  Place a Bet
                </Link>
                <Link
                  href="/bets"
                  className={twMerge(
                    "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-white",
                    router.pathname === "/bets" ? "bg-gray-500" : "",
                  )}
                >
                  Your Bets
                </Link>
                <Link
                  href="/analytics"
                  className={twMerge(
                    "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-white",
                    router.pathname === "/analytics" ? "bg-gray-500" : "",
                  )}
                >
                  Analytics
                </Link>
                <Link
                  href="/chirp"
                  className={twMerge(
                    "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-white",
                    router.pathname === "/chirp" ? "bg-gray-500" : "",
                  )}
                >
                  Chirp
                </Link>
                <Link
                  href="/league"
                  className={twMerge(
                    "rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 hover:text-white",
                    router.pathname === "/league" ? "bg-gray-500" : "",
                  )}
                >
                  League
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative mr-5 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
            </button>

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
