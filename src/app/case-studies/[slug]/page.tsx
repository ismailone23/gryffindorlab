import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { workCategories } from "@/lib/work";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return workCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = workCategories.find((item) => item.slug === slug);
  return {
    title: `${work?.name ?? "Work"} — Case study preview | Gryffindorlab`,
    description:
      "A Gryffindorlab case study placeholder. Project details have not been published yet.",
    robots: { index: false, follow: true },
    openGraph: {
      title: `${work?.name ?? "Work"} — Case study preview | Gryffindorlab`,
      description: "Project details have not been published yet.",
      url: `${siteUrl}/case-studies/${slug}/`,
      type: "website",
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const work = workCategories.find((item) => item.slug === slug);
  if (!work) notFound();

  return (
    <div className="mx-auto w-full max-w-[1680px] px-6 min-[901px]:px-[clamp(32px,4.4vw,80px)]">
      <header className="flex h-21.5 items-center justify-between border-b border-border min-[901px]:h-26.5">
        <Link
          href="/"
          aria-label="Gryffindorlab home"
          className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <img
            src="/favicon.svg"
            width="40"
            height="40"
            alt=""
            className="size-9 rounded-sm min-[901px]:size-10"
          />
          <span className="font-(family-name:--display) text-lg font-semibold tracking-[-0.035em]">
            Gryffindorlab<span className="text-(--orange)">.</span>
          </span>
        </Link>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to work
        </Link>
      </header>

      <main className="grid min-h-[calc(100svh-106px)] items-center gap-12 py-16 min-[901px]:grid-cols-[1.1fr_1fr] min-[901px]:gap-20 min-[901px]:py-24">
        <div>
          <h1 className="m-0 font-(family-name:--display) text-[clamp(56px,7.5vw,112px)] leading-[.98] font-semibold tracking-[-0.04em]">
            {work.name}
            <span className="text-(--orange)">.</span>
          </h1>
          <p className="mt-7 mb-0 max-w-106 text-base leading-[1.75] text-muted-foreground min-[901px]:text-lg">
            Case study coming soon. This is a preview page; project details and
            images haven’t been published yet.
          </p>
        </div>
        <div className="flex aspect-[1.25] items-center justify-center rounded-[5px] bg-(--soft)">
          <img
            src="/favicon.svg"
            width="120"
            height="120"
            alt=""
            className="size-24 min-[901px]:size-30"
          />
        </div>
      </main>
    </div>
  );
}
