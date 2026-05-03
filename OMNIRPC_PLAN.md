# OmniRPC — Plano de Implementação (MVP)

Este documento transforma a proposta em um plano executável para o Codex, em fases pequenas e entregáveis.

## Objetivo

Criar uma framework RPC tipada, bidirecional e multi-linguagem com dois modos:

- **public**: HTTP + JSON + OpenAPI + SDK público
- **private**: Protobuf + gRPC/Connect para backend-to-backend

Centro arquitetural:

`qualquer linguagem -> OmniRPC IR -> qualquer linguagem`

## Estrutura inicial recomendada

```txt
omnirpc/
├── apps/
├── contracts/
├── docs/
├── examples/
├── generated/
├── packages/
│   ├── core/
│   ├── schema/
│   ├── compiler/
│   ├── cli/
│   ├── generator-typescript/
│   ├── generator-openapi/
│   ├── generator-protobuf/
│   ├── transport-http/
│   ├── server-elysia/
│   ├── server-fastify/
│   └── client-typescript/
└── runtimes/
```

## Fases de execução

1. **Fundação**
   - Monorepo com Bun + TurboRepo + TypeScript strict
   - `packages/core` com definição da IR e validação mínima

2. **Schema DSL**
   - `packages/schema` com builders (`service`, `query`, `mutation`, `enum`, `field`)
   - Transformação de contrato para IR

3. **Compiler + CLI**
   - `packages/compiler` para carregar contratos e produzir IR
   - `packages/cli` com `omni check` e `omni generate`

4. **Primeiro fluxo ponta a ponta (MVP real)**
   - `contracts/wallet.omni.ts`
   - `generator-typescript` (types + client)
   - `generator-openapi` para serviços `public`

5. **Private first (recomendado)**
   - preparar `generator-protobuf` e transporte Connect/gRPC
   - manter partes comerciais e avançadas privadas até estabilizar o núcleo

## Contratos e visibilidade

- `visibility: "public"` -> HTTP/JSON -> OpenAPI -> consumo externo
- `visibility: "private"` -> Protobuf/gRPC/Connect -> consumo interno entre serviços

## Regra de escopo para MVP

Implementar primeiro apenas:

1. `packages/core`
2. `packages/schema`
3. `packages/compiler`
4. `packages/cli`
5. `packages/generator-typescript`
6. `packages/generator-openapi`
7. `contracts/wallet.omni.ts`
8. 1 exemplo funcional com Elysia ou Fastify

## Prompt pronto para usar com Codex

```txt
Quero criar um projeto chamado OmniRPC.

Objetivo:
Criar uma framework RPC tipada, bidirecional e multi-linguagem. Ela deve permitir que backends em TypeScript/JavaScript, Go, C# e Java comuniquem entre si com contratos tipados. O projeto deve ter dois modos de comunicação: public e private.

Modo public:
- HTTP + JSON
- OpenAPI
- SDK público para frontend, mobile e clientes externos

Modo private:
- Backend-to-backend
- Protobuf + gRPC ou Connect RPC
- Não exposto ao navegador
- SDKs tipados para Go, TypeScript, C# e Java

Arquitetura:
- O centro do projeto deve ser uma IR neutra chamada OmniRPC IR.
- A lógica deve seguir o fluxo: qualquer linguagem -> OmniRPC IR -> qualquer linguagem.
- Primeiro MVP deve suportar contract-first usando TypeScript DSL.
- Depois serão criados importers code-first para TypeScript, Go, C# e Java.

Cria a estrutura inicial do monorepo com Bun, TurboRepo e TypeScript:
- packages/core
- packages/schema
- packages/compiler
- packages/cli
- packages/generator-typescript
- packages/generator-go
- packages/generator-openapi
- packages/generator-protobuf
- packages/transport-http
- packages/server-elysia
- packages/server-fastify
- packages/client-typescript
- contracts
- examples
- docs
- generated

Implementa primeiro:
1. Tipos da OmniRPC IR em packages/core.
2. Builders da DSL em packages/schema.
3. Um exemplo de contrato em contracts/wallet.omni.ts.
4. Compiler básico que transforma contrato em IR.
5. CLI com comando omni check e omni generate.
6. Generator TypeScript simples que gera types e client.
7. Generator OpenAPI simples para serviços public.
8. Estrutura preparada para generator Protobuf para serviços private.

Regras:
- Código limpo, modular e tipado.
- Usar strict TypeScript.
- Não misturar lógica de compiler com generator.
- Não deixar TypeScript ser o centro conceitual do projeto; o centro deve ser a OmniRPC IR.
- Cada package deve ter package.json, tsconfig.json e src/index.ts.
- Criar README.md explicando a visão, arquitetura e roadmap.
```

## Estratégia de abertura

- Começar o repositório como **privado**
- Tornar público apenas quando houver:
  1. nome definido
  2. README profissional
  3. CLI básico
  4. exemplo funcional
  5. licença definida
  6. roadmap claro

Sugestão futura de licenciamento:

- núcleo (`core/schema/client básico`): Apache-2.0
- cloud/studio/enterprise: privado/comercial
