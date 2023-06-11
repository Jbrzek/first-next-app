"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Content() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bonus, setBonus] = useState("");

  const insertRow = async () => {
    //Check if first and last names are typed
    if (title && description && bonus) {
      const userId = (await supabase.auth.getUser()).data.user?.id.toString();

      //Update users profile
      await supabase.from("content").insert([
        {
          title: title,
          description: description,
          bonus: bonus,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);

      router.refresh();
    } else {
      alert("One or all inputs are empty");
    }
  };

  return (
    <div id="form" className="border-double border-4 border-red-900 rounded-xl">
      <label htmlFor="firstName">Title:</label>
      <input
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label htmlFor="lastName">Description:</label>
      <input
        name="decription"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label htmlFor="bonus">Bonus:</label>
      <input
        name="bonus"
        onChange={(e) => setBonus(e.target.value)}
        value={bonus}
      />
      <button onClick={insertRow} className="m-5">
        Add content
      </button>
    </div>
  );
}
