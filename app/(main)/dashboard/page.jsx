"use client";
import { createClient } from "@/utils/supabase/client";
import { fetchDoc } from "@/lib/query/documents";
import { ambilNotes } from "@/lib/query/notes";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonAdd from "@/components/ButtonAddDoc";
import Loading from "@/components/Loading";
import SearchBox from "@/components/SearchBox";
import DashboardItem from "@/components/DashboardItem";

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
];

export default function Home() {

  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } =  await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }
      await fetchDoc(session.user.id);
      setLoading(false);
    })
  }, []);
  if (loading) return <Loading />;

  // Ambil Dokumen punya user
  async function fetchDoc(userId) {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("ownerid", userId);
    if (error) {
      console.error("Error fetching documents:", error);
      return null;
    }
    console.log("Documents:", data);
  }


  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  // const { data, error } = await supabase.from("notes").select("*").gt("isi", 5000);
  // console.log("data", data);
  return (
    <>
      <div className="relatify-ceactive flex h-full w-full flex-col items-center justify-center gap-4 pt-14">
        <div className="flex w-[90%] items-start justify-between">
          <ButtonAdd className="">Tambahkan</ButtonAdd>
        </div>
        <div className="relative flex h-[75%] w-[90%] flex-col gap-[12px] rounded-[15px] border-[1.5px] border-[#16223B] bg-white/20 px-3 py-3 backdrop-blur-lg">
          {/* Search Box */}
          <div className="flex w-full items-center justify-between">
            <span className="font-eudoxus-medium text-md text-[#16223B] md:text-xl">
              Daftar Dokumen
            </span>
            <SearchBox />
          </div>
          {/* Dasboard Item */}
          <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col gap-4 overflow-y-auto pr-3">
            {test.map((item) => (
              <DashboardItem
                key={item.id}
                title={item.title}
                createdAt={item.createdAt}
                viewDoc={item.isi}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
