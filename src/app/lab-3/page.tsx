// src/app/lab-3/page.tsx
import InboxClient from "@/components/lab-3/inbox-client-ui"

export default function Lab3Page() {
  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Lab 3: Webhook Inbox</h1>
      <p className="mt-2 text-sm opacity-80">
        Send JSON events to <code className="rounded bg-black/5 px-1">/api/inbox</code> and inspect them.
      </p>

      <div className="mt-6">
        <InboxClient />
      </div>
    </main>
  )
}