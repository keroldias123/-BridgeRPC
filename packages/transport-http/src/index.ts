import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export type HttpMethod = "GET" | "POST";
export type RouteHandler = (body: unknown, req: IncomingMessage) => Promise<unknown> | unknown;

export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
}

export function createHttpJsonServer(routes: RouteDefinition[], port = 3000) {
  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const method = (req.method || "GET") as HttpMethod;
    const url = req.url || "/";
    const route = routes.find((r) => r.method === method && r.path === url);

    if (!route) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(Buffer.from(chunk));
    const raw = chunks.length ? Buffer.concat(chunks).toString("utf8") : "{}";
    const body = raw ? JSON.parse(raw) : {};

    const result = await route.handler(body, req);
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(result));
  });

  return {
    listen: () => new Promise<void>((resolve) => server.listen(port, () => resolve())),
    close: () => new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))),
  };
}
