type LeadPayload = {
  name?: string;
  phone?: string;
  telegram?: string;
  message?: string;
  preferredChannel?: string;
  website?: string;
  consent?: boolean;
  page?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const phone = clean(body.phone);
    const telegram = clean(body.telegram);

    if (clean(body.website)) {
      return Response.json({ ok: true, accepted: false });
    }

    if (!body.consent || (!phone && !telegram)) {
      return Response.json({ ok: false, error: "contact_required" }, { status: 400 });
    }

    const lead = {
      name: clean(body.name),
      phone,
      telegram,
      message: clean(body.message),
      preferredChannel: clean(body.preferredChannel) || "phone",
      page: clean(body.page),
      receivedAt: new Date().toISOString(),
      source: "mock-endpoint",
    };

    console.info("[mock-lead]", lead);

    return Response.json({ ok: true, accepted: true });
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
