"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Logout() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleAccount = async () => {
    router.push("/authorized/account");
  };

  const handleMain = async () => {
    router.push("/authorized");
  };

  return (
    <div id="form">
      <button onClick={handleSignOut} className="p-3">
        Sign out
      </button>
      <button onClick={handleAccount} className="p-3">
        Account
      </button>
      <button onClick={handleMain} className="p-3">
        Main page
      </button>
    </div>
  );
}
