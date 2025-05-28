// lib/query/documents.js
import { createClient } from "@/utils/supabase/client";

// Fungsi untuk mengambil semua dokumen berdasarkan owner DAN contributor
export async function fetchAllDocuments(userid) {
  const supabase = createClient();

  try {
    // Query untuk mendapatkan dokumen di mana user adalah owner ATAU contributor
    const { data, error } = await supabase
      .from("documents")
      .select(
        `
        *,
        access!inner(userid)
      `,
      )
      .eq("access.userid", userid)
      .order("createtime", { ascending: false });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { data: null, error };
  }
}

// Alternatif fungsi yang lebih eksplisit (jika method di atas tidak work)
export async function fetchAllDocumentsAlternative(userid) {
  const supabase = createClient();

  try {
    // Ambil dokumen yang dimiliki user
    const { data: ownedDocs, error: ownedError } = await supabase
      .from("documents")
      .select("*")
      .eq("ownerid", userid);

    if (ownedError) {
      throw ownedError;
    }

    // Ambil dokumen di mana user adalah contributor
    const { data: contributorDocs, error: contributorError } = await supabase
      .from("documents")
      .select(
        `
        *,
        access!inner(userid)
      `,
      )
      .eq("access.userid", userid)
      .neq("ownerid", userid); // Exclude dokumen yang sudah diambil sebagai owner

    if (contributorError) {
      throw contributorError;
    }

    // Gabungkan kedua array dan hapus duplikat
    const allDocs = [...(ownedDocs || []), ...(contributorDocs || [])];

    // Sort berdasarkan createtime descending
    const sortedDocs = allDocs.sort((a, b) => new Date(b.createtime) - new Date(a.createtime));

    return { data: sortedDocs, error: null };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { data: null, error };
  }
}

// Fungsi untuk menambah dokumen baru
export async function addDocument(judul, ownerid, customDocId = null) {
  const supabase = createClient();

  try {
    const newDoc = {
      judul: judul,
      isi: "", // isi kosong dulu
      createtime: new Date().toISOString(),
      ownerid: ownerid,
    };

    // Tambahkan docid kustom jika disediakan
    if (customDocId) {
      newDoc.docid = customDocId;
    }

    const { data, error } = await supabase.from("documents").insert([newDoc]).select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error adding document:", error);
    return { data: null, error };
  }
}

// Fungsi untuk mengambil dokumen berdasarkan ID
export async function fetchDocumentById(docid) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("docid", docid)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching document:", error);
    return { data: null, error };
  }
}

// Fungsi untuk update dokumen
export async function updateDocument(docid, updates) {
  const supabase = createClient();

  try {
    const updateData = {
      ...updates,
      edittime: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("documents")
      .update(updateData)
      .eq("docid", docid)
      .select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error updating document:", error);
    return { data: null, error };
  }
}

// Perbaiki fungsi deleteDocument di lib/query/documents.js
export async function deleteDocument(docid, ownerid) {
  const supabase = createClient();

  try {
    console.log("deleteDocument called with:", { docid, ownerid });

    // Pertama, cek apakah dokumen exists dan owner-nya benar
    const { data: checkData, error: checkError } = await supabase
      .from("documents")
      .select("docid, ownerid")
      .eq("docid", docid)
      .eq("ownerid", ownerid)
      .single();

    console.log("Check document result:", { checkData, checkError });

    if (checkError) {
      if (checkError.code === "PGRST116") {
        // Dokumen tidak ditemukan atau bukan milik user
        console.error("Document not found or not owned by user");
        return {
          error: new Error(
            "Dokumen tidak ditemukan atau Anda tidak memiliki akses untuk menghapusnya",
          ),
        };
      }
      throw checkError;
    }

    // Jika dokumen ditemukan dan owner benar, lakukan delete
    const { data, error } = await supabase
      .from("documents")
      .delete()
      .eq("docid", docid)
      .eq("ownerid", ownerid)
      .select(); // Tambahkan select untuk melihat data yang dihapus

    console.log("Delete result:", { data, error });

    if (error) {
      throw error;
    }

    // Cek apakah ada data yang dihapus
    if (!data || data.length === 0) {
      console.error("No rows were deleted");
      return { error: new Error("Tidak ada dokumen yang dihapus") };
    }

    console.log("Document successfully deleted:", data);
    return { error: null, data };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { error };
  }
}

// Tambahkan fungsi untuk memeriksa apakah ID dokumen sudah ada
export async function checkDocumentIdExists(docId) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("docid")
      .eq("docid", docId)
      .single();

    if (error && error.code === "PGRST116") {
      // PGRST116 berarti tidak ada baris yang dikembalikan, jadi ID tidak ada
      return { exists: false, error: null };
    }

    if (error) {
      throw error;
    }

    return { exists: true, error: null };
  } catch (error) {
    console.error("Error checking document ID:", error);
    return { exists: false, error };
  }
}
