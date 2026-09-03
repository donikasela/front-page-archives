import { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Front Page Archives",
  description: "Guess the year of historical newspaper front pages",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
