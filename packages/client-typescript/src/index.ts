export interface BridgeClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}

export function createBridgeClient<T extends Record<string, (input: any) => Promise<any>>>(
  procedures: Record<string, string>,
  options: BridgeClientOptions,
): T {
  const client: Record<string, unknown> = {};

  for (const [key, path] of Object.entries(procedures)) {
    client[key] = async (input: unknown) => {
      const response = await fetch(`${options.baseUrl}${path}`, {
        method: "POST",
        headers: { "content-type": "application/json", ...(options.headers || {}) },
        body: JSON.stringify(input ?? {}),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    };
  }

  return client as T;
}
