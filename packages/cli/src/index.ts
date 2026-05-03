import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { compileContracts } from "@bridgerpc/compiler";
import { WalletService } from "../../../contracts/wallet.omni";
import { PublicWalletService } from "../../../contracts/public-wallet.omni";
import { generateTypescriptClient } from "@bridgerpc/generator-typescript";
import { generateOpenApi } from "@bridgerpc/generator-openapi";
import { generateProto } from "@bridgerpc/generator-protobuf";

const command = process.argv[2] ?? "check";
const project = compileContracts([WalletService, PublicWalletService]);

if (command === "check") {
  console.log("IR válido:", project.name, project.version, `services=${project.services.length}`);
  process.exit(0);
}

if (command === "generate") {
  mkdirSync(resolve("generated/typescript"), { recursive: true });
  mkdirSync(resolve("generated/openapi"), { recursive: true });
  mkdirSync(resolve("generated/protobuf"), { recursive: true });
  writeFileSync(resolve("generated/typescript/client.ts"), generateTypescriptClient(project));
  writeFileSync(resolve("generated/openapi/openapi.json"), JSON.stringify(generateOpenApi(project), null, 2));
  writeFileSync(resolve("generated/protobuf/bridgerpc.proto"), generateProto(project));
  console.log("Arquivos gerados em generated/");
  process.exit(0);
}

console.error(`Comando não suportado: ${command}`);
process.exit(1);
