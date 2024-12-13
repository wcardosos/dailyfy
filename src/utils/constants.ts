import { Category } from '@/types';

export const REPORT_CATEGORIES: { label: string; value: Category }[] = [
  { label: 'What was done', value: 'done' },
  { label: 'What will be done', value: 'goal' },
  { label: 'Impediments', value: 'lock' },
];
