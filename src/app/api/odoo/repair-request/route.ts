import { NextRequest, NextResponse } from "next/server";
import { odooSystemCall } from "@/server/odoo/client";
import { checkRateLimit } from "@/server/security/rate-limit";

interface RepairRequestPayload {
  contactName?: string;
  email?: string;
  phone?: string;
  vehicleBrand?: string;
  vehicleModelName?: string;
  vehicleModelId?: number;
  serviceId?: number;
  numberPlate?: string;
  repairIssue?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "repair-request-submit", {
    limit: 10,
    windowMs: 5 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait before submitting again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSec),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  }

  try {
    const body = (await request.json()) as RepairRequestPayload;

    if (!body.contactName || !body.email || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    if (!body.vehicleModelId) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle model is required.",
        },
        { status: 400 }
      );
    }

    if (!body.numberPlate?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle number plate is required.",
        },
        { status: 400 }
      );
    }

    const normalizedNumberPlate = body.numberPlate.trim().toUpperCase();
    const leadName = `Request of ${body.contactName} [ ${normalizedNumberPlate} | ${body.vehicleBrand || "-"} / ${body.vehicleModelName || "-"} ]`;

    const leadValues = {
      contact_name: body.contactName,
      name: leadName,
      email_from: body.email,
      phone: body.phone,
      vehicle_number: normalizedNumberPlate,
      product_id: body.vehicleModelId,
      repair_issue: body.repairIssue || "",
      repair_reason: "Website Request",
      demage: `Brand: ${body.vehicleBrand || "-"}, Model: ${body.vehicleModelName || "-"}`,
      type: "lead",
    } as Record<string, unknown>;

    if (body.serviceId) {
      leadValues.service_id = body.serviceId;
    }

    const leadCreateResult = await odooSystemCall<number | number[]>("crm.lead", "create", {
      vals_list: [leadValues],
    });
    const leadId = Array.isArray(leadCreateResult)
      ? Number(leadCreateResult[0])
      : Number(leadCreateResult);

    if (!leadId) {
      throw new Error("Odoo did not return a lead ID.");
    }

    return NextResponse.json({
      success: true,
      message: "Repair request submitted successfully.",
      data: {
        leadId,
      },
      meta: {
        rateLimitRemaining: rateLimit.remaining,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit request";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
