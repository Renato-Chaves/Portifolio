import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SoftwarePortfolio } from "@/components/software/SoftwarePortfolio";
import { fetchGithubData } from "@/lib/github";
import { getDictionary, hasLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Renato Chaves — Software Developer",
  description:
    "Software engineering portfolio — full-stack, DevOps, mobile. TypeScript, Next.js, Go, Docker.",
};

export default async function SoftwarePage({
  params,
}: PageProps<"/[lang]/software">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [github, dict] = await Promise.all([
    fetchGithubData(),
    getDictionary(lang),
  ]);
  return <SoftwarePortfolio github={github} dict={dict} locale={lang} />;
}
