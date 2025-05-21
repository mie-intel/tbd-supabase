import {
  EudoxusBold,
  EudoxusExtraBold,
  EudoxusLight,
  EudoxusMedium,
  EudoxusRegular,
} from "@/utils/font";
import React from "react";
import "./globals.css";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Documents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={cn(
          EudoxusBold.variable,
          EudoxusExtraBold.variable,
          EudoxusLight.variable,
          EudoxusMedium.variable,
          EudoxusRegular.variable,
          "relative h-screen w-full bg-[url('/bg-comp.webp')] bg-cover",
        )}
      >
        {children}
      </body>
    </html>
  );
}
