interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: Readonly<EmptyStateProps>) {
  return <div className="w-full text-center">{message}</div>;
}
