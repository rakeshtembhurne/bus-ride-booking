'use client';
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from 'react';
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
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ensure this path is correct

export type Manager = {
  id: string;
  name: string;
  email: string;
};

export default function TransactionsList() {
  const [data, setData] = useState<Manager[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [managerId, setManagerId] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pageIndex, setPageIndex] = useState(1);  // State to hold the current page index
  const [pageSize, setPageSize] = useState(10);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(/api/managers?page=${pageIndex}&limit=${pageSize});
        const result = await response.json();
        setData(result.data); // Update state with the data array
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };
  
    fetchData();
  }, [pageIndex, pageSize]); // Fetch data whenever pageIndex or pageSize changes
  

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setManagerName('');
    setManagerEmail('');
    setError('');
    setSuccess('');
    setEditMode(false);
    setViewMode(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editMode) {
        const response = await fetch(/api/managers/${managerId}, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: managerName, email: managerEmail }),
        });
        if (response.ok) {
          setSuccess('Manager updated successfully');
          const updatedData = await response.json();
          setData((prevData) => prevData.map(manager => manager.id === managerId ? updatedData : manager));
        } else {
          setError('Failed to update manager');
        }
      } else {
        const response = await fetch('/api/managers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: managerName, email: managerEmail }),
        });
        if (response.ok) {
          setSuccess('Manager added successfully');
          const newManager = await response.json();
          setData((prevData) => [...prevData, newManager]);
        } else {
          setError('Failed to add manager');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred');
    } finally {
      handleCloseDialog();
    }
  };

  const handleEdit = (manager: Manager) => {
    setEditMode(true);
    setManagerId(manager.id);
    setManagerName(manager.name);
    setManagerEmail(manager.email);
    setIsOpen(true);
  };

  const handleView = (manager: Manager) => {
    setViewMode(true);
    setManagerId(manager.id);
    setManagerName(manager.name);
    setManagerEmail(manager.email);
    setIsOpen(true);
  };

  const handleDelete = async (managerId: string) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      try {
        const response = await fetch(/api/managers/${managerId}, {
          method: 'DELETE',
        });
        if (response.ok) {
          setData((prevData) => prevData.filter(manager => manager.id !== managerId));
        } else {
          setError('Failed to delete manager');
        }
      } catch (error) {
        console.error('Error deleting manager:', error);
        setError('An error occurred while deleting');
      }
    }
  };

  const columns: ColumnDef<Manager>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleView(row.original)} variant="outline">
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button onClick={() => handleEdit(row.original)} variant="outline">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={() => handleDelete(row.original.id)} variant="outline">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];

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

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Manager List</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenDialog}
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ring-offset-background select-none bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 rounded-md "
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Manager
        </button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {table.getRowModel().rows?.length ? (
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

     <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          {/* Page Numbers */}
          {(() => {
            const totalPages = table.getPageCount();
            const currentPage = table.getState().pagination.pageIndex;
            const pageButtons = [];
            const maxButtons = 4; // Number of buttons to show
            const half = Math.floor(maxButtons / 2);

            let start = Math.max(0, currentPage - half);
            let end = Math.min(totalPages, currentPage + half + 1);

            // Adjust start and end if there are not enough pages
            if (end - start < maxButtons) {
              if (start === 0) {
                end = Math.min(maxButtons, totalPages);
              } else if (end === totalPages) {
                start = Math.max(0, totalPages - maxButtons);
              }
            }

            for (let index = start; index < end; index++) {
              pageButtons.push(
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(index)}
                  disabled={index === currentPage}
                >
                  {index + 1}
                </Button>
              );
            }

            return pageButtons;
          })()}

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

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50">
          <div className={fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white text-black rounded-md max-w-sm w-full z-50}>
            <h3 className="text-lg font-semibold">{editMode ? 'Edit Manager' : viewMode ? 'View Manager' : 'Add a New Manager'}</h3>

            {viewMode ? (
              <div>
                <p><strong>Name:</strong> {managerName}</p>
                <p><strong>Email:</strong> {managerEmail}</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="managerName" className="block font-medium text-sm">
                      Manager Name
                    </label>
                    <input
                      type="text"
                      id="managerName"
                      name="managerName"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      placeholder="Enter Manager Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="managerEmail" className="block font-medium text-sm">
                      Manager Email
                    </label>
                    <input
                      type="email"
                      id="managerEmail"
                      name="managerEmail"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      placeholder="Enter Manager Email"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md"
                  >
                    {editMode ? 'Update Manager' : 'Add Manager'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}