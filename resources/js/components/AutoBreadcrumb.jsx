import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

export default function AutoBreadcrumb() {
  const { url } = usePage();
  const pathname = new URL(url, window.location.origin).pathname;
  const segments = pathname.split("/").filter((s) => s.length > 0);

  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <>
      {/* Versión simplificada para pantallas pequeñas */}
      <Breadcrumb className="sm:hidden">
        <BreadcrumbList>
          {crumbs.length > 0 && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumbs[0].href}>{crumbs[0].label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
          {crumbs.length > 1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbEllipsis />
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Versión completa para sm y mayores */}
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <React.Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
