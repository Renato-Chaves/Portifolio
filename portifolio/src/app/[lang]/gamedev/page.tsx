import { notFound } from "next/navigation";
import { GamedevComingSoon } from "@/components/gamedev/GamedevComingSoon";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function GamedevPage({
  params,
}: PageProps<"/[lang]/gamedev">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <GamedevComingSoon dict={dict} locale={lang} />;
}
