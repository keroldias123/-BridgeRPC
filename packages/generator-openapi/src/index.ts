import type { OmniProjectIR } from "@omnirpc/core";

export function generateOpenApi(project: OmniProjectIR) {
  const paths: Record<string, unknown> = {};
  for (const service of project.services.filter((s) => s.visibility === "public")) {
    for (const procedure of service.procedures) {
      paths[`/${service.name}/${procedure.name}`] = { post: { responses: { "200": { description: "OK" } } } };
    }
  }
  return { openapi: "3.1.0", info: { title: project.name, version: project.version }, paths };
}
