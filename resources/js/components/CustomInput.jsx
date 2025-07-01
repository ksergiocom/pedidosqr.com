import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CustomInput({ label, error, description, className, ...rest }) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-3 ${className}`}>
      {label && <Label htmlFor={rest.id || "nombre"}>{label}</Label>}
      <Input
        {...rest} // Aquí van todas las props como value, onChange, placeholder, type, onClick, etc
      />
      {error && <small className="text-red-500">{error}</small>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
