import { createClient } from "@/utils/supabase/client";
import { ambilDataIjalBerau } from "@/lib/query/ijalberau";
import { ambilNotes } from "@/lib/query/notes";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import ButtonHome from "@/components/ButtonHome";
import ButtonContributtor from "@/components/ButtonContributtor";

const Notes = ({ id, isi }) => {
  return (
    <div className="flex w-full flex-col bg-[red] text-[white]">
      <div className="flex w-[50%] bg-[green] text-[white]">{id}</div>
      <div className="flex w-[50%] bg-[blue] text-[white]">{isi}</div>
    </div>
  );
};

export default async function Home() {
  // let { data, error } = await supabase.from("notes").select("*");
  // const data = await ambilNotes("*");
  const supabase = createClient();
  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  const { data, error } = await supabase.from("notes").select("*");
  console.log("data", data);
  return (
    <>
    <div className="flex w-full h-full items-center justify-center flex-col text-black pt-10">
      <div className="flex flex-col w-[90%] h-[85%] bg-[red] text-[white]">
        {/* atas */}
        <div className="flex w-full h-[8%] bg-[green] text-[white] items-center">
          <div className="w-[50%]"><ButtonHome></ButtonHome></div>
          <div className="flex w-[50%] items-end bg-[blue] text-[white]">
            <div></div>
            <div><ButtonContributtor>Contributtor</ButtonContributtor></div>
          </div>
        </div>
        {/* bawah */}
        <div className ="flex w-full h-[92%] bg-[orange] text-[white]">
          {/* Judul dkk */}
          <div className="flex w-full h-[18%] bg-[blue]"></div>
          {/* Isi */}
          <div></div>
        </div>
      </div>
      
    </div>
    </>
  )
}
