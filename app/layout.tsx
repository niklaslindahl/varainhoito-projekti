import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salkkuanalyysi — Niklas Lindahl",
  description:
    "Editoriaalinen tekoälypohjainen salkkuanalyysi: allokaatio, hajautusvaroitukset, riskiprofiili ja kolme suositusta.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=JetBrains+Mono:wght@400..600&display=swap"
        />
      </head>
      <body className="min-h-full bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
