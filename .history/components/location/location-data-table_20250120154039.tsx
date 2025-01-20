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


export function DataTableDemo() {
  const [locations, setLocations] = React.useState<{ id: string; name: string }[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()  // Call useRouter at the top of the component
  const [error, setError] = React.useState<string | null>(null); // Add error state


  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await fetch(`/api/locations/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLocations((prevLocations) => prevLocations.filter(location => location.id !== id));
        } else {
          setError('Failed to delete location');
        }
      } catch (error) {
        setError('An error occurred while deleting');
      }
    }
  };


  const handleEdit = (location: { id: string }) => {
    router.push(`/location/edit/${location.id}`);
  };


  
  React.useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();

        if (response.ok) {
          setLocations(data); // Set the locations in state
        } else {
        }
      } catch (error) {
      }
    }

    fetchLocations();
  }, []); 

  const columns: ColumnDef<{ id: string; name: string }>[] = [
    {
      accessorKey: "name", 
      header: "Name", 
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      id: "actions", 
      header: () => <div className="text-right">Actions</div>, 
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="link"
            onClick={() => alert(`View ${row.getValue("name")}`)} 
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button onClick={() => handleEdit({ id: row.original.id })} variant="outline">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={() => handleDelete(row.original.id)} variant="outline">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: locations, 
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
          onClick={() => router.push("/location/addForm")} 
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
  )
}
