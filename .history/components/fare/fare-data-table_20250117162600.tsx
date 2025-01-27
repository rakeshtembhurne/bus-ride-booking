import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function DataTableDemo() {
  const [data, setData] = useState<Fare[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data...");
        const response = await fetch("/api/fare/List-fare");
        if (!response.ok) throw new Error("Failed to fetch fares");

        const fares = await response.json();
        console.log("Fetched fares:", fares);

        const formattedData = fares.map((fare: any) => ({
          routeId: fare.routeId,
          fromLocation: fare.origin?.name || fare.fromLocationId, // Use name if available, fallback to ID
          toLocation: fare.destination?.name || fare.toLocationId, // Use name if available, fallback to ID
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
  export type Fare = {
    routeId: string;
    fromLocationId: string;
    toLocationId: string;
    fromLocation?: string; // Optional if not always present
    toLocation?: string;   // Optional if not always present
    price: number;
  };
  
   const columns: ColumnDef<Fare>[] = [
    {
      accessorKey: "routeId",
      header: "Route ID",
    },
    {
      accessorKey: "fromLocation",
      header: "From Location",
    },
    {
      accessorKey: "toLocation",
      header: "To Location",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      id: "actions", // Unique identifier for the action column
      header: "Actions", // Header for the actions column
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="link"
            onClick={() => alert(`View ${row.getValue("routeId")}`)} // Using routeId here
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            variant="link"
            onClick={() => alert(`Edit ${row.getValue("routeId")}`)} // Using routeId here
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="link"
            onClick={() => alert(`Delete ${row.getValue("routeId")}`)} // Using routeId here
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ), // Cell containing buttons for actions
    },
  ];
  
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
            {data.length ? (
              data.map((fare, index) => (
                <TableRow key={index}>
                  <TableCell>{fare.routeId}</TableCell>
                  <TableCell>{fare.fromLocation}</TableCell>
                  <TableCell>{fare.toLocation}</TableCell>
                  <TableCell>{fare.price}</TableCell>
                  <TableCell>
                    {/* Action buttons will be rendered here */}
                    <div className="flex space-x-2">
                      <Button
                        variant="link"
                        onClick={() => alert(`View ${fare.routeId}`)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => alert(`Edit ${fare.routeId}`)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => alert(`Delete ${fare.routeId}`)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </TableCell>
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
