import React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchableColumns?: {
    id: string;
    title: string;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  React.useEffect(() => {
    // Apply filter to all searchable columns
    searchableColumns.forEach(({ id }) => {
      table.getColumn(id)?.setFilterValue(globalFilter);
    });
  }, [globalFilter, table, searchableColumns]);

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder={`Search ${searchableColumns
          .map((col) => col.title)
          .join(", ")}...`}
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <Settings2 className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
