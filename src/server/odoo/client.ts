interface OdooConfig {
  baseUrl: string;
  db: string;
  apiKey: string;
}

function getOdooConfig(): OdooConfig {
  const baseUrl =
    process.env.ODOO_BASE_URL || process.env.NEXT_PUBLIC_ODOO_BASE_URL || "";
  const db = process.env.ODOO_DB_NAME || "";
  const apiKey =
    process.env.ODOO_SERVICE_API_KEY || process.env.ODOO_API_KEY || "";

  if (!baseUrl || !db || !apiKey) {
    throw new Error(
      "Missing Odoo config. Required: ODOO_BASE_URL, ODOO_DB_NAME, and ODOO_SERVICE_API_KEY (or ODOO_API_KEY)."
    );
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    db,
    apiKey,
  };
}

export async function odooSystemCall<T = unknown>(
  model: string,
  method: string,
  kwargs: Record<string, unknown> = {}
): Promise<T> {
  const config = getOdooConfig();
  const endpoint = `${config.baseUrl}/json/2/${model}/${method}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
      "X-Odoo-Database": config.db,
    },
    body: JSON.stringify(kwargs),
    cache: "no-store",
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Odoo ${model}.${method} failed: ${response.status} ${text}`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    // Some Odoo methods may return primitive text responses.
    return text as T;
  }
}
