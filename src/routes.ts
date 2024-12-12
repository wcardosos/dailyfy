import { Calendar, CalendarClock, Settings } from 'lucide-react';

export const routes = [
  {
    title: 'Today',
    url: '',
    icon: Calendar,
    isSoon: false,
  },
  {
    title: 'Calendar',
    url: '',
    icon: CalendarClock,
    isSoon: true,
  },
  {
    title: 'Settings',
    url: '',
    icon: Settings,
    isSoon: true,
  },
];
