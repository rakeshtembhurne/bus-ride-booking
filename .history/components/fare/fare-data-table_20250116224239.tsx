"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"


const data: Fare[] = [
  {
    id: "m5gr84i9",
    route: "316",
    fromLocation: "success",
    toLocation: "bsbsb",
    price: 82
  }
]

export type Fare = {
  id: string
  route: string
  fromLocation: string
  toLocation: string
  price: number
}

export const columns: ColumnDef<Fare>[] = [
  {
    accessorKey: "route",
    header: () => <span>Route</span>,  // Wrap in JSX
    cell: ({ row }) => <div>{row.getValue("route")}</div>,
  },
  {
    accessorKey: "fromLocation",
    header: () => <span>From Location</span>,  // Wrap in JSX
    cell: ({ row }) => <div>{row.getValue("fromLocation")}</div>,
  },
  {
    accessorKey: "toLocation",
    header: () => <span>To Location</span>,  // Wrap in JSX
    cell: ({ row }) => <div>{row.getValue("toLocation")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <span>Price</span>,  // Wrap in JSX
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    id: "actions",
    header: () => <span>Actions</span>,  // Wrap in JSX
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button variant="ghost" onClick={() => alert(`Viewing details for ${payment.id}`)}>
          View details
        </Button>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()

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
  })
  const [fares, setFares] = React.useState<Fare[]>([]) // State to store fetched data
  React.useEffect(() => {
    async function fetchFares() {
      try {
        const response = await fetch("/api/fare/List-fare/route")
        if (response.ok) {
          const data = await response.json()
          setFares(data) // Set the fetched fares in state
        } else {
          console.error("Failed to fetch fares")
        }
      } catch (error) {
        console.error("Error fetching fares:", error)
      }
    }
    fetchFares()
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button onClick={() => router.push("/fare/addForm")}>
          Add Fare
        </Button>
      </div>
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
                      : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
  {fares.length > 0 ? (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {cell.getValue()}  {/* Use getValue() instead of render */}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center">
        No results.
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}