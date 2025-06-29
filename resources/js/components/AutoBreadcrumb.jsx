import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AutoBreadcrumb() {
  // Inertia’s page.url is the full URL (path + query). We only need the pathname.
  const { url } = usePage();

  // Create a temporary URL object to easily pull out the pathname
  const pathname = new URL(url, window.location.origin).pathname;

  // Split on `/`, throw away empty entries, e.g. '/gestion/articulos/crear' → ['gestion','articulos','crear']
  const segments = pathname.split("/").filter((s) => s.length > 0);

  // Build crumbs: accumulate path segments so hrefs are “/gestion”, “/gestion/articulos”, …
  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    // Capitalize the segment for display:
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
      <BreadcrumbSeparator/>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <BreadcrumbItem key={crumb.href}>
              {isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
