import type { Metadata } from "next";
import styles from "./layout.module.css";
import Link from "next/link";
import "./globals.css";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "League Wrangler",
  description: "",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
