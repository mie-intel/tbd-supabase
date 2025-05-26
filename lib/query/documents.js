// lib/query/documents.js
import { createClient } from "@/utils/supabase/client";

export function testFetch() {
  const supabase = createClient();
  return supabase.from("documents").select("*");
}

export async function addDocument(judul) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("documents")
    .insert([{ title: judul }])
    .select("*")
    .single();
  return data;
}
