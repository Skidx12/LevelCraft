import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LevelCraft Academy — Learn. Build. Ascend.",
  description: "A progressive, gamified path from beginner to enterprise-ready software engineer.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
