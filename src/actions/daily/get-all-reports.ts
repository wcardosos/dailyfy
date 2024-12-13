import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { StorageReportStructure } from '@/types/storage-report-structure';

export function getAllReports(): StorageReportStructure {
  const savedReports = localStorage.getItem(LOCAL_STORAGE_KEYS.REPORTS);

  return savedReports ? JSON.parse(savedReports) : {};
}
