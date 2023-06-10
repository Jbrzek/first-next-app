import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  //If user is signed in redirect to /authorized
  if (session) {
    redirect("/authorized");
  }

  return (
    <h1 className="text-center m-2">Hello, please sign in to see content!!!</h1>
  );
}
