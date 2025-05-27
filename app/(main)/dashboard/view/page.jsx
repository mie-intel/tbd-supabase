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
import { fetchUserById } from "@/lib/query/users";
import ContributorPopup from "@/components/ContributorPopup";
import { AuthContext } from "@/components/AuthProvider";
import { fetchDocumentContributors } from "@/lib/query/access";

export default function Home() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [documentEditDate, setDocumentEditDate] = useState("");
  const [editMode, setEditMode] = useState("Edit");
  const [username, setUsername] = useState("User");
  const [ownerName, setOwnerName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [contributors, setContributors] = useState([]);
  const searchParams = useSearchParams();
  const { getCurrentUser } = useContext(AuthContext);

  // Fetch current user data
  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const userData = await getCurrentUser();
        if (userData.status === "success") {
          setCurrentUser(userData);

          // If we already have document data, check if user is owner
          if (document && document.ownerid) {
            setIsOwner(userData.userid === document.ownerid);
          }
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    }

    loadCurrentUser();
  }, [getCurrentUser]);

  // Fetch document owner when document loads
  useEffect(() => {
    async function fetchDocumentOwner() {
      if (!document || !document.ownerid) return;

      // Check if current user is owner when document loads
      if (currentUser) {
        setIsOwner(currentUser.userid === document.ownerid);
      }

      try {
        const { data, error } = await fetchUserById(document.ownerid);
        if (error) {
          console.error("Error fetching document owner:", error);
          return;
        }

        if (data) {
          setOwnerName(data.username || data.nama || "Unknown");
        }
      } catch (err) {
        console.error("Unexpected error fetching owner:", err);
      }
    }

    fetchDocumentOwner();
  }, [document, currentUser]);

  // Existing document fetch function remains the same
  useEffect(() => {
    async function fetchDocument() {
      try {
        const docId = searchParams.get("id");

        if (docId) {
          const { data, error } = await fetchDocumentById(docId);

          if (error) {
            console.error("Error fetching document:", error);
          } else if (data) {
            setDocument(data);
            setDocumentTitle(data.judul || "Untitled Document");

            // Format dates to include both date and time
            const dateTimeOptions = {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            };

            // Set creation date with time
            setDocumentDate(new Date(data.createtime).toLocaleString("id-ID", dateTimeOptions));

            // Set edit date with time if it exists
            setDocumentEditDate(
              data.edittime ? new Date(data.edittime).toLocaleString("id-ID", dateTimeOptions) : "",
            );

            setDocumentContent(data.isi || "Sorry, this document is empty.");

            // If we already have current user data, check if user is owner
            if (currentUser) {
              setIsOwner(currentUser.userid === data.ownerid);
            }
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

  // New useEffect to fetch contributors when document loads
  useEffect(() => {
    async function fetchContributors() {
      if (!document || !document.docid || !document.ownerid) return;

      try {
        const { data, error } = await fetchDocumentContributors(document.docid, document.ownerid);
        if (error) {
          console.error("Error fetching contributors:", error);
          return;
        }

        if (data) {
          setContributors(data);
        }
      } catch (err) {
        console.error("Unexpected error fetching contributors:", err);
      }
    }

    fetchContributors();
  }, [document]);

  const handleSave = async () => {
    try {
      console.log("Saving document...", documentContent);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const handleContentChange = (e) => {
    setDocumentContent(e.target.value);
  };

  if (loading) return <Loading />;

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
              <AccessDropdown onModeChange={setEditMode} initialMode={editMode} />
              {isOwner && (
                <ButtonContributor onClick={() => setOpen(true)}>Contributor</ButtonContributor>
              )}
            </div>
          </div>

          {/* bawah */}
          <div className="relative flex h-[88%] w-full flex-col gap-[12px] rounded-[10px] border-[1.5px] border-[#16223B] bg-white/40 px-3 py-3 text-[white] backdrop-blur-lg">
            {/* Judul dkk */}
            <div className="flex h-[18%] w-full">
              <HeaderDocuments
                title={documentTitle}
                createdAt={documentDate}
                editedAt={documentEditDate}
                username={ownerName || "Unknown Owner"}
                contributors={contributors}
                className="w-full"
              />
            </div>
            {/* Isi */}
            <div className="scrollbar-thin scrollbar-thumb-[#16223B]/70 scrollbar-track-[#16223B]/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-[82%] w-full flex-col items-center gap-6 overflow-y-auto px-6 py-4 pr-3 text-[black]">
              {editMode === "Edit" ? (
                <textarea
                  value={documentContent}
                  onChange={handleContentChange}
                  className="font-inherit h-full w-full resize-none border-none bg-transparent p-0 focus:ring-0 focus:outline-none"
                />
              ) : (
                documentContent
              )}
            </div>
          </div>
          {/* save - only show in Edit mode */}
          <div className="flex h-[5%] w-full flex-row justify-end pt-1">
            {editMode === "Edit" && <ButtonSave onClick={handleSave}>Save</ButtonSave>}
          </div>
        </div>
      </div>
      {open && document?.ownerid && (
        <ContributorPopup onClose={() => setOpen(false)} ownerUserId={document.ownerid} />
      )}
    </>
  );
}
