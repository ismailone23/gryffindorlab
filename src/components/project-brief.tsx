import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/services";

export function ProjectBrief({ dark = false }: { dark?: boolean }) {
  const submitButton = useRef<HTMLButtonElement>(null);
  const openingTrigger = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "limited"
  >("idle");

  useEffect(() => {
    if (status !== "sent" && status !== "error" && status !== "limited") return;
    const frame = requestAnimationFrame(() => {
      submitButton.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [status]);

  async function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("service"),
          idea: data.get("idea"),
          website: data.get("website"),
        }),
      });
      if (response.status === 429) {
        setStatus("limited");
        return;
      }
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <DialogContent
      data-surface={dark ? "dark" : "light"}
      onOpenAutoFocus={() => {
        openingTrigger.current = document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      }}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        openingTrigger.current?.focus({ preventScroll: true });
      }}
      className="project-brief max-h-[calc(100dvh-36px)] max-w-140 gap-4 overflow-y-auto rounded-xl border-0 bg-background p-[28px_23px] shadow-[0_24px_80px_#00000030] max-[390px]:p-[28px_23px] min-[391px]:p-9.5 sm:max-w-140 **:data-[slot=dialog-close]:top-3 **:data-[slot=dialog-close]:right-3 **:data-[slot=dialog-close]:grid **:data-[slot=dialog-close]:size-10 **:data-[slot=dialog-close]:place-items-center"
    >
      <DialogHeader className="text-left">
        <DialogTitle className="font-(family-name:--display) text-[36px] leading-none font-semibold tracking-[-0.04em] min-[391px]:text-[42px]">
          Let’s make
          <br />
          something good.
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm leading-[1.6] text-muted-foreground">
          A few details to get your idea moving.
        </DialogDescription>
      </DialogHeader>
      <form
        className="mt-2.5 grid gap-5 [&_label]:flex [&_label]:flex-col [&_label]:gap-2 [&_label]:text-sm [&_label]:font-semibold [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-[5px] [&_input]:border [&_input]:border-[#565656] [&_input]:bg-transparent [&_input]:p-3 [&_input]:text-[15px] [&_input]:font-normal [&_input]:outline-offset-[3px] [&_input]:placeholder:text-[#b0b0b0] [&_textarea]:min-h-22.5 [&_textarea]:max-h-55 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[5px] [&_textarea]:border [&_textarea]:border-[#565656] [&_textarea]:bg-transparent [&_textarea]:p-3 [&_textarea]:text-[15px] [&_textarea]:font-normal [&_textarea]:outline-offset-[3px] [&_textarea]:placeholder:text-[#b0b0b0] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-(--ink) [&_textarea:focus-visible]:outline-2 [&_textarea:focus-visible]:outline-(--ink)"
        onSubmit={sendBrief}
        onChange={() => {
          if (status === "error" || status === "limited") setStatus("idle");
        }}
        aria-busy={status === "sending"}
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="project-website">Leave this field empty</label>
          <input
            id="project-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="grid grid-cols-1 gap-4.25 min-[391px]:grid-cols-2">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="Alex Smith"
              required
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@company.com"
              required
              maxLength={254}
            />
          </label>
        </div>
        <div className="grid gap-2">
          <label htmlFor="project-service" className="text-sm font-semibold">
            What can we help with?
          </label>
          <Select
            name="service"
            defaultValue="A bit of everything"
            onValueChange={() => {
              if (status === "error" || status === "limited") setStatus("idle");
            }}
          >
            <SelectTrigger
              id="project-service"
              className="h-12! w-full! rounded-[5px] border-[#565656] bg-transparent px-3 text-[15px] font-normal text-foreground shadow-none dark:bg-transparent! dark:hover:bg-transparent! focus-visible:ring-(--ink)/40"
            >
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              data-surface={dark ? "dark" : "light"}
              className="project-brief-options z-80 rounded-md border-[#565656] bg-background text-foreground shadow-[0_12px_36px_#00000022]"
            >
              <SelectItem
                value="A bit of everything"
                className="py-2.5 text-[15px]"
              >
                A bit of everything
              </SelectItem>
              {services.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.name}
                  className="py-2.5 text-[15px]"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <label>
          A little about your idea
          <textarea
            name="idea"
            rows={3}
            placeholder="The big idea, the small details, and what you have in mind…"
            required
            minLength={10}
            maxLength={2500}
          />
        </label>
        <p
          className="m-0 text-center text-sm leading-relaxed font-medium text-foreground empty:hidden"
          role={status === "error" || status === "limited" ? "alert" : "status"}
          aria-live={status === "error" || status === "limited" ? "assertive" : "polite"}
        >
          {status === "sent" ? (
            "Thanks — your idea has been sent to Gryffindorlab."
          ) : status === "limited" ? (
            <>
              Too many requests. Please try later or email{" "}
              <a className="underline underline-offset-2" href="mailto:info@gryffindorlab.com">
                info@gryffindorlab.com
              </a>
              .
            </>
          ) : status === "error" ? (
            <>
              We couldn’t send your idea. Please try again or email{" "}
              <a className="underline underline-offset-2" href="mailto:info@gryffindorlab.com">
                info@gryffindorlab.com
              </a>
              .
            </>
          ) : status === "sending" ? (
            "Sending your idea securely…"
          ) : null}
        </p>
        <Button
          ref={submitButton}
          type="submit"
          disabled={status === "sending"}
          className="h-12 w-full justify-center gap-2 rounded-full bg-foreground px-5 text-[15px] text-background hover:bg-(--brief-button-hover)"
        >
          Send your idea
          <ArrowUpRight aria-hidden="true" />
        </Button>
      </form>
    </DialogContent>
  );
}
