"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export function HeroCta() {
  return (
    <DialogTrigger asChild>
      <Button
        type="button"
        className="mt-6.25 h-13.5 w-48 justify-between rounded-full bg-foreground pr-2 pl-5.5 text-lg text-background shadow-none hover:bg-[#dedede] hover:text-background min-[901px]:mt-8 min-[901px]:h-14.5"
      >
        Start now
        <span className="grid size-9 place-items-center rounded-full border border-black/25 min-[901px]:size-9.75">
          <ArrowUpRight aria-hidden="true" className="size-4.75" />
        </span>
      </Button>
    </DialogTrigger>
  );
}
