import { Sidebar } from '@/components/shared/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Daily() {
  return (
    <>
      <Sidebar />

      <main>
        <SidebarTrigger />
      </main>
    </>
  );
}
