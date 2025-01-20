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
import { useState, useEffect } from "react";

export function DataTableDemo() {
  const [locations, setLocations] = React.useState<{ id: string; name: string }[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();  // Call useRouter at the top of the component
  const [error, setError] = React.useState<string | null>(null); // Add error state
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [locationName, setManagerName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [locationId, setManagerId] = useState();

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

  const handleCloseDialog = () => {
    setIsOpen(false);
    setManagerName("");
    setError("");
    setEditMode(false);
    setViewMode(false);
  };


  const handleEdit = (location: { id: string; name: string }) => {
    setEditMode(true);
    setManagerId(location.id);
    setManagerName(location.name); // Set the current name
    setIsOpen(true);
  };
  
  const handleSaveEdit = async () => {
    if (!locationName) {
      setError("Both name and email are required");
      return;
    }
  
    try {
      const response = await fetch(`/location/edit/${location.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: locationName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update the locations in state
        setLocations((prevLocations) =>
          prevLocations.map((location) =>
            location.id === id
              ? { ...location, name: locationName }
              : location
          )
        );
        setIsOpen(false); // Close the dialog
        setEditMode(false); // Reset the edit mode
      } else {
        setError('Failed to update location');
      }
    } catch (error) {
      setError('An error occurred while updating the location');
    }
  };

  const handleView = (location: { id: string; name: string }) => {
    setViewMode(true);
    setManagerName(location.name); // Set the name of the location manager (or location name)
    setManagerEmail(location.name); // Replace with the correct email if needed
    setIsOpen(true);
  };

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(`/api/locations?page=${pageIndex}&limit=${pageSize}`);
        const data = await response.json();
        
        if (response.ok) {
          // Check if locations and total are defined before setting state
          if (data.locations && data.total !== undefined) {
            setLocations(data.locations); // Assuming the response has 'locations'
            setTotal(data.total); // Assuming the response contains total number of records
          } else {
            setError('Unexpected response format');
          }
        } else {
          setError('Failed to fetch locations');
        }
      } catch (error) {
        setError('An error occurred while fetching locations');
        console.error(error); // Log the error for debugging
      }
    }
  
    fetchLocations();
  }, [pageIndex, pageSize]);

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
            onClick={() => handleView(row.original)} // Pass the row data to handleView
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
  
  ];

  const totalPages = Math.ceil(total / pageSize);

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
  });

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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
              {table.getRowModel() && table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          Showing {Math.min((pageIndex - 1) * pageSize + 1, total)}–{Math.min(pageIndex * pageSize, total)} of {total} results
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
            disabled={pageIndex === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={pageIndex === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPageIndex(page)}
              >
                {page}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages))}
            disabled={pageIndex === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-md bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">
              {viewMode ? "View Location" : editMode ? "Edit Location" : ""}
            </h3>
            {viewMode && (
              <>
                <p>
                  <strong>Location Name:</strong> {managerName}
                </p>
              </>
            )}
            <div className="mt-6 text-right">
              <button
                className="rounded-md bg-gray-500 px-4 py-2 text-white"
                onClick={handleCloseDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
