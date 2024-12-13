import { Report } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { getAllReports } from './get-all-reports';

export function updateReportsFromReferenceDate(
  reports: Report[],
  referenceDate: string,
) {
  const allReports = getAllReports();

  allReports[referenceDate] = reports;

  console.log('reports', allReports[referenceDate]);

  localStorage.setItem(LOCAL_STORAGE_KEYS.REPORTS, JSON.stringify(allReports));
}
