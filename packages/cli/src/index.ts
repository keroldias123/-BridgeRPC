import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { compileContracts } from "@omnirpc/compiler";
import { WalletService } from "../../../contracts/wallet.omni";
import { generateTypescriptClient } from "@omnirpc/generator-typescript";
import { generateOpenApi } from "@omnirpc/generator-openapi";

const command = process.argv[2] ?? "check";
const project = compileContracts([WalletService]);

if (command === "check") {
  console.log("IR válido:", project.name, project.version);
  process.exit(0);
}

if (command === "generate") {
  mkdirSync(resolve("generated/typescript"), { recursive: true });
  mkdirSync(resolve("generated/openapi"), { recursive: true });
  writeFileSync(resolve("generated/typescript/client.ts"), generateTypescriptClient(project));
  writeFileSync(resolve("generated/openapi/openapi.json"), JSON.stringify(generateOpenApi(project), null, 2));
  console.log("Arquivos gerados em generated/");
  process.exit(0);
}

console.error(`Comando não suportado: ${command}`);
process.exit(1);
