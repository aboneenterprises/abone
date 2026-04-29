"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#1a3f1d",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          fontSize: "15px",
          padding: "14px 18px",
        },
      }}
    />
  );
}
