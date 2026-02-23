"use client"

import { useEffect, useMemo, useState } from "react"

type InboxEvent = {
  id: string
  ts: number
  source: string
  type: string
  payload: unknown
}

function prettyJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

export default function InboxClient() {
  const [token, setToken] = useState("dev-token")
  const [source, setSource] = useState("lab-3")
  const [type, setType] = useState("ping")
  const [payloadText, setPayloadText] = useState(`{ "hello": "world" }`)

  const [items, setItems] = useState<InboxEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const payload = useMemo(() => {
    try {
      return JSON.parse(payloadText)
    } catch {
      return null
    }
  }, [payloadText])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/inbox?limit=50", { cache: "no-store" })
      if (!res.ok) throw new Error(`GET failed: ${res.status}`)
      const data = await res.json()
      setItems(data.items ?? [])
    } catch (e: any) {
      setError(e?.message ?? "Failed to load inbox")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function sendEvent() {
    setBusy(true)
    setError(null)
    try {
      if (payload === null) throw new Error("Payload is not valid JSON")

      const res = await fetch("/api/inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-inbox-token": token,
        },
        body: JSON.stringify({ source, type, payload }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? `POST failed: ${res.status}`)
      }

      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to send event")
    } finally {
      setBusy(false)
    }
  }

  async function clear() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/inbox", {
        method: "DELETE",
        headers: { "x-inbox-token": token },
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? `DELETE failed: ${res.status}`)
      }

      await load()
    } catch (e: any) {
      setError(e?.message ?? "Failed to clear inbox")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Sender */}
      <section className="rounded-2xl border p-4">
        <h2 className="text-lg font-medium">Send event</h2>

        <label className="mt-4 block text-sm font-medium">Inbox token</label>
        <input
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="dev-token"
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">source</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">type</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>

        <label className="mt-4 block text-sm font-medium">payload (JSON)</label>
        <textarea
          className="mt-1 min-h-40 w-full rounded-xl border px-3 py-2 font-mono text-sm"
          value={payloadText}
          onChange={(e) => setPayloadText(e.target.value)}
        />

        <button
          className="mt-4 inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium disabled:opacity-50"
          onClick={sendEvent}
          disabled={busy}
        >
          {busy ? "Working..." : "POST /api/inbox"}
        </button>

        {error && (
          <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </section>

      {/* Viewer */}
      <section className="rounded-2xl border p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Inbox</h2>
          <div className="flex gap-2">
            <button
              className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
              onClick={load}
              disabled={busy}
            >
              Refresh
            </button>
            <button
              className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
              onClick={clear}
              disabled={busy}
            >
              Clear
            </button>
          </div>
        </div>

        {loading ? (
          <p className="mt-4 text-sm opacity-70">Loading…</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm opacity-70">Empty. Go send something.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((e) => (
              <li key={e.id} className="rounded-2xl bg-black/5 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">
                    {e.source} · <span className="opacity-80">{e.type}</span>
                  </div>
                  <div className="text-xs opacity-60">
                    {new Date(e.ts).toLocaleString()}
                  </div>
                </div>
                <pre className="mt-2 overflow-auto rounded-xl bg-white/60 p-2 text-xs">
                  {prettyJson(e.payload)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}