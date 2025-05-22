import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Info, SquarePen, Trash2 } from "lucide-react";

export default function DashboardItem({ title, viewDoc, createdAt, className, ...props }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-[8px] bg-white px-8 py-6",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-[4px]">
        <h1 className="font-eudoxus-bold text-4xl text-[#16223B]">{title}</h1>
        <div className="flex items-center gap-[16px]">
          <p className="font-eudoxus-bold text-sm text-[#B89347]">{viewDoc}</p>
          <p className="font-eudoxus-medium text-sm text-[#16223B]">{createdAt}</p>
        </div>
      </div>
      <div className="flex items-center gap-[20px]">
        <button
          type="button"
          className="flex items-center gap-[8px] rounded-[5px] bg-[#5DF590] px-4 py-2.5 text-xl text-white"
        >
          <span className="font-eudoxus-medium text-sm text-[#16223B]">Details</span>
          <Info className="h-4 w-4 text-[#16223B]" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="flex items-center gap-[8px] rounded-[5px] bg-[#5DCCF5] px-4 py-2.5 text-xl text-white"
        >
          <span className="font-eudoxus-medium text-sm text-[#16223B]">Edit</span>
          <SquarePen className="h-4 w-4 text-[#16223B]" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="flex items-center gap-[8px] rounded-[5px] bg-[#F55D60] px-4 py-2.5 text-xl text-white"
        >
          <span className="font-eudoxus-medium text-sm text-[#16223B]">Hapus</span>
          <Trash2 className="h-4 w-4 text-[#16223B]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
DashboardItem.propTypes = {
  viewDoc: PropTypes.isRequired,
  createdAt: PropTypes.isRequired,
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
};
