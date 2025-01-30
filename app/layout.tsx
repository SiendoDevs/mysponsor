import type { Metadata } from "next";
import { Geist, Geist_Mono, Gabarito } from "next/font/google"; // Add Gabarito import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gabarito = Gabarito({
  variable: "--font-gabarito", // Create a custom variable for Gabarito font
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MySponsor | Uniendo pilotos con patrocinadores",
  description: "Un servicio dedicado a unir pilotos de karting con patrocinadores en todo el mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gabarito.variable} antialiased`} // Add Gabarito variable
      >
        {children}
      </body>
    </html>
  );
}
