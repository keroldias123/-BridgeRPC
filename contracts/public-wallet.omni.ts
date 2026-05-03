import { datetime, decimal, enum_, query, service, uuid } from "@bridgerpc/schema";

export const PublicWalletService = service("PublicWalletService", {
  visibility: "public",
  transport: "http-json",
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
});
