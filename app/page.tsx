'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Menu, X } from 'lucide-react'

const services = [
  { number: '01', title: 'Male companionship & casual dating', text: 'Meet a thoughtful male companion for a casual date, dinner, coffee, conversation, or a relaxed outing in Bhopal. Every introduction begins with a clear conversation about preferences, pace, and respectful boundaries.' },
  { number: '02', title: 'Party & event companionship', text: 'Enjoy a polished male party companion for celebrations, receptions, weddings, conferences, and private events. We plan around your occasion so you can feel composed, supported, and at ease.' },
  { number: '03', title: 'Professional massage & wellness', text: 'A calm, professional, non-sexual massage and wellness experience designed around relaxation and restorative touch. We discuss comfort, pressure, accessibility, and the setting before every appointment.' },
]

const faqs = [
  ['What is a Companios booking?', 'A Companios booking is a private, time-bound service arranged around conversation, company, social support, or wellness. We focus on respectful, clearly scoped experiences and confirm the details before anything is scheduled.'],
  ['How does the booking process work?', 'Start with a confidential enquiry. We learn what you are looking for, answer practical questions, confirm availability, and share the next steps. Clear communication is part of the service, so there are no surprises.'],
  ['Do you offer event companionship?', 'Yes. Event companionship can include a dinner, reception, wedding, cultural event, conference, or another social occasion. Tell us the date, setting, dress expectations, and the kind of presence that would make the experience easier.'],
  ['Is the service discreet?', 'Discretion is central to how we work. We keep communication private, avoid unnecessary personal details, and treat every enquiry with professionalism. We do not publish client information or imply endorsements without permission.'],
  ['What are your boundaries and standards?', 'All bookings are consensual, respectful, and agreed in advance. We do not provide illegal services, coercive arrangements, or anything outside the agreed scope. Either person may pause or end an interaction if a boundary is not respected.'],
  ['Can you accommodate accessibility needs?', 'Please share accessibility, sensory, mobility, dietary, or communication needs early in the conversation. We will explain what can be accommodated and help plan a setting that feels comfortable and practical.'],
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry.')
      setSubmitted(true)
      form.reset()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to send your enquiry.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Companios home">companios<span>.</span></a>
        <nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#approach" onClick={() => setMobileOpen(false)}>Our approach</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          <a href="#contact" className="nav-cta" onClick={() => setMobileOpen(false)}>Start a conversation <ArrowUpRight aria-hidden="true" /></a>
        </nav>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Private companionship & wellness</p>
          <h1>Good company,<br /><em>beautifully considered.</em></h1>
          <p className="hero-intro">Companios provides male companions in Bhopal for casual dating, dinners, parties, social outings, and professional non-sexual massages. Every experience is arranged with discretion, clear communication, and respect.</p>
          <a className="text-link" href="#contact">Make an enquiry <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="hero-image-wrap">
          <img src="/companios-hero.png" alt="A quiet, warmly lit lounge prepared for a private conversation" className="hero-image" />
          <p className="image-note">A considered experience<br />starts with a conversation.</p>
        </div>
      </section>

      <section className="statement section-pad" aria-labelledby="statement-title">
        <p className="eyebrow">A different kind of service</p>
        <h2 id="statement-title">The details matter.<br /><em>So does how you feel.</em></h2>
        <div className="statement-body"><p>There are moments when you want company without performance. Someone who knows how to listen, how to move through a room, and how to make a plan feel effortless. Companios is built around that simple idea: attentive company, arranged with care.</p><p>Our service is personal without being intrusive. We take the time to understand the occasion, the atmosphere, and what would make it feel right for you. Then we handle the details with discretion, clarity, and respect.</p></div>
      </section>

      <section className="services section-pad" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">Ways to spend time together</p><h2 id="services-title">Find your<br /><em>right kind of company.</em></h2></div><p className="section-lede">Every booking is shaped around the person, place, and purpose. Explore our core services, then tell us what you have in mind.</p></div>
        <div className="service-list">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Enquire about ${service.title}`}>Enquire <ArrowUpRight aria-hidden="true" /></a></div></article>)}</div>
      </section>

      <section className="approach section-pad" id="approach" aria-labelledby="approach-title">
        <div className="approach-label"><p className="eyebrow">Our approach</p><span>01—03</span></div>
        <div className="approach-content"><h2 id="approach-title">Warmth, without<br /><em>the guesswork.</em></h2><p>Professional companionship should feel easy to arrange and easy to understand. We make room for the questions people sometimes hesitate to ask: what happens first, what should I wear, how private is the conversation, and what if my plans change?</p><p>We answer plainly. Your enquiry is handled confidentially, the scope of every booking is agreed in advance, and your comfort remains the measure throughout.</p><div className="principles"><div><Check aria-hidden="true" /><span>Clear communication</span></div><div><Check aria-hidden="true" /><span>Respectful boundaries</span></div><div><Check aria-hidden="true" /><span>Thoughtful discretion</span></div></div></div>
      </section>

      <section className="guide section-pad" aria-labelledby="guide-title"><div className="guide-inner"><p className="eyebrow">Before you enquire</p><h2 id="guide-title">A little context helps<br /><em>us make it personal.</em></h2><div className="guide-grid"><p>When you reach out, you can share as much or as little as feels comfortable. Helpful details might include the date, location, occasion, preferred pace, and whether you are looking for conversation, social support, a wellness appointment, or simply a calm presence.</p><p>You do not need to have the perfect words. A short message is enough to begin. We will ask only what is relevant to arranging a safe, comfortable, and well-matched experience.</p></div><a className="button-link" href="#contact">Start with a private enquiry <ArrowUpRight aria-hidden="true" /></a></div></section>

      <section className="faq section-pad" id="faq" aria-labelledby="faq-title"><div className="section-heading"><div><p className="eyebrow">Questions, answered plainly</p><h2 id="faq-title">Before we<br /><em>meet.</em></h2></div><p className="section-lede">We believe clarity creates comfort. If you do not see your question here, send it through privately and we will respond with the information you need.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><p className="eyebrow">A private first step</p><h2 id="contact-title">Tell us what<br /><em>you have in mind.</em></h2><p>Looking for a male companion for casual dating, a party or event, or a professional non-sexual massage in Bhopal? Contact us easily by email or use the private enquiry form.</p><a className="contact-email" href="mailto:hello.bookaman@gmail.com">hello.bookaman@gmail.com <ArrowUpRight aria-hidden="true" /></a><p className="contact-small">We aim to respond within one business day.<br />Your details are treated confidentially.</p></div><form className="contact-form" onSubmit={handleSubmit} aria-label="Private enquiry form">{submitted ? <div className="success-message"><Check aria-hidden="true" /><h3>Thank you for reaching out.</h3><p>Your enquiry has been sent. We will be in touch with next steps.</p></div> : <><label>Name<input required name="name" autoComplete="name" maxLength={120} placeholder="Your name" /></label><label>Email<input required type="email" name="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><label>What can we help with?<textarea required name="message" rows={4} maxLength={4000} placeholder="A date, an occasion, or simply a little more about what you are looking for..." /></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="button-link" type="submit" disabled={sending}>{sending ? 'Sending enquiry...' : 'Send private enquiry'} {!sending && <ArrowUpRight aria-hidden="true" />}</button></>}</form></section>

      <footer className="site-footer"><a className="wordmark" href="#top">companios<span>.</span></a><p>Male dating, party companionship, and professional massage in Bhopal.<br /><a href="mailto:hello.bookaman@gmail.com">hello.bookaman@gmail.com</a></p><div><a href="#services">Services</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Companios. All rights reserved.</small></footer>
    </main>
  )
}

