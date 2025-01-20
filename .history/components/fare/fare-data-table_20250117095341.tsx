import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export type Fare = {
  id: string;
  route: string | object;
  fromLocation: string;
  toLocation: string;
  price: number;
};

export const columns: ColumnDef<Fare>[] = [
  {
    accessorKey: "route",
    header: "Route",
    cell: ({ row }) => {
      const routeValue = row.getValue("route");
      return typeof routeValue === "object" ? JSON.stringify(routeValue) : routeValue;
    },
  },
  {
    accessorKey: "fromLocation",
    header: "From Location",
    cell: ({ row }) => <div>{row.getValue("fromLocation")}</div>,
  },
  {
    accessorKey: "toLocation",
    header: "To Location",
    cell: ({ row }) => <div>{row.getValue("toLocation")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="link" onClick={() => alert(`View ${row.original.id}`)}>View</Button>
        <Button variant="link" onClick={() => alert(`Edit ${row.original.id}`)}>Edit</Button>
        <Button variant="link" onClick={() => alert(`Delete ${row.original.id}`)}>Delete</Button>
      </div>
    ),
  },
];

export function DataTableDemo() {
  const [data, setData] = useState<Fare[]>([]); // State for dynamic data
  const [loading, setLoading] = useState(false); // Loading state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/fare/List-fare");
        if (!response.ok) throw new Error("Failed to fetch fares");
        const fares = await response.json();
        
        // Sanitize data
        const sanitizedData = fares.map((fare: Fare) => ({
          ...fare,
          route: typeof fare.route === "object" ? JSON.stringify(fare.route) : fare.route,
        }));
        
        setData(sanitizedData);
      } catch (error) {
        console.error("Error fetching fares:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button onClick={() => router.push("/fare/addForm")}>Add Fare</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.getValue() === "object"
                        ? JSON.stringify(cell.getValue())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
