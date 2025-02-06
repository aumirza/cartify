"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/config/dashNav";

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
}

export function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const Icon = Icons[icon];

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        pathname === href ? "bg-accent text-accent-foreground" : "transparent"
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}
