// lib/query/documents.js
import { createClient } from "@/utils/supabase/client";

// Fungsi untuk menambah dokumen baru
export async function addDocument(judul, ownerid) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          judul: judul,
          isi: "", // isi kosong dulu
          createtime: new Date().toISOString(),
          edittime: new Date().toISOString(),
          ownerid: ownerid,
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
// Fungsi untuk menambah dokumen baru
export async function addDocument(title) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          title: title,
          createdtime: new Date().toISOString(),
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

// Function to fetch a single document with complete details
export async function fetchDocumentWithDetails(documentId) {
  const supabase = createClient();

  try {
    // Fetch the document
    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (documentError) throw documentError;

    // Fetch contributors for this document
    const { data: contributors, error: contributorsError } = await supabase
      .from("document_contributors")
      .select(
        `
        user_id,
        users (
          id,
          username,
          full_name
        )
      `,
      )
      .eq("document_id", documentId);

    if (contributorsError) throw contributorsError;

    // Fetch the document owner info
    const { data: owner, error: ownerError } = await supabase
      .from("users")
      .select("username, full_name")
      .eq("id", document.created_by)
      .single();

    if (ownerError && ownerError.code !== "PGRST116") throw ownerError;

    return {
      document,
      contributors:
        contributors?.map((c) => ({
          name: c.users?.username || "Unknown User",
          fullName: c.users?.full_name,
        })) || [],
      owner: owner || { username: "Unknown" },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching document with details:", error);
    return { document: null, contributors: [], owner: null, error };
  }
}

// Function to save document contents
export async function saveDocumentContent(documentId, content) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .update({
        isi: content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId)
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error saving document content:", error);
    return { data: null, error };
  }
}

// Function to add a contributor to a document
export async function addContributor(documentId, userId) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("document_contributors")
      .insert([
        {
          document_id: documentId,
          user_id: userId,
          added_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error adding contributor:", error);
    return { data: null, error };
  }
}

// Function to remove a contributor from a document
export async function removeContributor(documentId, userId) {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("document_contributors").delete().match({
      document_id: documentId,
      user_id: userId,
    });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error("Error removing contributor:", error);
    return { error };
  }
}

// Function to update document access level
export async function updateDocumentAccess(documentId, accessLevel) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("documents")
      .update({
        access_level: accessLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId)
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error updating document access:", error);
    return { data: null, error };
  }
}
