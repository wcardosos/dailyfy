interface SummaryProps {
  title: string;
  description: string;
}

export function Summary({ title, description }: Readonly<SummaryProps>) {
  return (
    <article className="space-y-2">
      <h2 className="font-medium text-xl">{title}</h2>
      <p className="whitespace-pre-line">{description}</p>
    </article>
  );
}
