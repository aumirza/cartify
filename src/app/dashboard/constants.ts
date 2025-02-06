import { DollarSign, Users, Package, CreditCard } from "lucide-react";
import { OverviewData, SaleData, StatData } from "@/types/dashboard";

export const statsData: StatData[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "+2350",
    description: "+180.1% from last month",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "+12,234",
    description: "+19% from last month",
    icon: Package,
  },
  {
    title: "Active Orders",
    value: "+573",
    description: "+201 since last hour",
    icon: CreditCard,
  },
];

export const overviewData: OverviewData[] = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

export const recentSales: SaleData[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999.0,
    avatar: "/avatars/01.png",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39.0,
    avatar: "/avatars/02.png",
  },
];
