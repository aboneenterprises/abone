"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#fff",
          color: "#1B5E20",
        },
      }}
    />
  );
}
