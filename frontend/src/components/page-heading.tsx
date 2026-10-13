import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-heading">
      <div className="site-container relative z-10 py-16 sm:py-20">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-balance-tight text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-[2.7rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-8 text-ink-muted">{description}</p>
      )}
    </div>
  );
}
