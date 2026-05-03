import type { OmniProjectIR } from "@bridgerpc/core";

const typeMap: Record<string, string> = { string: "string", uuid: "string", datetime: "string", decimal: "string", boolean: "bool", int32: "int32", int64: "int64", float: "float", double: "double" };

export function generateProto(project: OmniProjectIR): string {
  const lines = ['syntax = "proto3";', `package ${project.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()};`, ""];

  for (const service of project.services.filter((s) => s.visibility === "private")) {
    for (const procedure of service.procedures) {
      lines.push(`message ${service.name}${procedure.name}Request {`);
      procedure.input.fields.forEach((f, i) => lines.push(`  ${typeMap[String(typeof f.type === "string" ? f.type : "string")] || "string"} ${f.name} = ${i + 1};`));
      lines.push("}");
      lines.push(`message ${service.name}${procedure.name}Response {`);
      procedure.output.fields.forEach((f, i) => lines.push(`  ${typeMap[String(typeof f.type === "string" ? f.type : "string")] || "string"} ${f.name} = ${i + 1};`));
      lines.push("}");
    }
    lines.push(`service ${service.name} {`);
    for (const procedure of service.procedures) lines.push(`  rpc ${procedure.name} (${service.name}${procedure.name}Request) returns (${service.name}${procedure.name}Response);`);
    lines.push("}");
  }

  return lines.join("\n");
}
