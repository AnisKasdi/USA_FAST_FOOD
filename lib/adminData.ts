export type Order = {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  type: "pickup" | "delivery";
  time: string;
};

export type SiteConfig = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta1: string;
  heroCta2: string;
  featuredItemIds: string[];
  happyHourEnabled: boolean;
  happyHourStart: string;
  happyHourEnd: string;
  happyHourDiscount: number;
  happyHourLabel: string;
  happyHourCategories: string[];
  announcementBar: string;
  announcementEnabled: boolean;
  phone: string;
  address: string;
  whatsapp: string;
  instagramHandle: string;
  hours: { day: string; open: string; close: string; closed: boolean }[];
};

export const defaultConfig: SiteConfig = {
  heroTitle: "Charcoal Chicken",
  heroSubtitle: "Authentic charcoal-grilled shawarma, kofta & kebabs. 100% halal. Fast & casual catering for all occasions.",
  heroCta1: "Order Now",
  heroCta2: "See the Menu",
  featuredItemIds: ["1", "2", "3"],
  happyHourEnabled: true,
  happyHourStart: "15:00",
  happyHourEnd: "21:00",
  happyHourDiscount: 20,
  happyHourLabel: "Happy Hour — 20% off Sides & Dips",
  happyHourCategories: ["Sides"],
  announcementBar: "Now open for catering — contact us for group bookings",
  announcementEnabled: false,
  phone: "",
  address: "15 W 29th St, New York, NY 10001",
  whatsapp: "",
  instagramHandle: "",
  hours: [
    { day: "Monday",    open: "11:00", close: "22:00", closed: false },
    { day: "Tuesday",   open: "11:00", close: "22:00", closed: false },
    { day: "Wednesday", open: "11:00", close: "22:00", closed: false },
    { day: "Thursday",  open: "11:00", close: "22:00", closed: false },
    { day: "Friday",    open: "11:00", close: "23:00", closed: false },
    { day: "Saturday",  open: "11:00", close: "23:00", closed: false },
    { day: "Sunday",    open: "12:00", close: "21:00", closed: false },
  ],
};
