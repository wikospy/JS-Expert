import { lazy, Suspense } from "react";

// lazy delays loading this module until the route needs it.
const Settings = lazy(() => import("./Settings.jsx"));

export function SettingsRoute() {
  // Suspense displays fallback while the lazy module Promise is pending.
  return <Suspense fallback={<p>Loading settings...</p>}>
    <Settings />
  </Suspense>;
}

/*
 * Code splitting reduces initial JavaScript. Error boundaries catch render
 * failures and should provide recovery. Portals render overlays elsewhere in
 * the DOM while preserving React event/context relationships.
 * Challenge: add a retryable error boundary and a modal portal.
 */
