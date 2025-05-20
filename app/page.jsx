import { createClient } from "@/utils/supabase/client";
import { ambilDataIjalBerau } from "@/lib/query/ijalberau";
import { ambilNotes } from "@/lib/query/notes";

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
  const { data, error } = await supabase.from("notes").select("*").gt("isi", 5000);
  console.log("data", data);
  return (
    <div className="flex h-screen w-full flex-col items-center gap-3">
      {/* <pre className="flex w-full flex-col bg-[red] text-center text-[white]">
        {JSON.stringify(data)}
      </pre> */}
      {data.map((item, index) => {
        return (
          <div key={index} className="flex w-[70%] flex-col bg-[blue]">
            <Notes id={item.id} isi={item.isi} />
          </div>
        );
      })}
    </div>
  );
}
