import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutomateMe",
  description: "Audit operational workflows to uncover high-impact AI automation opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
