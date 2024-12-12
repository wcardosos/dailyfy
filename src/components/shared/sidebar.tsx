import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { routes } from '@/routes';
import { Badge } from '../ui/badge';

export function Sidebar() {
  const { state } = useSidebar();

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <span className="text-3xl font-medium">
          {state === 'expanded' ? 'LOGO' : 'L'}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(item.isSoon && 'text-zinc-400')}
              >
                <a
                  href={item.isSoon ? '#' : item.url}
                  className={cn(item.isSoon && 'pointer-events-none')}
                >
                  <item.icon />
                  {item.title}
                  {item.isSoon && <Badge variant="secondary">Soon</Badge>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </ShadcnSidebar>
  );
}
