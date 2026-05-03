export type OmniVisibility = "public" | "private";
export type OmniTransport = "http-json" | "grpc" | "connect";
export type OmniProcedureKind = "query" | "mutation" | "command" | "stream";

export type OmniScalarType =
  | "string"
  | "boolean"
  | "int32"
  | "int64"
  | "float"
  | "double"
  | "decimal"
  | "uuid"
  | "datetime"
  | "date"
  | "json"
  | "bytes";

export interface OmniFieldIR {
  name: string;
  type: OmniScalarType | { ref: string };
  required: boolean;
  array?: boolean;
  nullable?: boolean;
}

export interface OmniObjectIR { fields: OmniFieldIR[] }

export interface OmniProcedureIR {
  name: string;
  kind: OmniProcedureKind;
  input: OmniObjectIR;
  output: OmniObjectIR;
  auth?: "none" | "user" | "admin" | "service";
}

export interface OmniServiceIR {
  name: string;
  visibility: OmniVisibility;
  transport: OmniTransport;
  procedures: OmniProcedureIR[];
}

export interface OmniProjectIR {
  name: string;
  version: string;
  services: OmniServiceIR[];
  entities: unknown[];
  enums: unknown[];
}

export function validateProjectIR(project: OmniProjectIR): string[] {
  const diagnostics: string[] = [];
  if (!project.name) diagnostics.push("Project name is required");
  if (!project.version) diagnostics.push("Project version is required");
  for (const service of project.services) {
    if (!service.procedures.length) diagnostics.push(`Service ${service.name} has no procedures`);
  }
  return diagnostics;
}
