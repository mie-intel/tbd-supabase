import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function Container({ children, className }) {
  return <div className={cn("relative h-full w-full backdrop-blur-lg", className)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
