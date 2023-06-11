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

  //Get user data
  const { data: userInfo } = await supabase
    .from("profile")
    .select()
    .match({ id: session.user.id });

  const { data: contents } = await supabase.from("content").select();

  return (
    <div id="auth">
      <h1>
        Hello,&nbsp;
        {
          //Check if user added his info and show it. Else show his email
          userInfo?.map((info) =>
            info.first_name && info.last_name ? (
              <>
                {info.first_name} {info.last_name}
              </>
            ) : (
              <>{session.user.email}</>
            )
          )
        }
      </h1>
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
