import { prisma } from "@/lib/prisma";

function parseItem(i: any) {
  return { ...i, allergens: JSON.parse(i.allergens) };
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { allergens, ...rest } = await req.json();
  const item = await (prisma as any).menuItem.update({
    where: { id },
    data: { ...rest, ...(allergens !== undefined ? { allergens: JSON.stringify(allergens) } : {}) },
  });
  return Response.json(parseItem(item));
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await (prisma as any).menuItem.update({ where: { id }, data: { available: false } });
  return Response.json({ ok: true });
}
