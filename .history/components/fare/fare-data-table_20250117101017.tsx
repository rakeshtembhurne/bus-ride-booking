import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import router from "next/router";

export type Fare = {
  routeId: string;
  fromLocationId: string;
  toLocationId: string;
  price: number;
};

export const columns: ColumnDef<Fare>[] = [
  {
    accessorKey: "routeId",
    header: "Route ID",
  },
  {
    accessorKey: "fromLocationId",
    header: "From Location",
  },
  {
    accessorKey: "toLocationId",
    header: "To Location",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];

export function DataTableDemo() {
  const [data, setData] = useState<Fare[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/fare/List-fare");
        if (!response.ok) throw new Error("Failed to fetch fares");

        const fares = await response.json();

        // Map the API response to match the columns
        const formattedData = fares.map((fare: any) => ({
          routeId: fare.routeId,
          fromLocationId: fare.fromLocationId,
          toLocationId: fare.toLocationId,
          price: fare.price,
        }));

        setData(formattedData);
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
      <Button
          className="max-w-sm"
          onClick={() => router.push("/fare/addForm")} // Navigate to add form page
        >
          Add Fare
        </Button>      </div>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
