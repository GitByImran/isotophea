import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import SideNavbar from "./shared/sideNavbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/authContext";
import Suggest from "./shared/suggest";
import BottomNavbar from "./shared/bottomNavbar";
import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/router";
import TopNavbar from "./shared/topNavbar";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const restrictedForBar = ["/auth/signUpForm", "/auth/signInForm"];

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {restrictedForBar.includes(router.asPath) ? (
            <Component {...pageProps} />
          ) : (
            <div className="flex md:justify-between dark:bg-dark">
              <SideNavbar />

              <div className="flex-grow">
                <div className={`w-full block sm:hidden `}>
                  <TopNavbar />
                </div>
                <div className="px-5">
                  <Component {...pageProps} />
                </div>
                <div className={`mt-16 w-full block sm:hidden`}>
                  <BottomNavbar />
                </div>
              </div>

              <Suggest />
            </div>
          )}
        </ThemeProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
