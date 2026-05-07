import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json() as { status: string };

  const validStatuses = ["pending", "preparing", "ready", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await (prisma as any).order.update({
    where: { id },
    data: { status },
  });

  return Response.json(order);
}
