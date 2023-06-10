"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default async function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "userEmail",
      password: "userPassword",
    });
    router.refresh();
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}
