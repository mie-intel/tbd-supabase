"use client";
import { addDocument, fetchAllDocuments, testFetch } from "@/lib/query/documents";
import {  useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ButtonAdd from "@/components/ButtonAddDoc";
import Loading from "@/components/Loading";
import SearchBox from "@/components/SearchBox";
import DashboardItem from "@/components/DashboardItem";
import { AuthContext } from "@/components/AuthProvider";

const test = [
  {
    id: 1,
    title: "Judul 1",
    isi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
    createdAt: "2023-10-01",
    viewDoc: "25/05/2025",
  }
];

export default function Home() {
  // TESTTT munculin data
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await testFetch();
      if (error) {
        console.error("Error fetching data:", error);
      }
      setData(data);
    };
    fetchData();
  }
  , []);
  // const router = useRouter();
  // const { session } = useContext(AuthContext);
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/sign-in");
  //   }
  // }, [session, router]);

  // const [openModal, setOpenModal] = useState(false);
  // const [documents, setDocuments] = useState(test);
  // const [loading, setLoading] = useState(false);
  // const [judul, setJudul] = useState("");

  // // Fungsi untuk menambah dokumen
  // const handleAddDocument = async () => {
  //   if (!judul.trim()) {
  //     alert("Judul tidak boleh kosong!");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const { data, error } = await addDocument(judul);

  //     if (error) {
  //       console.error("Error adding document:", error);
  //       alert("Gagal menambahkan dokumen!");
  //       return;
  //     }

  //     // Update state documents dengan data baru
  //     if (data && data[0]) {
  //       const newDoc = {
  //         id: data[0].id,
  //         title: data[0].title,
  //         isi: data[0].isi || "",
  //         createdAt: new Date(data[0].createtime).toISOString().split('T')[0],
  //         viewDoc: data[0].isi || "",
  //       };
  //       setDocuments(prev => [newDoc, ...prev]);
  //     }

  //     // Reset form dan tutup modal
  //     setJudul("");
  //     setOpenModal(false);
  //     alert("Dokumen berhasil ditambahkan!");

  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Terjadi kesalahan!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fungsi untuk load documents dari database
  // const loadDocuments = async () => {
  //   try {
  //     const { data, error } = await fetchAllDocuments();

  //     if (error) {
  //       console.error("Error fetching documents:", error);
  //       return;
  //     }

  //     if (data) {
  //       const formattedDocs = data.map(doc => ({
  //         id: doc.id,
  //         title: doc.title,
  //         isi: doc.isi || "",
  //         createdAt: new Date(doc.createtime).toISOString().split('T')[0],
  //         viewDoc: doc.isi || "",
  //       }));
  //       setDocuments(formattedDocs);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // // Load documents saat component mount
  // useEffect(() => {
  //   loadDocuments(); // uncomment jika ingin load dari database
  // }, []);
  // const { data } = await supabase.from("notes").select("id");
  // const data = await ambilNotes("isi");
  // const { data, error } = await supabase.from("notes").select("*").gt("isi", 5000);
  // console.log("data", data);
  return (
    <>
      <div className="relatify-ceactive flex h-full w-full flex-col items-center justify-center gap-4 pt-14">
        <div className="flex w-[90%] items-start justify-between">
          <ButtonAdd onClick={() => setOpenModal(true)}>Tambahkan</ButtonAdd>
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
            {data.map((item) => (
              <DashboardItem
                key={item.id}
                title={item.judul}
                createdAt={item.createtime}
                viewDoc={item.isi}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
