import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "./NavLink";
import { sidebarItems } from "@/config/dashNav";

export function Sidebar() {
  return (
    <SidebarComponent className="min-h-screen bg-background border-r">
      <SidebarHeader className="border-b px-6 py-3">
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup className="px-3">
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t" />
    </SidebarComponent>
  );
}
