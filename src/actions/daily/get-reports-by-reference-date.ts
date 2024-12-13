import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { Report } from '@/types';

export function getReportsByReferenceDate(referenceDate: string): Report[] {
  const savedReports = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.REPORTS) ?? '{}',
  );

  return savedReports[referenceDate] || [];
}
