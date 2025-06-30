import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CustomInput({ label, value, onChange, error, description, placeholder, className, type }) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-3 ${className}`}>
      {label && <Label htmlFor="nombre">{label}</Label>}
      <Input
        id="nombre"
        name="nombre"
        value={value}
        type={type??'text'}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <small className="text-red-500">{error}</small>}
      {description && <p className="text-sm text-muted-foreground">
        {description}
      </p>}
    </div>
  );
}
