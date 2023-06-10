import "./globals.css";
import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import Login from "./login";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My first NEXT JS app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        {session ? (
          //If user is signed in show logout button
          <Logout />
        ) : (
          //If user is signed out show login button
          <Login />
        )}
        {children}
      </body>
    </html>
  );
}
