"use client";
import { addDocument, fetchAllDocuments } from "@/lib/query/documents";
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
  const router = useRouter();
  const { session } = useContext(AuthContext);
  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  }, [session, router]);

  const [openModal, setOpenModal] = useState(false);
  const [documents, setDocuments] = useState(test);
  const [loading, setLoading] = useState(false);
  const [judul, setJudul] = useState("");

  // Fungsi untuk menambah dokumen
  const handleAddDocument = async () => {
    if (!judul.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await addDocument(judul);

      if (error) {
        console.error("Error adding document:", error);
        alert("Gagal menambahkan dokumen!");
        return;
      }

      // Update state documents dengan data baru
      if (data && data[0]) {
        const newDoc = {
          id: data[0].id,
          title: data[0].title,
          isi: data[0].isi || "",
          createdAt: new Date(data[0].created_at).toISOString().split('T')[0],
          viewDoc: data[0].isi || "",
        };
        setDocuments(prev => [newDoc, ...prev]);
      }

      // Reset form dan tutup modal
      setJudul("");
      setOpenModal(false);
      alert("Dokumen berhasil ditambahkan!");

    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk load documents dari database
  const loadDocuments = async () => {
    try {
      const { data, error } = await fetchAllDocuments();

      if (error) {
        console.error("Error fetching documents:", error);
        return;
      }

      if (data) {
        const formattedDocs = data.map(doc => ({
          id: doc.id,
          title: doc.title,
          isi: doc.isi || "",
          createdAt: new Date(doc.created_at).toISOString().split('T')[0],
          viewDoc: doc.isi || "",
        }));
        setDocuments(formattedDocs);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Load documents saat component mount
  useEffect(() => {
    loadDocuments(); // uncomment jika ingin load dari database
  }, []);
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
        {/* Modal Popup */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-md rounded-[15px] border-[1.5px] border-[#16223B] bg-white p-6 shadow-lg">
              {/* Header Modal */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-eudoxus-medium text-lg text-[#16223B]">
                  Tambah Dokumen Baru
                </h2>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setJudul("");
                  }}
                  className="text-2xl text-[#16223B] hover:text-red-500 transition-colors"
                  disabled={loading}
                >
                  ×
                </button>
              </div>

              {/* Form Input */}
              <div className="mb-6">
                <label className="mb-2 block font-eudoxus-medium text-sm text-[#16223B]">
                  Judul Dokumen
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukkan judul dokumen..."
                  className="w-full rounded-lg border-[1.5px] border-[#16223B]/30 px-3 py-2 text-[#16223B] placeholder-[#16223B]/50 focus:border-[#16223B] focus:outline-none"
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !loading) {
                      handleAddDocument();
                    }
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setJudul("");
                  }}
                  className="flex-1 rounded-lg border-[1.5px] border-[#16223B]/30 py-2 text-[#16223B] hover:bg-[#16223B]/10 transition-colors"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  onClick={handleAddDocument}
                  disabled={loading || !judul.trim()}
                  className="flex-1 rounded-lg bg-[#16223B] py-2 text-white hover:bg-[#16223B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
