import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Milan Events",
    template: "%s — Milan Events",
  },
  description: "La bacheca degli eventi di Milano",
  openGraph: {
    title: "Milan Events",
    description: "La bacheca degli eventi di Milano",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
