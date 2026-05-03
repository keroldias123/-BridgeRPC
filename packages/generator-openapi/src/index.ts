import type { OmniProjectIR } from "@bridgerpc/core";

function scalarSchema(kind: string) {
  const map: Record<string, any> = {
    string: { type: "string" }, uuid: { type: "string", format: "uuid" }, datetime: { type: "string", format: "date-time" },
    int32: { type: "integer", format: "int32" }, int64: { type: "integer", format: "int64" }, float: { type: "number", format: "float" }, double: { type: "number", format: "double" }, boolean: { type: "boolean" }, decimal: { type: "string" },
  };
  return map[kind] || { type: "string" };
}

function objectSchema(fields: any[]) {
  return { type: "object", properties: Object.fromEntries(fields.map((f) => [f.name, scalarSchema(typeof f.type === "string" ? f.type : "string")])), required: fields.filter((f) => f.required).map((f) => f.name) };
}

export function generateOpenApi(project: OmniProjectIR) {
  const paths: Record<string, any> = {};
  for (const service of project.services.filter((s) => s.visibility === "public")) {
    for (const procedure of service.procedures) {
      paths[`/${service.name}/${procedure.name}`] = {
        post: {
          operationId: `${service.name}_${procedure.name}`,
          requestBody: { required: true, content: { "application/json": { schema: objectSchema(procedure.input.fields as any) } } },
          responses: { "200": { description: "OK", content: { "application/json": { schema: objectSchema(procedure.output.fields as any) } } } },
        },
      };
    }
  }
  return { openapi: "3.1.0", info: { title: project.name, version: project.version }, paths };
}
