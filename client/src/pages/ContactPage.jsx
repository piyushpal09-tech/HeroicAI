import { useState } from 'react'
import emailjs from '@emailjs/browser'
import PageShell from '@/components/layout/PageShell.jsx'
import SEO from '@/components/layout/SEO.jsx'
import GlassCard from '@/components/ui/GlassCard.jsx'
import Input from '@/components/ui/Input.jsx'
import Textarea from '@/components/ui/Textarea.jsx'
import GlowButton from '@/components/ui/GlowButton.jsx'
import Badge from '@/components/ui/Badge.jsx'
import { contactCards } from '@/data/site.js'
import { useToast } from '@/hooks/useToast.js'

const initialState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContactPage = () => {
  const [formState, setFormState] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { showToast } = useToast()

  const setFieldValue = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formState.name.trim()) nextErrors.name = 'Your name is required.'
    if (!formState.email.trim()) nextErrors.email = 'Email is required.'
    if (!formState.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!formState.message.trim()) nextErrors.message = 'Tell us what you need help with.'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not configured yet.')
      }

      await emailjs.send(serviceId, templateId, formState, { publicKey })
      setSubmitted(true)
      setFormState(initialState)
      showToast({
        title: 'Message sent',
        description: 'Your message is on its way. We will get back to you soon.',
        variant: 'success',
      })
    } catch (error) {
      showToast({
        title: 'Unable to send message',
        description: error.message,
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageShell>
      <SEO
        title="Contact"
        description="Reach out to Piyush Pal for HeroicAI support, partnerships, and project discussions."
        path="/contact"
      />

      <section className="page-section pt-16">
        <div className="section-container space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">Contact</p>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">
              Let’s talk about your next AI build
            </h1>
            <p className="text-lg leading-8 text-muted">
              Reach out for support, product questions, partnership ideas, or full-stack AI delivery work.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              {contactCards.map((card) => (
                <GlassCard key={card.label} className="space-y-4">
                  <div className="inline-flex rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                    <card.icon />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-muted">{card.label}</p>
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-lg font-semibold text-foreground transition hover:text-primary"
                    >
                      {card.value}
                    </a>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <Badge variant="cyan">EmailJS Contact Form</Badge>
                  <h2 className="text-3xl font-semibold text-foreground">Send a message</h2>
                </div>
                {submitted ? <Badge variant="green">Delivered</Badge> : null}
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    id="name"
                    label="Name"
                    value={formState.name}
                    onChange={(event) => setFieldValue('name', event.target.value)}
                    error={errors.name}
                    placeholder="Your full name"
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    value={formState.email}
                    onChange={(event) => setFieldValue('email', event.target.value)}
                    error={errors.email}
                    placeholder="you@company.com"
                  />
                </div>
                <Input
                  id="subject"
                  label="Subject"
                  value={formState.subject}
                  onChange={(event) => setFieldValue('subject', event.target.value)}
                  error={errors.subject}
                  placeholder="How can HeroicAI help?"
                />
                <Textarea
                  id="message"
                  label="Message"
                  value={formState.message}
                  onChange={(event) => setFieldValue('message', event.target.value)}
                  error={errors.message}
                  placeholder="Share your project goals, blockers, timeline, or support needs."
                />

                <GlowButton type="submit" fullWidth disabled={submitting}>
                  {submitting ? 'Sending...' : submitted ? 'Message Sent' : 'Send Message'}
                </GlowButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default ContactPage
