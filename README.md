# OmniRPC (bootstrap)

Bootstrap inicial do OmniRPC com fluxo MVP:

`Contrato -> IR -> TypeScript Client + OpenAPI`

## Pacotes MVP

- `@omnirpc/core`: tipos da IR
- `@omnirpc/schema`: DSL para contratos
- `@omnirpc/compiler`: compilação de contratos em IR
- `@omnirpc/cli`: comandos `check` e `generate`
- `@omnirpc/generator-typescript`
- `@omnirpc/generator-openapi`
- `@omnirpc/generator-protobuf` (placeholder)

## Comandos

- `npm run check`
- `npm run generate`
