import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varainhoidon AI-avustaja — salkkuanalyysi",
  description:
    "Liitä sijoitussalkku ja saa varainhoito-tason analyysi alle minuutissa: allokaatio, hajautusvaroitukset, riskiprofiili ja suositukset.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi" className="h-full">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
