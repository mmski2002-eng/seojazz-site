from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone

app = FastAPI(title="SEO Jazz backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LeadPayload(BaseModel):
    name: Optional[str] = ""
    phone: Optional[str] = ""
    telegram: Optional[str] = ""
    message: Optional[str] = ""
    preferredChannel: Optional[str] = "phone"
    website: Optional[str] = ""
    consent: Optional[bool] = False
    page: Optional[str] = ""


def _clean(value):
    if not isinstance(value, str):
        return ""
    return value.strip()[:500]


@app.get("/api/")
def root():
    return {"ok": True, "service": "seojazz"}


@app.post("/api/leads")
async def leads(payload: LeadPayload):
    phone = _clean(payload.phone)
    telegram = _clean(payload.telegram)
    if _clean(payload.website):
        return {"ok": True, "accepted": False}
    if not payload.consent or (not phone and not telegram):
        return {"ok": False, "error": "contact_required"}
    lead = {
        "name": _clean(payload.name),
        "phone": phone,
        "telegram": telegram,
        "message": _clean(payload.message),
        "preferredChannel": _clean(payload.preferredChannel) or "phone",
        "page": _clean(payload.page),
        "receivedAt": datetime.now(timezone.utc).isoformat(),
        "source": "backend-mock",
    }
    print("[mock-lead]", lead)
    return {"ok": True, "accepted": True}
