"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import router from "next/router"

interface Location {
  id: string;
  name: string;
}

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name", 
    header: "Name", 
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    id: "actions", 
    header: "Actions", 
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button onClick={() => router.push(`/location/view/${row.original.id}`)}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Button onClick={() => router.push(`/location/edit/${row.original.id}`)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button onClick={() => handleDelete(row.original.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    ),
  }
];

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this location?")) return;

  try {
    const response = await fetch(`/api/locations/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Update state to remove the deleted location
      setLocations((prev) => prev.filter((location) => location.id !== id));
      alert("Location deleted successfully!");
    } else {
      const errorData = await response.json();
      alert(`Failed to delete location: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error deleting location:", error);
    alert("An unexpected error occurred. Please try again.");
  }
};

export function DataTableDemo() {
  const [locations, setLocations] = React.useState<{ name: string }[]>([]) // State to store fetched locations
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()

  // Fetch locations when component mounts
  React.useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();

        if (response.ok) {
          setLocations(data); // Set the locations in state
        } else {
          console.error("Error fetching locations:", data.error);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }

    fetchLocations();
  }, []); // Empty dependency array to run only once on mount

  const table = useReactTable({
    data: locations, // Use fetched locations as the table data
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
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button
          className="max-w-sm"
          onClick={() => router.push("/location/addForm")} // Navigate to add form page
        >
          Add Location
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
