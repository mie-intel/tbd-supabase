import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function DashboardItem({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "flex h-[100px] w-full items-center justify-between rounded-[50px] border-2 border-[#16223B]/20 bg-[#505050]/20 px-4 py-2 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DashboardItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
