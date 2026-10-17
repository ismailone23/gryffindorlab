import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-11 w-full min-w-0 rounded-[5px] border border-white/30 bg-transparent px-3 text-sm text-(--paper) outline-none placeholder:text-[#b0b0b0] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-(--orange)/40 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
