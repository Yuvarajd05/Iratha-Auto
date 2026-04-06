import { NextRequest, NextResponse } from "next/server";
import { odooSystemCall } from "@/server/odoo/client";
import { checkRateLimit } from "@/server/security/rate-limit";

type OdooMany2One = [number, string] | false;

interface OdooVehicleModel {
  id: number;
  name: string;
  brand_id: OdooMany2One;
}

interface OdooService {
  id: number;
  name: string;
  is_active?: boolean;
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "repair-request-options", {
    limit: 60,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait before trying again.",
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
    const [vehicleModelsRaw, servicesRaw] = await Promise.all([
      odooSystemCall<OdooVehicleModel[]>("fleet.vehicle.model", "search_read", {
        domain: [],
        fields: ["id", "name", "brand_id"],
        order: "name asc",
      }),
      odooSystemCall<OdooService[]>("dev.machine.service", "search_read", {
        domain: [],
        fields: ["id", "name", "is_active"],
        order: "name asc",
      }),
    ]);

    const vehicleModels = vehicleModelsRaw.map((item) => {
      const brandId = Array.isArray(item.brand_id) ? item.brand_id[0] : null;
      const brandName = Array.isArray(item.brand_id) ? item.brand_id[1] : "";
      return {
        id: item.id,
        name: item.name,
        brandId,
        brandName,
        label: brandName ? `${brandName} / ${item.name}` : item.name,
      };
    });

    const services = servicesRaw.map((item) => ({
      id: item.id,
      name: item.name,
      isActive: item.is_active ?? true,
    }));

    return NextResponse.json({
      success: true,
      data: {
        vehicleModels,
        services,
      },
      meta: {
        rateLimitRemaining: rateLimit.remaining,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch form options";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
