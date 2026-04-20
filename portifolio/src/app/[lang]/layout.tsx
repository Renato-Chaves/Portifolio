import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";
import { hasLocale } from "@/lib/i18n";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Renato Chaves — Portfolio",
  description: "Two parallel identities: Software Developer and Game Developer.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${pressStart2P.variable} ${vt323.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
