import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function ButtonAddDoc({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "font-eudoxus-medium bg: flex items-center gap-[8px] rounded-[5px] border-1 border-[#16223B] bg-[#F5C45E] px-4 py-2.5 text-xl text-white",
        className,
      )}
      {...props}
    >
      <Plus className="h-5 w-5" strokeWidth={4} />
      {children}
    </button>
  );
}

ButtonAddDoc.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
