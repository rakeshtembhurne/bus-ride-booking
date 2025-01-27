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
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Records per page
  const [total, setTotal] = useState(0); // Total records


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/fare/List-fare");
        if (!response.ok) throw new Error("Failed to fetch fares");

        const fares = await response.json();

        const formattedData = fares.map((fare: any) => ({
          id : fare.id,
          routeId: fare.routeId,
          fromLocation: fare.origin?.name || fare.fromLocationId, 
          toLocation: fare.destination?.name || fare.toLocationId, 
          price: fare.price,
        }));

        setData(formattedData);
      } catch (error) {
        setError("Failed to fetch fares"); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await fetch(`/api/fare/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setData((prevData) => prevData.filter(fare => fare.id !== id)); 
        } else {
          setError('Failed to delete fare');
        }
      } catch (error) {
        setError('An error occurred while deleting');
      }
    }
  };
 
  type Fare = {
    id: string;
    routeId: string;
    fromLocationId: string;
    toLocationId: string;
    fromLocation?: string; 
    toLocation?: string;   
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
      {error && <div className="text-red-500">{error}</div>} 
      <div className="flex items-center justify-between py-4">
        <Button
          className="max-w-sm"
          onClick={() => router.push("/fare/addForm")}
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
                        onClick={() => handleDelete(fare.id)}
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
