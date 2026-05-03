import type { OmniFieldIR, OmniProjectIR, OmniServiceIR } from "@bridgerpc/core";
import { validateProjectIR } from "@bridgerpc/core";

function mapFields(record: Record<string, { kind: string }>): OmniFieldIR[] {
  return Object.entries(record || {}).map(([name, value]) => ({
    name,
    type: value.kind as OmniFieldIR["type"],
    required: true,
  }));
}

export function compileContracts(services: any[], name = "bridgerpc-app", version = "0.1.0"): OmniProjectIR {
  const mappedServices: OmniServiceIR[] = services.map((svc) => {
    const procedures = Object.entries(svc)
      .filter(([k, v]) => !["__omni", "name", "visibility", "transport"].includes(k) && typeof v === "object")
      .map(([procedureName, procedure]: [string, any]) => ({
        name: procedureName,
        kind: procedure.kind,
        auth: procedure.auth,
        input: { fields: mapFields(procedure.input) },
        output: { fields: mapFields(procedure.output) },
      }));

    return {
      name: svc.name,
      visibility: svc.visibility,
      transport: svc.transport,
      procedures,
    };
  });

  const project: OmniProjectIR = { name, version, services: mappedServices, entities: [], enums: [] };
  const diagnostics = validateProjectIR(project);
  if (diagnostics.length) throw new Error(diagnostics.join("\n"));
  return project;
}
