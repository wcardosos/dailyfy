import { ReportCard } from '@/components/reports/report-card';
import { Sidebar } from '@/components/shared/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useState } from 'react';
import { Report } from '@/types';
import { REPORT_CATEGORIES } from '@/utils/constants';
import { FloatingActionButton } from '@/components/shared/floating-action-button';
import { ReportDialog } from '@/components/reports/dialogs/report-dialog';

export function Daily() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  const addReport = (newReport: Omit<Report, 'id'>) => {
    setReports([...reports, { ...newReport, id: Date.now().toString() }]);
    setIsAddingReport(false);
  };

  const updateReport = (updatedReport: Report) => {
    setReports(
      reports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report,
      ),
    );
    setEditingReport(null);
  };

  const deleteReport = (id: string) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const reportDialogActionWrapper = (report: Omit<Report, 'id'> | Report) => {
    if ('id' in report) {
      updateReport(report);
    } else {
      addReport(report);
    }
  };

  return (
    <>
      <Sidebar />

      <main className="w-full">
        <SidebarTrigger />

        <section className="mx-6 md:mx-10 lg:mx-16">
          <h1 className="font-bold text-4xl">Today</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10">
            {REPORT_CATEGORIES.map((category) => (
              <div
                key={category.value}
                className="bg-zinc-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{category.label}</h2>
                {reports
                  .filter((report) => report.category === category.value)
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
              onAction={reportDialogActionWrapper}
              action="add"
            />
          )}
          {editingReport && (
            <ReportDialog
              report={editingReport}
              onClose={() => setEditingReport(null)}
              onAction={reportDialogActionWrapper}
              action="edit"
            />
          )}
        </section>

        <FloatingActionButton onClick={() => setIsAddingReport(true)} />
      </main>
    </>
  );
}
