import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getTodayReferenceDate } from '@/actions/get-today-reference-date';
import { Category, Report } from '@/types';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { useMemo } from 'react';
import { CategorySummary } from './category-summary';

interface ShowDailySummaryProps {
  reports: Report[];
}

export function ShowDailySummary({ reports }: Readonly<ShowDailySummaryProps>) {
  const filteredReports = useMemo(
    () =>
      reports.reduce<Record<Category, Report[]>>(
        (acc, report) => {
          acc[report.category].push(report);
          return acc;
        },
        {
          done: [],
          goal: [],
          lock: [],
        },
      ),
    [reports],
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Eye className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[50vw] h-[80vh] max-w-none">
            <DialogHeader>
              <DialogTitle>{getTodayReferenceDate()} Daily</DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-full">
              <div className="space-y-6">
                <CategorySummary
                  reports={filteredReports.done}
                  category="done"
                />

                <Separator />

                <CategorySummary
                  reports={filteredReports.goal}
                  category="goal"
                />

                <Separator />

                <CategorySummary
                  reports={filteredReports.lock}
                  category="lock"
                />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>

      <TooltipContent>Show summary</TooltipContent>
    </Tooltip>
  );
}
