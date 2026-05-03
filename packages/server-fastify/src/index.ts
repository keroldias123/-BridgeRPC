import type { OmniProjectIR } from "@bridgerpc/core";
import { createHttpJsonServer, type RouteDefinition } from "@bridgerpc/transport-http";

export function createBridgeFastifyLikeServer(project: OmniProjectIR, impl: Record<string, (input: unknown) => Promise<unknown> | unknown>) {
  const routes: RouteDefinition[] = [];

  for (const service of project.services.filter((s) => s.visibility === "public")) {
    for (const procedure of service.procedures) {
      const operationKey = `${service.name}.${procedure.name}`;
      routes.push({
        method: "POST",
        path: `/${service.name}/${procedure.name}`,
        handler: (body) => impl[operationKey]?.(body) ?? { error: `Missing handler for ${operationKey}` },
      });
    }
  }

  return createHttpJsonServer(routes);
}
