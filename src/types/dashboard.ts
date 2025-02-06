import { LucideIcon } from "lucide-react";

export interface SaleData {
  name: string;
  email: string;
  amount: number;
  avatar?: string;
}

export interface OverviewData {
  name: string;
  total: number;
}

export interface StatData {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}
