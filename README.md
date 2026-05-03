# BridgeRPC (bootstrap)

Fluxo MVP ativo:

`Contrato -> IR -> OpenAPI(public) + Protobuf(private) + TypeScript client(public)`

## O que já existe

- `@bridgerpc/core`: IR neutra + validação básica
- `@bridgerpc/schema`: DSL contract-first
- `@bridgerpc/compiler`: compilação para IR
- `@bridgerpc/cli`: `check` e `generate`
- `@bridgerpc/generator-typescript`: client para serviços public
- `@bridgerpc/generator-openapi`: OpenAPI com request/response schema
- `@bridgerpc/generator-protobuf`: `.proto` para serviços private
- `@bridgerpc/transport-http`: runtime HTTP/JSON mínimo
- `@bridgerpc/server-fastify` / `server-elysia`: adapter inicial
- `@bridgerpc/client-typescript`: cliente HTTP funcional

## Contratos de exemplo

- `contracts/public-wallet.omni.ts` (public/http-json)
- `contracts/wallet.omni.ts` (private/connect)

## Comandos

- `npm run check`
- `npm run generate`
