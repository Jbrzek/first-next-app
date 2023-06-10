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

  const { data: contents } = await supabase.from("content").select();

  return (
    <div id="auth">
      <h1>Hello, {session.user.email}</h1>
      {contents?.map((content) => (
        <div id="content">
          <p className="text-red-950">{content.title}</p>
          <p>{content.description}</p>
          <p className="text-red-900">{content.bonus}</p>
        </div>
      ))}
    </div>
  );
}
