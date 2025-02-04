import {
  ArrowDown01Icon,
  ArrowDown10Icon,
  ArrowUpDownIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment, useState } from "react";

const sortByMap: (keyof IProduct)[] = ["price"];
const sortOrderMap = ["asc", "desc"] as const;

export function SortingControls({
  handleSort,
}: {
  handleSort: (sortBy: keyof IProduct, sortOrder: "asc" | "desc") => void;
}) {
  const [sortBy, setSortBy] = useState<keyof IProduct>(sortByMap[0]);
  const [sortOrder, setSortOrder] =
    useState<(typeof sortOrderMap)[number]>("asc");

  const sortSelectHandler = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    setSortOrder(sortOrder as (typeof sortOrderMap)[number]);
    setSortBy(sortBy as keyof IProduct);
    handleSort(
      sortBy as keyof IProduct,
      sortOrder as (typeof sortOrderMap)[number]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <ArrowUpDownIcon className="!size-4" />
        <span className=""> Sort By </span>
      </div>
      <Select
        value={`${sortBy}-${sortOrder}`}
        onValueChange={sortSelectHandler}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortByMap.map((item) => (
            <Fragment key={item}>
              {sortOrderMap.map((order) => (
                <SelectItem key={`${item}-${order}`} value={`${item}-${order}`}>
                  <div className="flex items-center gap-1">
                    <span>
                      {order === "asc" ? (
                        <ArrowDown01Icon className="!size-4" />
                      ) : (
                        <ArrowDown10Icon className="!size-4" />
                      )}
                    </span>
                    <span>
                      {item} {order === "asc" ? "low to high" : "high to low"}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
