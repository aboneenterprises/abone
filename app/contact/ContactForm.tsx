"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Thanks! We will get back to you shortly.");
    event.currentTarget.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card-soft space-y-4 border border-[#A5D6A7]/40 p-6 md:p-8">
      <input required name="name" placeholder="Your Name" className="input-premium" />
      <input required name="email" type="email" placeholder="Your Email" className="input-premium" />
      <textarea required name="message" rows={4} placeholder="Your Message" className="input-premium" />
      <button disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
