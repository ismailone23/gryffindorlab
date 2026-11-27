import type { Metadata } from "next";
import { Geist, Geist_Mono, MuseoModerno, Silkscreen } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "../index.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const pixel = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

// Trial: site-wide text face (closest Google Fonts match to "Moderna"; the dafont Moderna has no digits).
const moderno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-moderno",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gryffindorlab | Creative Studio",
  description:
    "Gryffindorlab is a creative studio in Bangladesh: web design and website development, video editing, product development, graphic design and branding for clients worldwide.",
  keywords: [
    "creative studio in Bangladesh",
    "creative agency in Bangladesh",
    "web design agency in Bangladesh",
    "web development agency in Bangladesh",
    "website development company in Bangladesh",
    "video editing agency in Bangladesh",
    "video editing services Bangladesh",
    "graphic design agency in Bangladesh",
    "creative design agency Bangladesh",
    "branding agency in Bangladesh",
    "logo design Bangladesh",
    "product development Bangladesh",
    "MVP development Bangladesh",
    "web design Dhaka",
    "Gryffindorlab",
  ],
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${pixel.variable} ${moderno.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
