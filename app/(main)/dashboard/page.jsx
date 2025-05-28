"use client";
import { fetchAllDocuments, checkDocumentIdExists, addDocument, deleteDocument } from "@/lib/query/documents";
import { fetchDocumentContributors } from "@/lib/query/access";
import { addDocumentContributor } from "@/lib/query/access";
import { useEffect, useState, useContext } from "react";
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
  },
];

export default function Home() {
  const router = useRouter();
  // State untuk modal tambah dokumen
  const [openModal, setOpenModal] = useState(false);
  const [documents, setDocuments] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [judul, setJudul] = useState("");

  // State untuk modal delete dokumen
  const [deleteModal, setDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Get the getCurrentUser function from context
  const { getCurrentUser } = useContext(AuthContext);

  // Generate a random 5-digit document ID
  const generateUniqueDocId = async () => {
    // Keep trying until we find an unused ID
    let isUnique = false;
    let newDocId;

    while (!isUnique) {
      // Generate a 5-digit number (10000-99999)
      const randomDigits = Math.floor(10000 + Math.random() * 90000);

      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      newDocId = `${year}${month}${day}-${randomDigits}`;

      // Check if this ID already exists
      const { exists, error } = await checkDocumentIdExists(newDocId);

      if (!error && !exists) {
        isUnique = true;
      }
    }

    return newDocId;
  };

  // Fungsi untuk menambah dokumen
  const handleAddDocument = async () => {
    if (!judul.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }

    setLoading(true);
    try {
      const userData = await getCurrentUser();
      if (userData.status !== "success") {
        alert("User tidak ditemukan!");
        setLoading(false);
        return;
      }

      // Generate a unique document ID
      const uniqueDocId = await generateUniqueDocId();

      // Add the document with our custom ID
      const { data, error } = await addDocument(judul, userData.userid, uniqueDocId);

      if (error) {
        console.error("Error adding document:", error);
        alert("Gagal menambahkan dokumen!");
        setLoading(false);
        return;
      }

      // Get the new document ID
      const newDocId = data[0].docid;

      // Add owner to access table (even though they're the owner, this makes queries easier)
      await addDocumentContributor(newDocId, userData.userid);

      // Update local state with the new document
      if (data && data[0]) {
        const newDoc = {
          id: data[0].docid,
          title: data[0].judul,
          isi: data[0].isi || "",
          createdAt: new Date(data[0].createtime).toISOString().split("T")[0],
          viewDoc: data[0].isi || "",
        };
        setDocuments((prev) => [newDoc, ...prev]);
      }

      // Reset form state
      setJudul("");
      setOpenModal(false);
      setLoading(false);

      // Redirect to the document view page
      router.push(`/dashboard/view?id=${newDocId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan!");
      setLoading(false);
    }
  };

  // Fungsi untuk load documents dari database
  const loadDocuments = async () => {
    try {
      console.log("Memulai proses loadDocuments...");

      // Ambil data pengguna yang sedang login
      const user = await getCurrentUser();
      console.log("Data user dari getCurrentUser:", user);

      if (!user || !user.userid) {
        console.error("User not found or userid is missing");
        alert("User tidak ditemukan atau userid kosong.");
        return;
      }

      // Panggil fetchAllDocuments dengan ownerid
      const { data, error } = await fetchAllDocuments(user.userid);
      console.log("Hasil fetchAllDocuments:", { data, error });

      if (error) {
        console.error("Error fetching documents:", error);
        alert("Gagal memuat dokumen: " + error);
        return;
      }

      if (data) {
        const formattedDocs = data.map((doc) => ({
          id: doc.docid,
          title: doc.judul,
          isi: doc.isi || "",
          createdAt: new Date(doc.createtime).toISOString().split("T")[0],
          viewDoc: doc.isi || "",
        }));
        console.log("Formatted documents:", formattedDocs);
        setDocuments(formattedDocs);
      }
    } catch (error) {
      console.error("Unexpected error in loadDocuments:", error);
      alert("Terjadi kesalahan tak terduga saat memuat dokumen.");
    }
  };

  // Fungsi untuk memulai proses delete (menampilkan popup konfirmasi)
  const handleDeleteDocument = (docid) => {
    console.log("handleDeleteDocument called with docid:", docid);
    // Cari dokumen yang akan dihapus untuk menampilkan info di popup
    const docToDelete = documents.find(doc => doc.id === docid);
    console.log("Document to delete:", docToDelete);
    setDocumentToDelete(docToDelete);
    setDeleteModal(true);
  };

  // Fungsi untuk konfirmasi delete
  const confirmDeleteDocument = async () => {
    if (!documentToDelete) return;

    setDeleteLoading(true);
    try {
      console.log("Menghapus dokumen dengan ID:", documentToDelete.id);

      // Dapatkan data user untuk ownerid
      const userData = await getCurrentUser();
      if (userData.status !== "success") {
        alert("User tidak ditemukan!");
        setDeleteLoading(false);
        return;
      }

      // Debug: cek nilai yang akan dikirim
      console.log("Mengirim ke deleteDocument:", {
        docid: documentToDelete.id,
        ownerid: userData.userid
      });

      // Panggil deleteDocument dengan docid dan ownerid
      const result = await deleteDocument(documentToDelete.id, userData.userid);
      console.log("Hasil deleteDocument:", result);

      if (result.error) {
        console.error("Error deleting document:", result.error);
        alert("Gagal menghapus dokumen: " + (result.error.message || result.error));
        setDeleteLoading(false);
        return;
      }

      console.log("Dokumen berhasil dihapus dari database.");

      // Hapus dokumen dari state
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentToDelete.id));
      
      // Reset state dan tutup modal
      setDeleteModal(false);
      setDocumentToDelete(null);
      setDeleteLoading(false);
      
      alert("Dokumen berhasil dihapus.");
    } catch (error) {
      console.error("Unexpected error deleting document:", error);
      alert("Terjadi kesalahan saat menghapus dokumen: " + error.message);
      setDeleteLoading(false);
    }
  };

  // Fungsi untuk membatalkan delete
  const cancelDelete = () => {
    setDeleteModal(false);
    setDocumentToDelete(null);
    setDeleteLoading(false);
  };

  // HanddleView Document
  const handleViewDocument = (docid) => {
    // Redirect ke halaman detail dengan ID dokumen
    router.push(`/dashboard/info?id=${docid}`);
  };

  // HanddleEdit Document
  const handleEditDocument = (docid) => {
    // Redirect ke halaman edit dengan ID dokumen
    router.push(`/dashboard/view?id=${docid}`);
  };

  // Load documents saat component mount
  useEffect(() => {
    loadDocuments(); // uncomment jika ingin load dari database
  }, []);

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
          {/* Dashboard Item */}
          <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex flex-col gap-4 overflow-y-auto pr-3">
            {documents.map((item) => (
              <DashboardItem
                key={item.id}
                title={item.title}
                createdAt={item.createdAt}
                viewDoc={item.isi}
                onDelete={() => handleDeleteDocument(item.id)}
                onEdit={() => handleEditDocument(item.id)}
                onView={() => handleViewDocument(item.id)}
                docid={item.id}
              />
            ))}
          </div>
        </div>

        {/* Modal Popup Tambah Dokumen */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-md rounded-[15px] border-[1.5px] border-[#16223B] bg-white p-6 shadow-lg">
              {/* Header Modal */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-eudoxus-medium text-lg text-[#16223B]">Tambah Dokumen Baru</h2>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setJudul("");
                  }}
                  className="text-2xl text-[#16223B] transition-colors hover:text-red-500"
                  disabled={loading}
                >
                  ×
                </button>
              </div>

              {/* Form Input */}
              <div className="mb-6">
                <label className="font-eudoxus-medium mb-2 block text-sm text-[#16223B]">
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
                    if (e.key === "Enter" && !loading) {
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
                  className="flex-1 rounded-lg border-[1.5px] border-[#16223B]/30 py-2 text-[#16223B] transition-colors hover:bg-[#16223B]/10"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  onClick={handleAddDocument}
                  disabled={loading || !judul.trim()}
                  className="flex-1 rounded-lg bg-[#16223B] py-2 text-white transition-colors hover:bg-[#16223B]/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal && documentToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-[90%] max-w-md rounded-[15px] border-[1.5px] border-[#16223B] bg-white p-6 shadow-lg">
              {/* Header Modal */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-eudoxus-medium text-lg text-[#16223B]">Konfirmasi Hapus</h2>
                <button
                  onClick={cancelDelete}
                  className="text-2xl text-[#16223B] transition-colors hover:text-red-500"
                  disabled={deleteLoading}
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="font-eudoxus-medium mb-2 text-sm text-[#16223B]">
                  Apakah Anda yakin ingin menghapus dokumen ini?
                </p>
                <div className="rounded-lg border-[1.5px] border-[#16223B]/20 bg-[#16223B]/5 p-3">
                  <p className="font-eudoxus-medium text-sm text-[#16223B]">
                    <strong>Judul:</strong> {documentToDelete.title}
                  </p>
                  <p className="font-eudoxus-regular text-xs text-[#16223B]/70 mt-1">
                    <strong>Dibuat:</strong> {documentToDelete.createdAt}
                  </p>
                </div>
                <p className="font-eudoxus-regular text-xs text-red-600 mt-2">
                  ⚠️ Tindakan ini tidak dapat dibatalkan!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 rounded-lg border-[1.5px] border-[#16223B]/30 py-2 text-[#16223B] transition-colors hover:bg-[#16223B]/10"
                  disabled={deleteLoading}
                >
                  Batal
                </button>
                <button
                  onClick={confirmDeleteDocument}
                  disabled={deleteLoading}
                  className="flex-1 rounded-lg bg-red-500 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteLoading ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}