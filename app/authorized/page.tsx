import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //If user is signed out redirect to /
  if (!session) {
    redirect("/");
  }

  return <h1>Hello, {session.user.email}</h1>;
}
