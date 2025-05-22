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

const test = [
  {
    id: 1,
    title: "Judul 1",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
  {
    id: 2,
    title: "Judul 2",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
  {
    id: 3,
    title: "Judul 3",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
  {
    id: 4,
    title: "Judul 4",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
  {
    id: 5,
    title: "Judul 5",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
  {
    id: 6,
    title: "Judul 6",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  },
]

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
      <div className="relatify-ceactive justify-center w-full h-full flex flex-col items-center gap-4 pt-14">
        <div className="flex w-[90%] items-start justify-between">
          <ButtonAdd className="">Tambahkan</ButtonAdd>
        </div>
        <div className="relative flex flex-col gap-[12px] w-[90%] h-[75%] bg-white/20 backdrop-blur-lg rounded-[15px] border-[1.5px] px-3 py-3 border-[#16223B]">
          {/* Search Box */}
          <div className="flex w-full justify-between items-center">
            <span className="font-eudoxus-medium text-md md:text-xl text-[#16223B]">
              Daftar Dokumen
            </span>
            <SearchBox></SearchBox>
          </div>
          {/* Dasboard Item */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {test.map((item) => (
              <DashboardItem
                key={item.id}
                title={item.title}
                createdAt={item.createdAt}
                viewDoc={item.isi}
              ></DashboardItem>
            ))}
          </div>
        </div>
      </div>  
    </>
  );
}
