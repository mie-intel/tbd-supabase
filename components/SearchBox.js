import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

export default function SearchBox({ className, ...props }) {
  return (
    <div className="flex w-[20%] items-center gap-[6px] rounded-[8px] border-[1.5px] border-[#16223B]/20 bg-[#505050]/20 px-3 py-2 backdrop-blur-xl">
      <Search className="mr-1 h-4.5 w-4.5 text-[#16223B]/50" />
      <input
        type="text"
        placeholder="Search..."
        className="font-eudoxus-medium rounded-[5px] text-[#16223B] placeholder-[#16223B]/50 focus:outline-none"
      />
    </div>
  );
}
SearchBox.propTypes = {
  className: PropTypes.string,
};
