import { Category } from '@/types';

const LOCAL_STORAGE_KEYS_PREFIX = 'dailyfy:';

export const REPORT_CATEGORIES: { label: string; value: Category }[] = [
  { label: 'What was done', value: 'done' },
  { label: 'What will be done', value: 'goal' },
  { label: 'Impediments', value: 'lock' },
];

export const LOCAL_STORAGE_KEYS = {
  REPORTS: `${LOCAL_STORAGE_KEYS_PREFIX}reports`,
};
