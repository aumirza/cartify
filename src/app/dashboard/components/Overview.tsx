import { OverviewChart } from "@/components/dashboard/OverviewCard";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { StatCard } from "@/components/dashboard/StatCard";
import { statsData, overviewData, recentSales } from "../constants";

export function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} color="primary" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <OverviewChart data={overviewData} />
        </div>
        <div className="col-span-3">
          <RecentSales sales={recentSales} />
        </div>
      </div>
    </div>
  );
}
