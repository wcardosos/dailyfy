import { Category, Report } from '@/types';
import { Summary } from './summary';
import { EmptyState } from '@/components/shared/empty-state';

interface CategorySummaryProps {
  reports: Report[];
  category: Category;
}

export function CategorySummary({
  reports,
  category,
}: Readonly<CategorySummaryProps>) {
  const TEXTS_BY_CATEGORY = {
    done: {
      title: 'Done',
      emptyStateMessage: 'Nothing done',
    },
    goal: {
      title: 'Goals',
      emptyStateMessage: 'No goals',
    },
    lock: {
      title: 'Impediments',
      emptyStateMessage: 'No impediments',
    },
  };

  const texts = TEXTS_BY_CATEGORY[category];

  return (
    <div className="space-y-4">
      <h1 className="font-medium text-2xl">{texts.title}</h1>
      <div className="space-y-3">
        {reports.map((report) => (
          <Summary
            key={report.id}
            title={report.title}
            description={report.description}
          />
        ))}
        {reports.length === 0 && (
          <EmptyState message={texts.emptyStateMessage} />
        )}
      </div>
    </div>
  );
}
