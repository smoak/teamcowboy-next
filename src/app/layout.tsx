import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "League Wrangler",
  description: "",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
