import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await (prisma as any).order.findMany({
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { type, customer, phone, address, notes, items } = body as {
    type: "pickup" | "delivery";
    customer: string;
    phone?: string;
    address?: string;
    notes?: string;
    items: { menuItemId: string; quantity: number; price: number; name: string }[];
  };

  if (!customer || !type || !items?.length) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const total = items.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0);

  const order = await (prisma as any).order.create({
    data: {
      type, customer, phone, address, notes, total,
      items: { create: items },
    },
    include: { items: true },
  });

  return Response.json(order, { status: 201 });
}
