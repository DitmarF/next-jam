// src/lib/inbox/store.ts
export type InboxEvent = {
    id: string
    ts: number
    source: string
    type: string
    payload: unknown
  }
  
  declare global {
    // eslint-disable-next-line no-var
    var __INBOX_EVENTS__: InboxEvent[] | undefined
  }
  
  // Dev-friendly persistence across HMR
  const events = (globalThis.__INBOX_EVENTS__ ??= [])
  
  export function listEvents({ limit = 50 }: { limit?: number } = {}) {
    return events.slice(0, limit)
  }
  
  export function addEvent(evt: Omit<InboxEvent, "id" | "ts">) {
    const item: InboxEvent = {
      id: crypto.randomUUID(),
      ts: Date.now(),
      ...evt,
    }
    events.unshift(item)
    return item
  }
  
  export function clearEvents() {
    events.length = 0
  }