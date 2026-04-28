"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: String(formData.get("username") || "").trim(),
      password: String(formData.get("password") || "").trim(),
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      toast.error(data?.message || "Invalid credentials");
      return;
    }

    toast.success("Welcome back");
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="card-soft mx-auto mt-20 max-w-md space-y-4 border border-[#A5D6A7]/40 p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#1B5E20]">Admin Login</h1>
      <input name="username" required placeholder="Username" className="input-premium" />
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Password"
          className="input-premium pr-20"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#1B5E20] hover:text-[#144919]"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button disabled={loading} className="btn-primary inline-flex min-h-11 w-full items-center justify-center disabled:opacity-60">
        {loading ? <LoadingSpinner /> : "Login"}
      </button>
    </form>
  );
}
