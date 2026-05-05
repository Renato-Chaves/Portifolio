import { notFound } from "next/navigation";
import { GamedevExperience } from "@/components/gamedev/GamedevExperience";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function GamedevPage({
  params,
}: PageProps<"/[lang]/gamedev">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <GamedevExperience dict={dict} locale={lang} />;
}
