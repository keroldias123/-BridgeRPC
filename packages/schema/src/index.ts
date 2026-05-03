export type ScalarDef = { kind: string; options?: Record<string, unknown> };

export const string = (): ScalarDef => ({ kind: "string" });
export const uuid = (): ScalarDef => ({ kind: "uuid" });
export const datetime = (): ScalarDef => ({ kind: "datetime" });
export const decimal = (options?: { precision?: number; scale?: number }): ScalarDef => ({ kind: "decimal", options });
export const enum_ = (values: string[]): ScalarDef => ({ kind: "enum", options: { values } });

export const query = (def: Record<string, unknown>) => ({ ...def, kind: "query" as const });
export const mutation = (def: Record<string, unknown>) => ({ ...def, kind: "mutation" as const });

export function service(name: string, definition: Record<string, unknown>) {
  return { __omni: "service", name, ...definition };
}
