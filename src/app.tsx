import { SidebarProvider } from './components/ui/sidebar';
import { TooltipProvider } from './components/ui/tooltip';
import { Daily } from './views/daily';

export function App() {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={300}>
        <Daily />
      </TooltipProvider>
    </SidebarProvider>
  );
}
