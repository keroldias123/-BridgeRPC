import { datetime, decimal, enum_, mutation, query, service, string, uuid } from "@omnirpc/schema";

export const WalletService = service("WalletService", {
  visibility: "private",
  transport: "connect",
  getBalance: query({
    auth: "user",
    input: { walletId: uuid() },
    output: {
      walletId: uuid(),
      balance: decimal({ precision: 28, scale: 8 }),
      currency: enum_(["AOA", "EUR", "USD"]),
      updatedAt: datetime(),
    },
  }),
  createWallet: mutation({
    auth: "user",
    input: { userId: uuid(), currency: enum_(["AOA", "EUR", "USD"]) },
    output: { walletId: uuid(), status: string(), createdAt: datetime() },
  }),
});
