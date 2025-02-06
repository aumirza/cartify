import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LucideIcon,
} from "lucide-react";

export const Icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  orders: ShoppingCart,
  products: Package,
  customers: Users,
  settings: Settings,
};

export const sidebarItems = [
  { icon: "dashboard", label: "Overview", href: "/dashboard" },
  { icon: "products", label: "Products", href: "/dashboard/products" },
  { icon: "orders", label: "Orders", href: "/dashboard/orders" },
  { icon: "customers", label: "Customers", href: "/dashboard/customers" },
  { icon: "settings", label: "Settings", href: "/dashboard/settings" },
];
