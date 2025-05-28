// lib/query/documents.js
import { createClient } from "@/utils/supabase/client";

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

// Fungsi untuk mengambil semua dokumen berdasarkan owner
export async function fetchAllDocuments(ownerid) {
  const supabase = createClient();
  ß;

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("ownerid", ownerid)
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

// Fungsi untuk hapus dokumen
export async function deleteDocument(docid, ownerid) {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("docid", docid)
      .eq("ownerid", ownerid); // pastikan owner yang menghapus

    if (error) {
      throw error;
    }

    return { error: null };
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
