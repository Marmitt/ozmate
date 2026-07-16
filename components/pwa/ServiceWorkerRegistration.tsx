"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline shell is a progressive enhancement — registration
        // failures (unsupported browser, blocked) must not break the app.
      });
    }
  }, []);

  return null;
}
