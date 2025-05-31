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
import { AuthProvider } from "@/components/AuthProvider";
import PropTypes from "prop-types";

export const metadata = {
  title: "Docsify",
  description: "Docsify - Documentation Made Easy",
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
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
