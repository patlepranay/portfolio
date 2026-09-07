import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ExternalLink, Loader2, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/deck/reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useToast } from "@/components/ui/use-toast";
import { contact, headings } from "@/data/constants";

const inputCls =
  "w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground outline-none backdrop-blur-sm transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground";

const Contact = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";

    if (!name.trim() || !message.trim() || !email.trim()) {
      toast({
        title: "You forgot to write something.",
        description: "Please fill out your name, email and message.",
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
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index={headings.contact.index} eyebrow={headings.contact.eyebrow} title={headings.contact.title} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info / socials */}
          <Reveal index={1} className="space-y-6">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              {contact.intro}
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-primary/50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="text-base text-foreground">{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                className="glass flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-primary/50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
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
                  className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-accent"
                >
                  {s.label}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal index={2}>
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="glass space-y-5 rounded-3xl p-6 sm:p-8"
            >
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
                className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-7 py-3.5 font-hud text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
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
