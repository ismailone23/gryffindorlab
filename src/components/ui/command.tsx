"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cn("flex w-full flex-col overflow-hidden rounded-md", className)} {...props} />
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-10 items-center gap-2 border-b px-3">
      <Search aria-hidden="true" className="size-4 shrink-0 opacity-70" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn("h-10 w-full bg-transparent text-sm outline-none placeholder:text-[#c2c2c2]", className)}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-64 overflow-x-hidden overflow-y-auto", className)} {...props} />
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot="command-group" className={cn("p-1", className)} {...props} />
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn("flex min-h-9 cursor-default items-center rounded-[3px] px-2 text-sm outline-none data-[selected=true]:bg-[#2b2b2b] data-[selected=true]:text-(--paper)", className)}
      {...props}
    />
  )
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }
