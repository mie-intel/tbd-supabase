"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const modes = [{ label: "Edit" }, { label: "View" }];

export default function AccessDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Edit");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-black bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow"
      >
        <ChevronDown className="h-5 w-5" />
        {selected}
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-36 rounded-md border bg-white shadow-lg">
          {modes.map((mode) => (
            <button
              key={mode.label}
              onClick={() => {
                setSelected(mode.label);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
            >
              {mode.label}
              {selected === mode.label && <Check className="h-4 w-4 text-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
