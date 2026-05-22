import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces-display",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salkkuanalyysi — Niklas Lindahl",
  description:
    "Editoriaalinen tekoälypohjainen salkkuanalyysi: allokaatio, hajautusvaroitukset, riskiprofiili ja kolme suositusta.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi" className={`${fraunces.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
