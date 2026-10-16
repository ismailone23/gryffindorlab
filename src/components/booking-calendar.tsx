"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const bookingUrl = "https://calendly.com/gryffindorlab-info/30min";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const zones = ["UTC", ...Intl.supportedValuesOf("timeZone")];

function localDay(time: string, zone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(time));
  const part = (type: string) =>
    parts.find((item) => item.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function monthOffset(month: string, offset: number) {
  const [year, number] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, number - 1 + offset, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function BookingCalendar() {
  const [month, setMonth] = useState("");
  const [timezone, setTimezone] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [today, setToday] = useState("");
  const [notation, setNotation] = useState<"12h" | "24h">("12h");
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chosenDay, setChosenDay] = useState("");
  const [chosenTime, setChosenTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const now = new Date().toISOString();
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const zone = zones.includes(detected) ? detected : "UTC";
      setToday(now);
      setTimezone(zone);
      setMonth(localDay(now, zone).slice(0, 7));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#book-a-call") return;
    // Next's initial hash restoration can run after hydration on narrow screens.
    const timer = window.setTimeout(
      () =>
        document
          .getElementById("book-a-call")
          ?.scrollIntoView({ behavior: "instant", block: "start" }),
      300,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!month) return;
    const controller = new AbortController();
    fetch(`/api/booking/availability?month=${month}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Availability could not be loaded.");
        return result.times as string[];
      })
      .then((available) => {
        setTimes(available);
        setLoading(false);
      })
      .catch((reason: Error) => {
        if (!controller.signal.aborted) {
          setTimes([]);
          setError(reason.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [month]);

  const byDay = useMemo(() => {
    const result = new Map<string, string[]>();
    if (!timezone) return result;
    for (const time of times) {
      const date = localDay(time, timezone);
      if (!date.startsWith(month)) continue;
      result.set(date, [...(result.get(date) || []), time]);
    }
    return result;
  }, [times, timezone, month]);
  const selectedDay = byDay.has(chosenDay)
    ? chosenDay
    : [...byDay.keys()].sort()[0] || "";
  const slots = byDay.get(selectedDay) || [];

  const [year, number] = month ? month.split("-").map(Number) : [0, 0];
  const first = month ? new Date(Date.UTC(year, number - 1, 1)) : new Date(0);
  const offset = first.getUTCDay();
  const dayCount = month ? new Date(Date.UTC(year, number, 0)).getUTCDate() : 0;
  const cells = Math.ceil((offset + dayCount) / 7) * 7;
  const currentMonth =
    timezone && today ? localDay(today, timezone).slice(0, 7) : "";
  const canAdvance =
    month &&
    today &&
    new Date(`${monthOffset(month, 1)}-01T00:00:00Z`).getTime() <=
      new Date(today).getTime() + 90 * 86400000;

  function changeMonth(next: string) {
    setMonth(next);
    setTimes([]);
    setLoading(true);
    setError("");
    setChosenDay("");
    setChosenTime("");
    setBooked(false);
  }

  function chooseTime(time: string) {
    setChosenTime(time);
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!chosenTime || !timezone || sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime: chosenTime, timezone, name, email }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "This time could not be booked.");
      setConfirmationSent(result.confirmationSent === true);
      setBooked(true);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Booking failed. Please try Calendly directly.",
      );
    } finally {
      setSending(false);
    }
  }

  const timeLabel = (time: string) =>
    new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: notation === "12h",
    }).format(new Date(time));
  const dateLabel = selectedDay
    ? new Intl.DateTimeFormat("en", {
        timeZone: "UTC",
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date(`${selectedDay}T12:00:00Z`))
    : "Choose a date";

  return (
    <div className="overflow-hidden rounded-[5px] border border-white/20 bg-black text-(--paper) min-[901px]:grid min-[901px]:min-h-128 min-[901px]:grid-cols-[minmax(240px,27%)_minmax(340px,1fr)_minmax(225px,27%)]">
      <div className="border-b border-white/20 px-6 py-8 min-[901px]:border-r min-[901px]:border-b-0 min-[901px]:px-7 min-[901px]:py-8">
        <div className="flex items-center gap-3 text-sm text-[#c8c0d2]">
          <img
            src="/favicon.svg"
            width="36"
            height="36"
            alt=""
            className="size-9 rounded-[5px]"
          />
          Gryffindorlab
        </div>
        <h3 className="mt-8 font-(family-name:--display) text-[clamp(32px,3vw,40px)] leading-none font-semibold tracking-[-.04em]">
          Let’s talk.
        </h3>
        <p className="mt-4 max-w-58 text-base leading-relaxed text-[#c8c0d2]">
          Choose a time for a 30-minute conversation.
        </p>
        <div className="mt-8 grid gap-4 text-sm text-[#c8c0d2]">
          <p className="flex items-center gap-3">
            <Clock3
              aria-hidden="true"
              className="size-4 shrink-0 text-(--paper)"
            />
            30 minutes
          </p>
          <p className="flex items-start gap-3">
            <Video
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-(--paper)"
            />
            Web conferencing details provided on confirmation
          </p>
          <div className="mt-2 grid gap-2">
            <span
              id="booking-timezone-label"
              className="text-sm font-medium text-(--paper)"
            >
              Time zone
            </span>
            <Popover
              open={timezoneOpen}
              onOpenChange={(open) => {
                setTimezoneOpen(open);
                if (!open) setTimezoneSearch("");
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  role="combobox"
                  aria-expanded={timezoneOpen}
                  aria-labelledby="booking-timezone-label"
                  disabled={booked}
                  className="h-11 w-full justify-start rounded-[5px] border border-white/35 bg-[#111016] px-3 text-sm text-(--paper) hover:border-white/65 hover:bg-[#19151f] hover:text-(--paper) focus-visible:border-[#aa8bf7] focus-visible:ring-[#aa8bf7]/50"
                >
                  <Globe2
                    aria-hidden="true"
                    className="size-4 text-[#c8c0d2]"
                  />
                  <span className="min-w-0 flex-1 truncate text-left">
                    {timezone
                      ? timezone.replaceAll("_", " ")
                      : "Select a time zone"}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 text-[#c8c0d2]"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                collisionPadding={16}
                className="z-80 w-(--radix-popover-trigger-width) max-w-[calc(100vw-3rem)] rounded-[5px] border-white/30 bg-[#111016] p-0 text-(--paper) shadow-[0_16px_40px_#00000080]"
              >
                <Command className="bg-[#111016] text-(--paper)">
                  <CommandInput
                    aria-label="Search time zones"
                    placeholder="Search a city or time zone…"
                    value={timezoneSearch}
                    onValueChange={setTimezoneSearch}
                    autoFocus
                    className="text-(--paper)"
                  />
                  <CommandList className="[scrollbar-color:#62586d_#111016] scrollbar-thin">
                    <CommandEmpty>No matching time zones.</CommandEmpty>
                    <CommandGroup>
                      {zones.map((zone) => (
                        <CommandItem
                          key={zone}
                          value={zone}
                          onSelect={() => {
                            setTimezone(zone);
                            setChosenDay("");
                            setChosenTime("");
                            setTimezoneOpen(false);
                            setTimezoneSearch("");
                          }}
                        >
                          <span className="min-w-0 flex-1 truncate">
                            {zone.replaceAll("_", " ")}
                          </span>
                          {zone === timezone && (
                            <Check
                              aria-hidden="true"
                              className="size-4 shrink-0 text-[#aa8bf7]"
                            />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div
        id="book-a-call"
        className="min-w-0 border-b border-white/20 px-4 py-7 min-[901px]:border-r min-[901px]:border-b-0 min-[901px]:px-7 min-[901px]:py-9"
      >
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-lg font-semibold">
            {month
              ? new Intl.DateTimeFormat("en", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(first)
              : "Calendar"}
          </h4>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Previous month"
              disabled={!month || month <= currentMonth}
              onClick={() => changeMonth(monthOffset(month, -1))}
              className="text-(--paper) hover:bg-white/10 hover:text-(--paper)"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Next month"
              disabled={!canAdvance}
              onClick={() => changeMonth(monthOffset(month, 1))}
              className="text-(--paper) hover:bg-white/10 hover:text-(--paper)"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div
          className="mt-7 grid grid-cols-7 text-center text-xs font-semibold text-[#c8c0d2]"
          aria-hidden="true"
        >
          {weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div
          className="mt-3 grid grid-cols-7 gap-y-2"
          aria-label="Available dates"
        >
          {Array.from({ length: cells }, (_, index) => {
            const date = index - offset + 1;
            if (date < 1 || date > dayCount) return <span key={index} />;
            const key = `${month}-${String(date).padStart(2, "0")}`;
            const available = byDay.has(key);
            return (
              <Button
                key={key}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={new Intl.DateTimeFormat("en", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                }).format(new Date(Date.UTC(year, number - 1, date)))}
                aria-pressed={selectedDay === key}
                disabled={!available || loading || booked}
                onClick={() => {
                  setChosenDay(key);
                  setChosenTime("");
                  setError("");
                  if (window.innerWidth <= 900)
                    document
                      .getElementById("booking-times")
                      ?.scrollIntoView({ behavior: "instant", block: "start" });
                }}
                className={`mx-auto size-10 rounded-[5px] text-sm hover:bg-white/12 hover:text-(--paper) disabled:opacity-35 ${selectedDay === key ? "bg-(--paper) text-black hover:bg-(--paper) hover:text-black" : "text-(--paper)"}`}
              >
                {date}
              </Button>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-[#c8c0d2]" role="status">
          {loading
            ? "Checking live availability…"
            : error && !chosenTime
              ? error
              : !byDay.size
                ? "No available times this month."
                : "Choose a date and time that works for you."}
        </p>
        {error && !chosenTime && (
          <a
            className="mt-3 inline-block text-sm text-(--paper) underline underline-offset-4"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book directly on Calendly ↗
          </a>
        )}
        <noscript>
          <p className="mt-4 text-sm text-(--paper)">
            To see live times without JavaScript,{" "}
            <a className="underline" href={bookingUrl}>
              book directly on Calendly
            </a>
            .
          </p>
        </noscript>
      </div>

      <div
        id="booking-times"
        className="min-w-0 px-6 py-7 min-[901px]:px-7 min-[901px]:py-9"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-lg font-semibold">
            {booked ? (
              "Booked"
            ) : (
              <>
                <span className="min-[901px]:max-[1100px]:hidden">
                  {dateLabel}
                </span>
                <span className="hidden min-[901px]:max-[1100px]:inline">
                  {selectedDay ? dateLabel.split(", ")[1] : dateLabel}
                </span>
              </>
            )}
          </h4>
          <div
            className="flex rounded-[5px] border border-white/20 p-0.5"
            aria-label="Time format"
          >
            {(["12h", "24h"] as const).map((value) => (
              <Button
                key={value}
                type="button"
                variant="ghost"
                aria-pressed={notation === value}
                onClick={() => setNotation(value)}
                className={`h-7 rounded-[3px] px-2 text-xs hover:bg-white/10 hover:text-(--paper) ${notation === value ? "bg-white/15 text-(--paper)" : "text-[#c8c0d2]"}`}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        {booked ? (
          <p
            className="mt-8 text-sm leading-relaxed text-[#c8c0d2]"
            role="status"
          >
            Your call is booked for {dateLabel} at {timeLabel(chosenTime)} (
            {timezone}).{" "}
            {confirmationSent
              ? "We’ve sent a confirmation to your email."
              : "We couldn’t send an extra confirmation email; Calendly has your booking."}
          </p>
        ) : chosenTime ? (
          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setChosenTime("");
                setError("");
              }}
              className="w-fit px-0 text-sm text-[#c8c0d2] hover:bg-transparent hover:text-(--paper)"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to times
            </Button>
            <p className="text-sm">
              {timeLabel(chosenTime)} · {dateLabel} ·{" "}
              {timezone.replaceAll("_", " ")}
            </p>
            <label className="grid gap-2 text-sm">
              Your name
              <Input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm">
              Email address
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
            <Button
              type="submit"
              disabled={sending}
              className="mt-2 h-11 rounded-full bg-(--paper) text-(--ink) hover:bg-[#c8c0d2]"
            >
              {sending ? "Booking…" : "Confirm booking"}
            </Button>
          </form>
        ) : slots.length ? (
          <ScrollArea className="mt-6 h-80" type="auto">
            <div className="grid gap-2 pr-3 pb-1">
              {slots.map((time) => (
                <Button
                  type="button"
                  key={time}
                  variant="ghost"
                  onClick={() => chooseTime(time)}
                  className="h-10 w-full rounded-[5px] border border-white/25 bg-transparent text-sm text-(--paper) hover:border-[#aa8bf7] hover:bg-[#6845d6]/15 hover:text-(--paper) focus-visible:border-[#aa8bf7] focus-visible:ring-[#aa8bf7]/50"
                >
                  {timeLabel(time)}
                </Button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          !loading && (
            <p className="mt-6 text-sm text-[#c8c0d2]">
              {error
                ? "Use the Calendly link below to book directly."
                : "No times to show for this date."}
            </p>
          )
        )}
        {error && chosenTime && (
          <p role="alert" className="mt-4 text-sm text-[#f3b4c0]">
            {error}{" "}
            <a
              className="underline"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on Calendly ↗
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
