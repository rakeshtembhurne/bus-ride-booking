import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { ColumnDef, useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";

// Define the Fare type
export type Fare = {
  id: string;
  route: string;
  fromLocation: string;
  toLocation: string;
  price: number;
};

export const columns: ColumnDef<Fare>[] = [
  {
    accessorKey: "route",
    header: "Route",
    cell: ({ row }) => <div>{row.getValue("route")}</div>,
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
    cell: ({ row }) => {
      const price = row.getValue("price");
      return <div>{String(price)}</div>;  // Convert the integer to a string
    },
  },
  {
    id: "actions",
    header: "Actions", // Explicit header name
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          {/* Your dropdown menu or actions */}
        </Button>
      );
    },
  }
];

export function DataTableDemo() {
  const [fares, setFares] = useState<Fare[]>([]);  // State to hold fetched fares
  const [loading, setLoading] = useState<boolean>(true);  // State for loading status
  const router = useRouter();

  useEffect(() => {
    // Fetch fares from the backend API
    const fetchFares = async () => {
      try {
        const response = await fetch("/api/fare/List-fare");  // Your API endpoint
        const data = await response.json();
        setFares(data);  // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching fares:", error);
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchFares();
  }, []);  // Empty array ensures it runs only once on component mount

  const table = useReactTable({
    data: fares,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return <div>Loading...</div>;  // Loading indicator while data is being fetched
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button
          className="max-w-sm"
          onClick={() => router.push("/fare/addForm")}  // Navigate to add form page
        >
          Add Fare
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
