import { ReportCard } from '@/components/reports/report-card';
import { Sidebar } from '@/components/shared/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { Report } from '@/types';
import { REPORT_CATEGORIES } from '@/utils/constants';
import { FloatingActionButton } from '@/components/shared/floating-action-button';
import { ReportDialog } from '@/components/reports/dialogs/report-dialog';
import { getReportsByReferenceDate } from '@/actions/daily/get-reports-by-reference-date';
import { getTodayReferenceDate } from '@/actions/get-today-reference-date';
import { updateReportsFromReferenceDate } from '@/actions/daily/update-reports-from-date';
import { ShowDailySummary } from '@/components/reports/show-daily-summary';

export function Daily() {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  const addReport = (newReport: Report) => {
    setReports([...reports!, newReport]);
    setIsAddingReport(false);
  };

  const updateReport = (updatedReport: Report) => {
    if (!reports) return;
    setReports(
      reports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report,
      ),
    );
    setEditingReport(null);
  };

  const deleteReport = (id: string) => {
    if (!reports) return;
    setReports(reports.filter((report) => report.id !== id));
  };

  useEffect(() => {
    setReports(getReportsByReferenceDate(getTodayReferenceDate()));
  }, []);

  useEffect(() => {
    if (!reports) return;
    updateReportsFromReferenceDate(reports, getTodayReferenceDate());
  }, [reports]);

  return (
    <>
      <Sidebar />

      <main className="w-full bg-zinc-50 text-zinc-950">
        <SidebarTrigger />

        <section className="mx-6 md:mx-10 lg:mx-16">
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">Today</h1>
            <div className="flex gap-2">
              <ShowDailySummary reports={reports ?? []} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 items-start">
            {REPORT_CATEGORIES.map((category) => (
              <div
                key={category.value}
                className="bg-zinc-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{category.label}</h2>
                {reports
                  ?.filter((report) => report.category === category.value)
                  .map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onEdit={() => setEditingReport(report)}
                      onDelete={() => deleteReport(report.id)}
                    />
                  ))}
              </div>
            ))}
          </div>
          {isAddingReport && (
            <ReportDialog
              onClose={() => setIsAddingReport(false)}
              onAction={addReport}
              action="add"
            />
          )}
          {editingReport && (
            <ReportDialog
              report={editingReport}
              onClose={() => setEditingReport(null)}
              onAction={updateReport}
              action="edit"
            />
          )}
        </section>

        <FloatingActionButton onClick={() => setIsAddingReport(true)} />
      </main>
    </>
  );
}
