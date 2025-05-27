"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const modes = [{ label: "Edit" }, { label: "View" }];

export default function AccessDropdown({ onModeChange, initialMode = "Edit" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initialMode);
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

  const handleModeChange = (mode) => {
    setSelected(mode);
    setOpen(false);
    if (onModeChange) onModeChange(mode);
  };

  return (
    <div className="relative inline-block w-30" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="font-eudoxus flex w-full items-center gap-2 rounded-[10px] border border-black bg-blue-500 px-4 py-2 text-lg text-white shadow hover:bg-blue-300"
      >
        <ChevronDown className="h-5 w-5" />
        {selected}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {modes.map((mode) => (
            <button
              key={mode.label}
              onClick={() => handleModeChange(mode.label)}
              className="font-eudoxus flex w-full items-center justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
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
