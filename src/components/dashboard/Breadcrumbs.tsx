"use client";

import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Home className="h-4 w-4 mr-1" />
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {paths.slice(1).map((path, index) => (
          <Fragment key={path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={path}>
              {index === paths.length - 2 ? (
                <BreadcrumbPage>
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/dashboard/${paths.slice(1, index + 2).join("/")}`}
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
