import * as Sentry from "@sentry/react";

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/coworking-api-abys\.onrender\.com\/api/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
