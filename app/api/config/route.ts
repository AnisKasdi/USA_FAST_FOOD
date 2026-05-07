import { prisma } from "@/lib/prisma";
import { defaultConfig } from "@/lib/adminData";

export async function GET() {
  try {
    const row = await (prisma as any).config.findUnique({ where: { id: "site" } });
    if (!row) return Response.json(defaultConfig);
    return Response.json({ ...defaultConfig, ...JSON.parse(row.data) });
  } catch {
    return Response.json(defaultConfig);
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  await (prisma as any).config.upsert({
    where: { id: "site" },
    create: { id: "site", data: JSON.stringify(data) },
    update: { data: JSON.stringify(data) },
  });
  return Response.json({ ok: true });
}
