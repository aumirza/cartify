import { Search } from "./Search";
import { UserDropDown } from "./UserDropdown";
import { Breadcrumbs } from "./Breadcrumbs";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex gap-5 items-center">
          <SidebarTrigger />
          <Breadcrumbs />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeToggle />
          <UserDropDown />
          {/* Themetoggle */}
        </div>
      </div>
    </header>
  );
}
