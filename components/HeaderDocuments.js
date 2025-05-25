import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function HeaderDocuments({
  title,
  createdAt,
  username,
  contributors = [],
  className,
  ...props
}) {
  return (
    <div className={cn("flex h-full w-full flex-row px-6 py-4", className)} {...props}>
      {/* Kiri: Judul dan info */}
      <div className="font-eudoxus-sans flex w-[75%] flex-col items-start justify-center">
        <h1 className="mb-1 text-3xl font-extrabold text-slate-900">{title}</h1>
        <div className="mb-1 text-slate-800">
          <span className="font-semibold">Create at:</span>{" "}
          <span className="text-yellow-700">{createdAt}</span>
        </div>
        <div className="font-semibold text-slate-900">
          <span>By:</span>{" "}
          <a href="#" className="text-blue-600 hover:underline">
            {username}
          </a>
        </div>
      </div>

      {/* Kanan:*/}
      <div className="font-eudoxus-sans ml-auto flex w-[25%] items-center space-x-3 text-sm font-semibold text-blue-600">
        <span>Contributors:</span>
        <div className="flex max-w-xs space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {contributors.map((contributor, idx) => (
            <a key={idx} href="#" className="hover:underline" title={contributor.name}>
              {contributor.name}
              {idx < contributors.length - 1 ? "," : ""}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

HeaderDocuments.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};
