import type { OmniProjectIR } from "@omnirpc/core";

export function generateTypescriptClient(project: OmniProjectIR): string {
  const methods = project.services
    .flatMap((s) => s.procedures.map((p) => `  ${s.name}_${p.name}(input: unknown): Promise<unknown>;`))
    .join("\n");

  return `export interface OmniClient {\n${methods}\n}\n`;
}
