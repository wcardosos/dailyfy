import { SidebarProvider } from './components/ui/sidebar';
import { Daily } from './views/daily';

export function App() {
  return (
    <SidebarProvider>
      <Daily />
    </SidebarProvider>
  );
}
