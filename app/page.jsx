import { createClient } from "@/utils/supabase/client";

const Notes = ({ id, isi }) => {
  return <div className="flex w-full flex-col bg-[red] text-[white]">{isi}</div>;
};

export default async function Home() {
  const supabase = createClient();
  let { data, error } = await supabase.from("notes").select("*");
  console.log("data", data);
  return (
    <div className="flex h-screen w-full flex-col">
      {/* <pre className="flex w-full flex-col bg-[red] text-[white]">{JSON.stringify(data)}</pre> */}
      {data.map((item, index) => {
        return (
          <div key={index} className="flex w-full flex-col bg-[blue]">
            <Notes id={item.id} isi={item.isi} />
          </div>
        );
      })}
    </div>
  );
}
