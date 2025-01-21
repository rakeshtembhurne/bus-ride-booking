import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function DataTableDemo() {
  const [data, setData] = useState<Fare[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]); // Add routes state here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [fromLocation, setfromLocation] = useState("");
  const [toLocation, settoLocation] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const router = useRouter();

  const totalPages = Math.ceil(total / pageSize);

  // Fetch data and routes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/fare/List-fare?page=${pageIndex}&limit=${pageSize}`
        );
        if (!response.ok) throw new Error("Failed to fetch fares");

        const { data, total } = await response.json(); // Destructure here

        const formattedData = data.map((fare: any) => ({
          id: fare.id,
          routeId: fare.routeId,
          fromLocation: fare.origin?.name || fare.fromLocationId,
          toLocation: fare.destination?.name || fare.toLocationId,
          price: fare.price,
        }));

        setData(formattedData);
        setTotal(total); // Ensure you are setting the total count
      } catch (error) {
        setError("Failed to fetch fares");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageIndex, pageSize]);

  // Fetch routes data
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`/api/routes`);
        if (response.ok) {
          const routesData = await response.json();
          setRoutes(routesData); // Set the routes state
        } else {
          setError("Failed to fetch routes");
        }
      } catch (error) {
        setError("Failed to fetch routes");
      }
    };

    fetchRoutes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this fare?")) {
      try {
        const response = await fetch(`/api/fare/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setData((prevData) => prevData.filter((fare) => fare.id !== id));
        } else {
          setError("Failed to delete fare");
        }
      } catch (error) {
        setError("An error occurred while deleting");
      }
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setfromLocation("");
    settoLocation("");
    setError("");
    setViewMode(false);
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

  type Route = {
    id: string;
    origin: { name: string };
    destination: { name: string };
  };

  const columns = [
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

  return (
    <div className="w-full">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex items-center justify-between py-4">
        <Button className="max-w-sm" onClick={() => router.push("/fare/addForm")}>
          Add Fare
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((fare) => {
                // Find the route corresponding to the fare's routeId
                const route = routes.find((route) => route.id === fare.routeId);

                return (
                  <TableRow key={fare.id}>
                    <TableCell>
                      {/* Show the route's origin and destination names */}
                      {route
                        ? `${route.origin?.name} to ${route.destination?.name}`
                        : `Route ${fare.routeId}`}
                    </TableCell>
                    <TableCell>{fare.fromLocation}</TableCell>
                    <TableCell>{fare.toLocation}</TableCell>
                    <TableCell>{fare.price}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="link"
                          onClick={() => {
                            setfromLocation(fare.fromLocation || "");
                            settoLocation(fare.toLocation || "");
                            setViewMode(true);
                            setIsOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => router.push(`/fare/edit/${fare.id}`)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="link" onClick={() => handleDelete(fare.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
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
