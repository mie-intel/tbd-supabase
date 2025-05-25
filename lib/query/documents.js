// lib/query/documents.js
import { createClient } from "@/utils/supabase/client";

// Fungsi untuk menambah dokumen baru
export async function addDocument(title) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          title: title,
          created_at: new Date().toISOString(),
          isi: "", // isi kosong dulu
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error adding document:", error);
    return { data: null, error };
  }
}

// Fungsi untuk mengambil semua dokumen
export async function fetchAllDocuments() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

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
export async function fetchDocumentById(id) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("documents").select("*").eq("id", id).single();

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
export async function updateDocument(id, updates) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("documents").update(updates).eq("id", id).select();

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
export async function deleteDocument(id) {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { error };
  }
}
