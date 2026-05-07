import { prisma } from "@/lib/prisma";
import { defaultConfig, type SiteConfig } from "@/lib/adminData";
import type { MenuItem } from "@/lib/data";

export async function getConfig(): Promise<SiteConfig> {
  try {
    const row = await (prisma as any).config.findUnique({ where: { id: "site" } });
    if (!row) {
      const items = await (prisma as any).menuItem.findMany({
        where: { available: true },
        take: 3,
        orderBy: { createdAt: "asc" },
      });
      const config = { ...defaultConfig, featuredItemIds: items.map((i: any) => i.id) };
      await (prisma as any).config.create({ data: { id: "site", data: JSON.stringify(config) } });
      return config;
    }
    return { ...defaultConfig, ...JSON.parse(row.data) } as SiteConfig;
  } catch {
    return defaultConfig;
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const items = await (prisma as any).menuItem.findMany({
      where: { available: true },
      orderBy: { category: "asc" },
    });
    return items.map((i: any) => ({ ...i, allergens: JSON.parse(i.allergens) }));
  } catch {
    return [];
  }
}
