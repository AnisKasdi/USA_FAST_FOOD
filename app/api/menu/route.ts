import { prisma } from "@/lib/prisma";

function parseItem(i: any) {
  return { ...i, allergens: JSON.parse(i.allergens) };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";
  const items = await (prisma as any).menuItem.findMany({
    where: all ? {} : { available: true },
    orderBy: { category: "asc" },
  });
  return Response.json(items.map(parseItem));
}

export async function POST(req: Request) {
  const { name, description, price, category, image, calories, allergens, isNew } = await req.json();
  if (!name || !category || price == null) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  const item = await (prisma as any).menuItem.create({
    data: {
      name, description: description ?? "", price, category,
      image: image || "/images/CharcoalChicken_Hero.jpg",
      calories: calories ?? 0,
      allergens: JSON.stringify(allergens ?? []),
      isNew: !!isNew,
    },
  });
  return Response.json(parseItem(item), { status: 201 });
}
