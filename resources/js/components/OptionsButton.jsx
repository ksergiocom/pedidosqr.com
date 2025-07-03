import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { Link } from "@inertiajs/react";


const OptionsButton = ({ entity, actions, className }) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu opciones" className={className}>
            <EllipsisVertical/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, i) => (
          <React.Fragment key={i}>
            {action.separatorBefore && <DropdownMenuSeparator />}
            {action.href ? (
              <DropdownMenuItem asChild disabled={action.disabled} variant={action.variant}>
                <Link
                  href={action.href}
                  className={`flex items-center gap-2 ${action.disabled ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={action.onClick}
                >
                  {action.icon && <action.icon className="w-4 h-4" />}
                  {action.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                variant={action.variant}
                onClick={() => !action.disabled && action.onClick(entity)}
                disabled={action.disabled}
                className={`${action.disabled ? "opacity-50 pointer-events-none" : ""} flex items-center gap-2`}
              >
                {action.icon && <action.icon className="w-4 h-4" />}
                {action.label}
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsButton;
