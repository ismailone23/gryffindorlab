import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { services } from '@/lib/services'

export function ProjectBrief() {
  const [saved, setSaved] = useState(false)
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const brief = [
      'A new idea for Gryffindorlab',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service')}`,
      '',
      'The idea:',
      String(data.get('idea')),
    ].join('\n')

    if (contactEmail) {
      window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent('Let’s make something good — ' + data.get('name'))}&body=${encodeURIComponent(brief)}`
      return
    }

    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'gryffindorlab-project-brief.txt'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setSaved(true)
  }

  return (
    <DialogContent className="max-h-[calc(100dvh-36px)] max-w-[560px] gap-4 overflow-y-auto rounded-xl border-0 bg-background p-[28px_23px] shadow-[0_24px_80px_#20152e30] max-[390px]:p-[28px_23px] min-[391px]:p-[38px] sm:max-w-[560px] [&_[data-slot=dialog-close]]:top-3 [&_[data-slot=dialog-close]]:right-3 [&_[data-slot=dialog-close]]:grid [&_[data-slot=dialog-close]]:size-10 [&_[data-slot=dialog-close]]:place-items-center">
      <DialogHeader className="text-left">
        <DialogTitle className="font-[family-name:var(--display)] text-[36px] leading-none font-semibold tracking-[-0.04em] min-[391px]:text-[42px]">Let’s make<br />something good.</DialogTitle>
        <DialogDescription className="mt-2 text-sm leading-[1.6] text-[var(--muted)]">A few details to get your idea moving.</DialogDescription>
      </DialogHeader>
      <form className="mt-2.5 grid gap-5 [&_label]:flex [&_label]:flex-col [&_label]:gap-2 [&_label]:text-sm [&_label]:font-semibold [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-[5px] [&_input]:border [&_input]:border-[#bdb4c7] [&_input]:bg-transparent [&_input]:p-3 [&_input]:text-[15px] [&_input]:font-normal [&_input]:outline-offset-[3px] [&_input]:placeholder:text-[#746b7d] [&_textarea]:min-h-[90px] [&_textarea]:max-h-[220px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[5px] [&_textarea]:border [&_textarea]:border-[#bdb4c7] [&_textarea]:bg-transparent [&_textarea]:p-3 [&_textarea]:text-[15px] [&_textarea]:font-normal [&_textarea]:outline-offset-[3px] [&_textarea]:placeholder:text-[#746b7d] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-[var(--violet)] [&_textarea:focus-visible]:outline-2 [&_textarea:focus-visible]:outline-[var(--violet)]" onSubmit={prepareBrief} onChange={() => setSaved(false)}>
        <div className="grid grid-cols-1 gap-[17px] min-[391px]:grid-cols-2">
          <label>Your name<input name="name" autoComplete="name" placeholder="Alex Smith" required maxLength={100} /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label>
        </div>
        <div className="grid gap-2">
          <label htmlFor="project-service" className="text-sm font-semibold">What can we help with?</label>
          <Select name="service" defaultValue="A bit of everything" onValueChange={() => setSaved(false)}>
            <SelectTrigger id="project-service" className="h-12! w-full! rounded-[5px] border-[#bdb4c7] bg-transparent px-3 text-[15px] font-normal text-foreground shadow-none dark:bg-transparent! dark:hover:bg-transparent! focus-visible:ring-[var(--violet)]/40">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[60] rounded-md border-[#bdb4c7] bg-background text-foreground shadow-[0_12px_36px_#20152e22]">
              <SelectItem value="A bit of everything" className="py-2.5 text-[15px]">A bit of everything</SelectItem>
              {services.map((item) => <SelectItem key={item.id} value={item.name} className="py-2.5 text-[15px]">{item.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <label>A little about your idea<textarea name="idea" rows={3} placeholder="The big idea, the small details, and what you have in mind…" required maxLength={2500} /></label>
        <Button type="submit" className="h-12 w-full justify-between rounded-full bg-foreground px-5 text-[15px] text-background hover:bg-[var(--violet)]">
          {contactEmail ? <>Prepare email <ArrowUpRight aria-hidden="true" /></> : saved ? <>Brief downloaded <Check aria-hidden="true" /></> : <>Download project brief <Download aria-hidden="true" /></>}
        </Button>
        <p className="-mt-2 mb-0 text-xs leading-[1.6] text-[var(--muted)]" role="status">{contactEmail ? 'Opens your email app with your brief ready to send.' : saved ? 'Your brief is saved to your device. Nothing has been sent.' : 'Save your thoughts as a brief. Downloads to your device; nothing is sent.'}</p>
      </form>
    </DialogContent>
  )
}
