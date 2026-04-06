/**
 * Odoo RPC Client Utility for Iratha Auto
 *
 * This module provides a helper function to communicate with Odoo backend
 * using JSON-RPC 2.0 protocol. It handles session cookie management
 * for maintaining authentication state.
 */

interface JsonRpcRequest {
  jsonrpc: "2.0";
  method: string;
  params: Record<string, unknown>;
  id: number;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: number;
}

interface CallOdooOptions {
  /**
   * Odoo endpoint path (e.g., '/web/session/authenticate')
   */
  endpoint: string;
  /**
   * Parameters to send to Odoo
   */
  params: Record<string, unknown>;
  /**
   * Optional session cookie value for authenticated requests
   */
  sessionId?: string;
}

interface CallOdooResult {
  /**
   * Response data from Odoo
   */
  result: unknown;
  /**
   * Session ID cookie value (if returned by Odoo)
   */
  sessionId?: string;
}

/**
 * Calls an Odoo endpoint using JSON-RPC 2.0 protocol
 *
 * @param options - Configuration object with endpoint, params, and optional sessionId
 * @returns Promise with result and optional sessionId
 * @throws Error if the request fails or Odoo returns an error
 */
export async function callOdoo(
  options: CallOdooOptions
): Promise<CallOdooResult> {
  const { endpoint, params, sessionId } = options;

  // Get Odoo base URL from environment variable, default to localhost:8069
  const odooBaseUrl =
    process.env.NEXT_PUBLIC_ODOO_BASE_URL || "http://localhost:8069";

  // Construct full URL
  const url = `${odooBaseUrl}${endpoint}`;

  // Generate a random ID for JSON-RPC request
  const requestId = Math.floor(Math.random() * 1000000);

  // Build JSON-RPC 2.0 request payload
  const jsonRpcRequest: JsonRpcRequest = {
    jsonrpc: "2.0",
    method: "call",
    params,
    id: requestId,
  };

  // Prepare headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add session cookie if provided
  if (sessionId) {
    headers["Cookie"] = `session_id=${sessionId}`;
    headers["X-Openerp-Session-Id"] = sessionId;
  }

  try {
    // Make the request
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(jsonRpcRequest),
      credentials: "include", // Important for cookie handling
    });

    // Check if request was successful
    if (!response.ok) {
      // Check if response is XML/HTML (error page)
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("xml") || contentType?.includes("text/html")) {
        const text = await response.text();
        throw new Error(
          `Odoo returned XML/HTML instead of JSON. Status: ${response.status}. Response: ${text.substring(0, 200)}`
        );
      }
      throw new Error(
        `Odoo request failed: ${response.status} ${response.statusText}`
      );
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      if (text.trim().startsWith("<?xml") || text.trim().startsWith("<")) {
        throw new Error(
          `Odoo returned XML instead of JSON. Response: ${text.substring(0, 200)}`
        );
      }
      throw new Error(
        `Unexpected content type: ${contentType}. Response: ${text.substring(0, 200)}`
      );
    }

    // Parse JSON-RPC response
    const jsonRpcResponse: JsonRpcResponse = await response.json();

    // Check for JSON-RPC error
    if (jsonRpcResponse.error) {
      throw new Error(
        `Odoo error: ${jsonRpcResponse.error.message} (code: ${jsonRpcResponse.error.code})`
      );
    }

    // Extract session ID from Set-Cookie header if present
    let extractedSessionId: string | undefined;
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
      // Parse session_id from Set-Cookie header
      // Format: session_id=abc123; Path=/; HttpOnly
      const sessionMatch = setCookieHeader.match(/session_id=([^;]+)/);
      if (sessionMatch) {
        extractedSessionId = sessionMatch[1];
      }
    }

    return {
      result: jsonRpcResponse.result,
      sessionId: extractedSessionId,
    };
  } catch (error) {
    // Re-throw with more context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to call Odoo: ${String(error)}`);
  }
}
