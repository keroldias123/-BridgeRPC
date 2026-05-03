import type { OmniProjectIR } from "@bridgerpc/core";

function mapType(type: string): string {
  if (["string", "uuid", "datetime", "date", "decimal"].includes(type)) return "string";
  if (["int32", "int64", "float", "double"].includes(type)) return "number";
  if (type === "boolean") return "boolean";
  return "unknown";
}

function renderObject(fields: { name: string; type: any; required: boolean }[]): string {
  return `{ ${fields.map((f) => `${f.name}${f.required ? "" : "?"}: ${mapType(typeof f.type === "string" ? f.type : "unknown")}`).join("; ")} }`;
}

export function generateTypescriptClient(project: OmniProjectIR): string {
  const methods = project.services
    .filter((s) => s.visibility === "public")
    .flatMap((s) =>
      s.procedures.map((p) => {
        const inType = renderObject(p.input.fields as any);
        const outType = renderObject(p.output.fields as any);
        return `  ${s.name}_${p.name}(input: ${inType}): Promise<${outType}>;`;
      }),
    )
    .join("\n");

  return `export interface BridgeClient {\n${methods}\n}\n`;
}
