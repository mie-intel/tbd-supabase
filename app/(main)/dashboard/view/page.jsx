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
import AccessDropdown from "@/components/AcessDropdown";

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
          <div className="flex h-[8%] w-full items-center text-[white]">
            {/* home */}
            <div className="w-[75%]">
              <ButtonHome></ButtonHome>
            </div>
            {/* access */}
            <div className="flex h-full w-[25%] flex-row items-end text-[white]">
              <div>
                <AccessDropdown />
                {/* <button onClick={() => setOpen(!open)} className="h-full w-full">
                  Click
                </button>
                <Accordion isOpen={open} className="relative top-0">
                  Aahrkjsdheajksrh <br />
                  asdkasdjlaskd
                </Accordion> */}
              </div>
              <div className="flex h-full items-center justify-center">
                <ButtonContributtor>Contributtor</ButtonContributtor>
              </div>
            </div>
          </div>
          {/* bawah */}
          <div className="relative flex h-[92%] w-full flex-col gap-[12px] rounded-[10px] border-[1.5px] border-[#16223B] bg-white/20 px-3 py-3 text-[white] backdrop-blur-lg">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full bg-[orange]"></div>
            {/* Isi */}
            <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-[82%] w-full flex-col items-center justify-center gap-4 overflow-y-auto bg-[yellow] pr-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
