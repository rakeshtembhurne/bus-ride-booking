"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { useSession } from "next-auth/react"

// Define the form field types
type FareFormValues = {
  route: string;
  fromLocation: string;
  toLocation: string;
  price: string;
};

export default function AddFarePage() {
  const router = useRouter()

  // Initialize the form methods
  
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleSubmit = async (data: FareFormValues) => {
    try {
      // Check if userId exists
      if (!userId) {
        console.error("User is not logged in, cannot submit fare.");
        return;
      }

      // Prepare the data to be sent
      const fareData = {
        routeId: data.route,
        fromLocationId: data.fromLocation,
        toLocationId: data.toLocation,
        price: parseFloat(data.price),
        createdByUserId: userId,
      };

      console.log("Sending data:", fareData);

      // Send the data using fetch
      const response = await fetch('/api/fare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fareData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Fare added successfully:', responseData);
      router.push("/fare");
    } catch (error) {
      console.error('Error adding fare:', error);
    }
  };

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
}
