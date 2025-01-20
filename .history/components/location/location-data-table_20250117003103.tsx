import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export const columns: ColumnDef<{ id: string; name: string }>[] = [
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
        <Button
          variant="link"
          onClick={() => handleView(row.getValue("id"))} // View action
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Button
          variant="link"
          onClick={() => handleEdit(row.getValue("id"))} // Edit action
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          variant="link"
          onClick={() => handleDelete(row.getValue("id"))} // Delete action
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    ),
  },
]

function DataTableDemo() {
  const [locations, setLocations] = React.useState<{ id: string; name: string }[]>([])
  const router = useRouter()

  // Fetch locations when component mounts
  React.useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch("/api/locations")
        const data = await response.json()

        if (response.ok) {
          setLocations(data)
        } else {
          console.error("Error fetching locations:", data.error)
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
      }
    }

    fetchLocations()
  }, [])

  const handleView = (id: string) => {
    // Navigate to a view page to display the location's details
    router.push(`/location/view/${id}`)
  }

  const handleEdit = (id: string) => {
    // Navigate to the edit form to update the location
    router.push(`/location/editForm/${id}`)
  }

  const handleDelete = async (id: string) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        const response = await fetch(`/api/locations/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          // Filter out the deleted location from the state to update the table
          setLocations((prevLocations) =>
            prevLocations.filter((location) => location.id !== id)
          )
          alert("Location deleted successfully")
        } else {
          const data = await response.json()
          alert(`Failed to delete location: ${data.error}`)
        }
      } catch (error) {
        alert("Error deleting location")
        console.error("Error deleting location:", error)
      }
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button className="max-w-sm" onClick={() => router.push("/location/addForm")}>
          Add Location
        </Button>
      </div>
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
            {locations.length > 0 ? (
              locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="link"
                        onClick={() => handleView(location.id)} // View action
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleEdit(location.id)} // Edit action
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(location.id)} // Delete action
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">No locations found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

