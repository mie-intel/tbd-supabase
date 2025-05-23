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
import { Accordion } from "../../../../components/Dropdown";

export default function Home() {
  // let { data, error } = await supabase.from("notes").select("*");
  // const data = await ambilNotes("*");
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <Loading />;
  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  // const { data, error } = await supabase.from("notes").select("*");
  // console.log("data", data);
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center pt-10 text-black">
        <div className="flex h-[85%] w-[90%] flex-col text-[white]">
          {/* atas */}
          <div className="flex h-[8%] w-full items-center bg-[green] text-[white]">
            {/* home */}
            <div className="w-[75%]">
              <ButtonHome></ButtonHome>
            </div>
            {/* access */}
            <div className="flex h-full w-[25%] flex-row items-end bg-[blue] text-[white]">
              <div>
                <button onClick={() => setOpen(!open)} className="h-full w-full bg-[red]">
                  Click
                </button>
                <Accordion isOpen={open} className="relative top-0 bg-[blue]">
                  Aahrkjsdheajksrh <br />
                  asdkasdjlaskd
                </Accordion>
              </div>
              <div className="flex h-full items-center justify-center bg-[purple]">
                <ButtonContributtor>Contributtor</ButtonContributtor>
              </div>
            </div>
          </div>
          {/* bawah */}
          <div className="flex h-[92%] w-full text-[white]">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full bg-[orange]"></div>
            {/* Isi */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
