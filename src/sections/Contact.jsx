import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ExternalLink, Heart, Loader2, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Seo } from "@/components/seo/Seo";
import { useToast } from "@/components/ui/use-toast";
import { contact, headings, footer, lastUpdated } from "@/data/constants";

const inputCls =
  "w-full border border-border bg-background/50 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground outline-none backdrop-blur-sm transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground";

const Contact = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);

    // Honeypot: real users never see this field, so any value = a bot. Drop
    // it silently (no error) so scrapers think the submit worked.
    if (data.get("_gotcha")) return;

    const name = (data.get("name") || "").trim();
    const email = (data.get("email") || "").trim();
    const message = (data.get("message") || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !message) {
      toast({
        title: "You forgot to write something.",
        description: "Please fill out your name and message.",
      });
      return;
    }
    if (!email || !emailOk) {
      toast({
        title: "That email doesn't look right.",
        description: "Please double-check your email address.",
      });
      return;
    }
    if (message.length > 5000) {
      toast({
        title: "Message is a little long.",
        description: "Please keep your message under 5,000 characters.",
      });
      return;
    }

    setLoading(true);
    try {
      emailjs
        .send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          { from_name: name, from_email: email, message },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setLoading(false);
            toast({
              title: "Thanks for reaching out.",
              description: "I'll get back to you as soon as possible.",
            });
            form.current?.reset();
          },
          () => {
            setLoading(false);
            toast({
              title: "Something went wrong",
              description: "Please try again later.",
            });
          }
        );
    } catch {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="pg-contact relative overflow-hidden py-24 font-body sm:py-28">
      <Seo id="contact" />
      {/* ambient hue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[44vh] w-[40vw] rounded-full opacity-70 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(var(--pg-hue) / 0.2), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index={headings.contact.index} eyebrow={headings.contact.eyebrow} title={headings.contact.title} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info / socials */}
          <Reveal index={1} className="space-y-6">
            <p className="max-w-md text-lg font-body leading-relaxed text-muted-foreground">
              {contact.intro}
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="glass flex items-center gap-3 p-4 transition-colors hover:border-primary/50"
              >
                <span className="grid h-10 w-10 place-items-center bg-primary/15 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-base text-foreground">{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                className="glass flex items-center gap-3 p-4 transition-colors hover:border-primary/50"
              >
                <span className="grid h-10 w-10 place-items-center bg-primary/15 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-base text-foreground">{contact.phone}</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center border border-foreground/40 px-6 py-3 font-hud text-sm uppercase tracking-widest text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {s.label}
                  <ExternalLink className="h-3.5 w-3.5 ml-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>

            {/* Sign-off meta, folded into the info column so it never reaches the bottom pill */}
            <div className="mt-8 border-t border-border/40 pt-5">
              <p className="flex flex-wrap items-center gap-1.5 font-hud text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="text-foreground">{footer.marker}</span>
                © {new Date().getFullYear()} · {footer.builtWith}{" "}
                <Heart className="inline h-3 w-3 text-foreground" fill="currentColor" /> {footer.by}{" "}
                <span className="text-foreground">{footer.name}</span>
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-hud text-[11px] uppercase tracking-widest text-muted-foreground">
                <a
                  href={footer.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {footer.source}
                </a>
                <span>
                  {footer.updatedLabel} · {lastUpdated}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal index={2}>
            <form
              ref={form}
              onSubmit={handleSubmit}
              noValidate
              className="glass space-y-5 p-6 sm:p-8"
            >
              {/* Honeypot — hidden from humans, attracts bots. */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-hud text-xs uppercase tracking-widest text-foreground">
                    {contact.form.nameLabel}
                  </span>
                  <input name="name" type="text" placeholder={contact.form.namePlaceholder} className={inputCls} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-hud text-xs uppercase tracking-widest text-foreground">
                    {contact.form.emailLabel}
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder={contact.form.emailPlaceholder}
                    className={inputCls}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-hud text-xs uppercase tracking-widest text-foreground">
                  {contact.form.messageLabel}
                </span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder={contact.form.messagePlaceholder}
                  className={`${inputCls} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-7 py-3.5 font-hud text-sm uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? contact.form.sending : contact.form.submit}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
