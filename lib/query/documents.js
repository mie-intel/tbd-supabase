import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const ambilDocuments = async (select = "*") => {
  const { data, error } = await supabase.from("documents").select(select);
  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data;
};
