"use client";
import { createClient } from "@/utils/supabase/client";
import { forwardRef, use, useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import ButtonHome from "@/components/ButtonHome";
import ButtonContributor from "@/components/ButtonContributor";
import AccessDropdown from "@/components/AccessDropdown";
import HeaderDocuments from "@/components/HeaderDocuments";
import ButtonSave from "@/components/ButtonSave";
import { fetchDocumentById } from "@/lib/query/documents";

export default function Home() {
  // let { data, error } = await supabase.from("notes").select("*");
  // const data = await ambilNotes("*");
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState([]);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchDocument() {
      try {
        // Get document ID from URL query parameters
        const docId = searchParams.get("id");

        if (docId) {
          const { data, error } = await fetchDocumentById(docId);

          if (error) {
            console.error("Error fetching document:", error);
          } else if (data) {
            setDocument(data);
            setDocumentTitle(data.judul || "Untitled Document");
            setDocumentDate(new Date(data.createtime).toLocaleDateString("id-ID"));
            setDocumentContent(data.isi || "Sorry, this document is empty.");
          }
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, []);

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
          <div className="relative flex h-[7%] w-full items-center justify-between text-[white]">
            {/* home */}
            <div className="w-[50%]">
              <ButtonHome></ButtonHome>
            </div>
            {/* access */}
            <div className="flex h-full w-[50%] flex-row items-center justify-end gap-4 text-[white]">
              <AccessDropdown />
              <ButtonContributor>Contributor</ButtonContributor>
            </div>
          </div>
          {/* bawah */}
          <div className="relative flex h-[88%] w-full flex-col gap-[12px] rounded-[10px] border-[1.5px] border-[#16223B] bg-white/40 px-3 py-3 text-[white] backdrop-blur-lg">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full">
              <HeaderDocuments
                title={documentTitle}
                createdAt={documentDate}
                username="Username"
                contributors={[{ name: "Rijal" }, { name: "Polikarpus" }, { name: "Bernards" }]}
                className="w-full"
              />
            </div>
            {/* Isi */}
            <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-[82%] w-full flex-col items-center gap-6 overflow-y-auto px-6 py-4 pr-3 text-[black]">
              {documentContent}
            </div>
          </div>
          {/* save */}
          <div className="flex h-[5%] w-full flex-row justify-end pt-1">
            <ButtonSave>Save</ButtonSave>
          </div>
        </div>
      </div>
    </>
  );
}
