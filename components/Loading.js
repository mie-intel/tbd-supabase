import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black/50">
      <Image alt="loading" src="/loading.gif" width={2000} height={2000} className="w-[100px]" />
    </div>
  );
}
