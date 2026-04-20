import { notFound } from "next/navigation";
import { IdentityStage } from "@/components/identity/IdentityStage";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <IdentityStage dict={dict} locale={lang} />
    </main>
  );
}
