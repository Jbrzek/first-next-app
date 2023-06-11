"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const updateRow = async () => {
    //Check if first and last names are typed
    if (firstName && lastName) {
      const userId = (await supabase.auth.getUser()).data.user?.id.toString();

      //Update users profile
      await supabase
        .from("profile")
        .update({ first_name: `${firstName}`, last_name: `${lastName}` })
        .match({ id: userId });

      alert(
        "Hello, " +
          firstName +
          " " +
          lastName +
          ". You have changed your account info."
      );
      router.refresh();
    } else {
      alert("One or all inputs are empty");
    }
  };

  return (
    <div id="form">
      <label htmlFor="firstName">Your first name:</label>
      <input
        name="firstName"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label htmlFor="lastName">Your last name:</label>
      <input
        name="lastName"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <button onClick={updateRow} className="m-5">
        Change
      </button>
    </div>
  );
}
