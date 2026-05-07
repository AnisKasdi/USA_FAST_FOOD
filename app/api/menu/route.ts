import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await (prisma as any).menuItem.findMany({
    where: { available: true },
    orderBy: { category: "asc" },
  });
  return Response.json(items);
}
