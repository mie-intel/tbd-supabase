import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Info, SquarePen, Trash2 } from "lucide-react";

export default function DashboardItem({ title, viewDoc, createdAt, className, ...props }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-[8px] bg-white px-5 py-4 duration-300 ease-in-out hover:shadow-lg md:px-8 md:py-6",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-[4px]">
        <h1 className="font-eudoxus-bold text-start text-2xl text-[#16223B] duration-300 ease-in-out sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <div className="item-start g ap-[4px] flex flex-col duration-300 ease-in-out md:flex-row md:items-center md:gap-[16px]">
          <p className="font-eudoxus-medium text-[12px] text-[#B89347] duration-300 ease-in-out sm:text-sm">
            {createdAt}
          </p>
          <p className="font-eudoxus-bold text-[12px] text-[#16223B] duration-300 ease-in-out sm:text-sm">
            {viewDoc}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 duration-300 ease-in-out md:flex-row md:gap-[20px]">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[8px] rounded-full bg-[#5DF590] p-2 text-xl text-white duration-300 ease-in-out hover:bg-[#4FD07B] md:rounded-[5px] md:px-4 md:py-2.5"
        >
          <span className="font-eudoxus-medium hidden text-sm text-[#16223B] duration-300 ease-in-out md:inline">
            Details
          </span>
          <Info
            className="h-2.5 w-2.5 text-[#16223B] duration-300 ease-in-out sm:h-4 sm:w-4"
            strokeWidth={2}
          />
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[8px] rounded-full bg-[#5DCCF5] p-2 text-xl text-white duration-300 ease-in-out hover:bg-[#4FAED0] md:rounded-[5px] md:px-4 md:py-2.5"
        >
          <span className="font-eudoxus-medium hidden text-sm text-[#16223B] duration-300 ease-in-out md:inline">
            Edit
          </span>
          <SquarePen
            className="h-2.5 w-2.5 text-[#16223B] duration-300 ease-in-out sm:h-4 sm:w-4"
            strokeWidth={2}
          />
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[8px] rounded-full bg-[#F55D60] p-2 text-xl text-white duration-300 ease-in-out hover:bg-[#D04F52] md:rounded-[5px] md:px-4 md:py-2.5"
        >
          <span className="font-eudoxus-medium hidden text-sm text-[#16223B] duration-300 ease-in-out md:inline">
            Hapus
          </span>
          <Trash2
            className="h-2.5 w-2.5 text-[#16223B] duration-300 ease-in-out sm:h-4 sm:w-4"
            strokeWidth={2}
          />
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
