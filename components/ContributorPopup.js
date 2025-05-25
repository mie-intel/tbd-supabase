"use client";

import { X } from "lucide-react";
import { useState } from "react";

const mockContributors = new Array(20).fill("RHIZROM");

export default function ContributorPopup({ onClose }) {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

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
          placeholder="🔍 Search..."
          className="mt-3 w-full rounded-md border px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none"
        />

        <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1">
          {mockContributors.map((name, index) => (
            <div key={index} className="flex items-center justify-between px-1 py-1">
              <span className="text-sm text-black sm:text-base">{name}</span>
              <div
                className="h-5 w-5 cursor-pointer rounded-sm border border-black"
                onClick={() => toggleSelect(index)}
              >
                {selected.includes(index) && (
                  <div className="flex h-full w-full items-center justify-center bg-blue-500">
                    <span className="text-white">✓</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
