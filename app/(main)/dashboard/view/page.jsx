"use client";
import { createClient } from "@/utils/supabase/client";
import { ambilDataIjalBerau } from "@/lib/query/ijalberau";
import { ambilNotes } from "@/lib/query/notes";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import ButtonHome from "@/components/ButtonHome";
import ButtonContributtor from "@/components/ButtonContributtor";

export default async function Home() {
  // let { data, error } = await supabase.from("notes").select("*");
  // const data = await ambilNotes("*");
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <Loading />;
  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  const { data, error } = await supabase.from("notes").select("*");
  console.log("data", data);
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center pt-10 text-black">
        <div className="flex h-[85%] w-[90%] flex-col text-[white]">
          {/* atas */}
          <div className="flex h-[8%] w-full items-center bg-[green] text-[white]">
            <div className="w-[50%]">
              <ButtonHome></ButtonHome>
            </div>
            <div className="flex w-[50%] items-end bg-[blue] text-[white]">
              <div></div>
              <div>
                <ButtonContributtor>Contributtor</ButtonContributtor>
              </div>
            </div>
          </div>
          {/* bawah */}
          <div className="flex h-[92%] w-full text-[white]">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full bg-[blue]"></div>
            {/* Isi */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
