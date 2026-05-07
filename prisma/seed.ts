import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as never);

const menuData = [
  // Specials
  { name: "Chicken Shawarma Special", description: "Crispy marinated chicken, saffron rice, fresh salad, grilled tomato & onion, warm pita", price: 14.99, category: "Specials", image: "/images/CharcoalChicken_ChickenShwarmaSpecial.jpg", calories: 720, allergens: JSON.stringify(["Gluten"]) },
  { name: "Beef Shawarma Special", description: "Slow-roasted spiced beef, saffron rice, house salad, grilled vegetables, pita bread", price: 15.99, category: "Specials", image: "/images/CharcoalChicken_BeefShawarmaSpecial.jpg", calories: 780, allergens: JSON.stringify(["Gluten"]) },
  { name: "Beef Kofta Special", description: "Four charcoal-grilled beef kofta skewers, saffron rice, garden salad, pita", price: 15.99, category: "Specials", image: "/images/CharcoalChicken_BeefKoftaSpecial.jpg", calories: 820, allergens: JSON.stringify(["Gluten"]) },
  { name: "Chicken Kofta Special", description: "Charcoal-grilled chicken kofta, herbed rice, salad, pickled veggies, pita", price: 14.99, category: "Specials", image: "/images/CharcoalChicken_ChickenKoftaSpecial.jpg", calories: 760, allergens: JSON.stringify(["Gluten"]) },
  { name: "Falafel Special", description: "Crispy golden falafel, creamy hummus, stuffed grape leaves, garden salad, pita", price: 13.99, category: "Specials", image: "/images/CharcoalChicken_FalafelSpecial.jpg", calories: 650, allergens: JSON.stringify(["Gluten"]) },
  { name: "Cheeseburger Special", description: "Halal beef patty, melted cheese, golden fries, pickled veggies, fresh tomato & lettuce", price: 14.99, category: "Specials", image: "/images/CharcoalChicken_CheeseburgerSpecial.jpg", calories: 840, allergens: JSON.stringify(["Gluten", "Dairy"]) },
  { name: "Chef's Special", description: "Whole charcoal-grilled chicken with beef & chicken kofta, grilled peppers, onions & veggies", price: 28.99, category: "Specials", image: "/images/CharcoalChicken_ChefsSpecial.jpg", calories: 1200, allergens: JSON.stringify([]), isNew: true },
  { name: "Salmon Special", description: "Grilled Atlantic salmon with Mediterranean rice, salad and house sauces", price: 18.99, category: "Specials", image: "/images/CharcoalChicken_SalmonSpecial.jpg", calories: 680, allergens: JSON.stringify(["Fish"]), isNew: true },
  // Wraps & Pitas
  { name: "Beef Kofta Wrap", description: "Grilled beef kofta, tahini, fresh veggies, pickles rolled in warm pita", price: 11.99, category: "Wraps & Pitas", image: "/images/CharcoalChicken_BeefKoftaWrap.jpg", calories: 520, allergens: JSON.stringify(["Gluten", "Sesame"]) },
  { name: "Beef Kofta in Pita", description: "Open-face grilled beef kofta in sesame pita with house salad and condiments", price: 11.99, category: "Wraps & Pitas", image: "/images/CharcoalChicken_BeefKoftaInPita.jpg", calories: 480, allergens: JSON.stringify(["Gluten", "Sesame"]) },
  { name: "Chicken Kofta Wrap", description: "Charcoal chicken kofta, garlic sauce, lettuce, tomato, pickles in pita wrap", price: 10.99, category: "Wraps & Pitas", image: "/images/CharcoalChicken_ChickenKoftaWrap.jpg", calories: 490, allergens: JSON.stringify(["Gluten"]) },
  { name: "Chicken Kofta Pita", description: "Juicy chicken kofta in toasted sesame pita with Mediterranean sauces", price: 10.99, category: "Wraps & Pitas", image: "/images/CharcoalChicken_ChickenKoftaPita.jpg", calories: 460, allergens: JSON.stringify(["Gluten", "Sesame"]) },
  // Combos
  { name: "Half Chicken Combo", description: "Half charcoal-grilled chicken, saffron rice, salad, pickled veggies, pita bread", price: 16.99, category: "Combos", image: "/images/CharcoalChicken_HalfChickenCombo.jpg", calories: 890, allergens: JSON.stringify(["Gluten"]), isNew: true },
  // Salads
  { name: "House Salad", description: "Mixed greens, stuffed grape leaves, chickpeas, olives, corn, pickled veggies, pita", price: 10.99, category: "Salads", image: "/images/CharcoalChicken_HouseSalad.jpg", calories: 420, allergens: JSON.stringify(["Gluten"]) },
  // Sides
  { name: "Hummus", description: "Creamy house hummus with olive oil, warm chickpeas and a pinch of paprika", price: 4.99, category: "Sides", image: "/images/CharcoalChicken_Hummus.jpg", calories: 180, allergens: JSON.stringify(["Sesame"]) },
  { name: "Babaganoush", description: "Smoky roasted eggplant dip with olive oil and fresh herbs", price: 4.99, category: "Sides", image: "/images/CharcoalChicken_Babaganoush.jpg", calories: 160, allergens: JSON.stringify([]) },
  { name: "Tahini", description: "Smooth house-made sesame tahini, drizzled with premium olive oil", price: 2.99, category: "Sides", image: "/images/CharcoalChicken_Tahini.jpg", calories: 90, allergens: JSON.stringify(["Sesame"]) },
  { name: "Moussaka", description: "Layered eggplant, spiced ground beef and béchamel, baked to golden perfection", price: 6.99, category: "Sides", image: "/images/CharcoalChicken_Mousaka.jpg", calories: 340, allergens: JSON.stringify(["Dairy", "Gluten"]) },
  // Desserts
  { name: "Baklava", description: "Flaky phyllo pastry layered with walnuts, soaked in rose-water honey syrup", price: 4.99, category: "Desserts", image: "/images/CharcoalChicken_Baklava.jpg", calories: 380, allergens: JSON.stringify(["Gluten", "Nuts", "Dairy"]) },
  { name: "Rice Pudding", description: "Traditional creamy rice pudding, lightly scented with rose water", price: 4.49, category: "Desserts", image: "/images/CharcoalChicken_RicePudding.jpg", calories: 290, allergens: JSON.stringify(["Dairy"]) },
];

async function main() {
  console.log("Seeding database...");
  await (prisma as any).orderItem.deleteMany();
  await (prisma as any).order.deleteMany();
  await (prisma as any).menuItem.deleteMany();

  for (const item of menuData) {
    await (prisma as any).menuItem.create({ data: item });
  }
  console.log(`Seeded ${menuData.length} menu items.`);

  const items = await (prisma as any).menuItem.findMany({ take: 5 });

  await (prisma as any).order.create({
    data: {
      type: "pickup", status: "preparing", total: 30.98, customer: "Ahmed B.",
      items: { create: [
        { quantity: 1, price: items[0].price, name: items[0].name, menuItemId: items[0].id },
        { quantity: 1, price: items[2].price, name: items[2].name, menuItemId: items[2].id },
      ]},
    },
  });

  await (prisma as any).order.create({
    data: {
      type: "delivery", status: "pending", total: 45.97, customer: "Sarah M.",
      address: "145 W 30th St, New York, NY 10001",
      items: { create: [
        { quantity: 2, price: items[1].price, name: items[1].name, menuItemId: items[1].id },
        { quantity: 1, price: items[4].price, name: items[4].name, menuItemId: items[4].id },
      ]},
    },
  });

  console.log("Sample orders created. Done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => (prisma as any).$disconnect());
