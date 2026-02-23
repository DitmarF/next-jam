import { addEvent, clearEvents, listEvents } from "@/lib/inbox/store"

function getToken(req: Request) {
  return req.headers.get("x-inbox-token") ?? ""
}

function requireToken(req: Request) {
  const expected = process.env.INBOX_TOKEN ?? "dev-token"
  return getToken(req) === expected
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const limit = Number(url.searchParams.get("limit") ?? "50")

  const items = listEvents({ limit: Number.isFinite(limit) ? limit : 50 })
  return Response.json({ ok: true, items })
}

export async function POST(request: Request) {
  if (!requireToken(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const source = typeof body?.source === "string" ? body.source : ""
  const type = typeof body?.type === "string" ? body.type : ""
  const payload = body?.payload

  if (!source || !type) {
    return Response.json(
      { ok: false, error: "source and type are required" },
      { status: 400 }
    )
  }

  const item = addEvent({ source, type, payload })
  return Response.json({ ok: true, item }, { status: 201 })
}

export async function DELETE(request: Request) {
  if (!requireToken(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  clearEvents()
  return Response.json({ ok: true })
}
