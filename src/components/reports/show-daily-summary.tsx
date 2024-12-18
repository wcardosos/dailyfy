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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getTodayReferenceDate } from '@/actions/get-today-reference-date';
import { Report } from '@/types';

interface ShowDailySummaryProps {
  reports: Report[];
}

export function ShowDailySummary({ reports }: Readonly<ShowDailySummaryProps>) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Eye className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{getTodayReferenceDate()} Daily</DialogTitle>
            </DialogHeader>

            <Carousel>
              <CarouselContent>
                {reports?.map((report) => (
                  <CarouselItem key={report.id} className="space-y-4">
                    <div className="space-y-2">
                      <h1 className="font-bold text-2xl">Title</h1>
                      <span>{report.title}</span>
                    </div>
                    <div className="space-y-2">
                      <h1 className="font-bold text-2xl">Description</h1>
                      <p className="whitespace-pre-line">
                        {report.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
                {reports?.length === 0 && (
                  <div className="p-6">
                    No reports found for {getTodayReferenceDate()}
                  </div>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      </TooltipTrigger>

      <TooltipContent>Show summary</TooltipContent>
    </Tooltip>
  );
}
