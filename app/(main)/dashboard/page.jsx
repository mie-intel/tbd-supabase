import { createClient } from "@/utils/supabase/client";
import { ambilDataIjalBerau } from "@/lib/query/ijalberau";
import { ambilNotes } from "@/lib/query/notes";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import ButtonAdd from "@/components/ButtonAddDoc";
import { Span } from "next/dist/trace";
import SearchBox from "@/components/SearchBox";
import DashboardItem from "@/components/DashboardItem";

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
    <>
      <div className="relatify-ceactive justify-center w-full h-full flex flex-col items-center gap-4">
        <div className="flex w-[90%] items-start justify-between">
          <ButtonAdd className="">Tambahkan</ButtonAdd>
        </div>
        <div className="relative flex flex-col gap-4 w-[90%] bg-white/20 backdrop-blur-lg rounded-[5px] border-[1.5px] px-3 py-3 border-[#16223B]">
          <div className="flex w-full justify-between items-center">
            <span className="font-eudoxus-medium text-xl text-[#16223B]">
              Dafter Dokumen
            </span>
            <SearchBox></SearchBox>
          </div>
          <div>
            <DashboardItem></DashboardItem>
          </div>
        </div>
      </div>  
    </>
  );
}
