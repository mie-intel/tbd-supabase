"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAllUsersExcept } from "@/lib/query/users";

export default function ContributorPopup({ onClose, ownerUserId }) {
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users except document owner
  useEffect(() => {
    async function loadUsers() {
      try {
        const { data, error } = await fetchAllUsersExcept(ownerUserId);

        if (error) {
          console.error("Error loading users:", error);
        } else if (data) {
          setUsers(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [ownerUserId]);

  const toggleSelect = (userId) => {
    setSelected((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      (user.nama?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="font-eudoxus-bold text-xl text-[#16223B]">Tambahkan Contributor</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search..."
          className="mt-3 w-full rounded-md border px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none"
        />

        <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1">
          {loading ? (
            <div className="py-2 text-center text-gray-500">Loading users...</div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.userid} className="flex items-center justify-between px-1 py-1">
                <span className="text-sm text-black sm:text-base">
                  {user.nama || user.username || "Unknown user"}
                </span>
                <div
                  className="h-5 w-5 cursor-pointer rounded-sm border border-black"
                  onClick={() => toggleSelect(user.userid)}
                >
                  {selected.includes(user.userid) && (
                    <div className="flex h-full w-full items-center justify-center bg-blue-500">
                      <span className="text-white">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-2 text-center text-gray-500">No users found</div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded border-black bg-blue-500 px-4 py-2 font-bold text-white hover:bg-[#0090dd]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
