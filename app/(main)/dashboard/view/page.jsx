"use client";
import { createClient } from "@/utils/supabase/client";
import { ambilDataIjalBerau } from "@/lib/query/ijalberau";
import { ambilNotes } from "@/lib/query/notes";
import DefaultLayout from "@/components/DefaultLayout";
import Image from "next/image";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import ButtonHome from "@/components/ButtonHome";
import ButtonContributor from "@/components/ButtonContributor";
import AccessDropdown from "@/components/AccessDropdown";
import HeaderDocuments from "@/components/HeaderDocuments";

export default function Home() {
  // let { data, error } = await supabase.from("notes").select("*");
  // const data = await ambilNotes("*");
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  const exampleTexts = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. 
  Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. 
  In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. 
  Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.`,

    `Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. 
  Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. 
  Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. 
  Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.`,

    `Suspendisse potenti. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, 
  sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et 
  ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. 
  Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.`,
  ];

  if (loading) return <Loading />;
  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  // const { data, error } = await supabase.from("notes").select("*");
  // console.log("data", data);
  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center pt-10 text-black">
        <div className="relative flex h-[85%] w-[90%] flex-col text-[white]">
          {/* atas */}
          <div className="relative flex h-[8%] w-full items-center justify-between px-4 text-[white]">
            {/* home */}
            <div className="w-[85%]">
              <ButtonHome></ButtonHome>
            </div>
            {/* access */}
            <div className="relative flex h-full w-[15%] flex-row items-center space-x-4 text-[white]">
              <div className="flex h-full items-center justify-center">
                <AccessDropdown />
              </div>
              <div className="flex h-full items-center justify-center">
                <ButtonContributor>Contributor</ButtonContributor>
              </div>
            </div>
          </div>
          {/* bawah */}
          <div className="relative flex h-[92%] w-full flex-col gap-[12px] rounded-[10px] border-[1.5px] border-[#16223B] bg-white/20 px-3 py-3 text-[white] backdrop-blur-lg">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full">
              <HeaderDocuments
                title="PETUALANGAN RHIZAL BERAU MENCARI PASANGAN"
                createdAt="15-05-2025"
                username="Username"
                contributors={[{ name: "Rijal" }, { name: "Polikarpus" }, { name: "Bernads" }]}
                className="w-full"
              />
            </div>
            {/* Isi */}
            <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-[82%] w-full flex-col items-center gap-6 overflow-y-auto pr-3 px-6 py-4 text-[black]">
              {exampleTexts.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
