"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Thanks. We will get back to you shortly.");
    event.currentTarget.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card-soft space-y-4 border border-[#A5D6A7]/40 p-6 md:p-8">
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-[#2d3b2f]">
          Full name
        </label>
        <input
          id="contact-name"
          required
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          className="input-premium"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-[#2d3b2f]">
          Email address
        </label>
        <input
          id="contact-email"
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="input-premium"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-[#2d3b2f]">
          Message
        </label>
      <textarea
        id="contact-message"
        required
        name="message"
        rows={4}
        placeholder="Your message (include your country or city in the EU / UK if asking about delivery)"
        className="input-premium"
      />
      </div>
      <button disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
