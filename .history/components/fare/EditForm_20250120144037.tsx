"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

async function updateFare(
  id: string,
  routeId: string,
  fromLocation: string,
  toLocation: string,
  price: string
) {
  console.log("Sending update request:", { routeId, fromLocation, toLocation, price });

  const response = await fetch(`/api/locations/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ routeId, fromLocation, toLocation, price }),
  });

  console.log("API response status:", response.status);

  if (!response.ok) {
    toast.error("Failed to update Location");
  }
  return response.json();
}

export default function LocationForm() {
  const [locationId, setLocationId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const idFromPath = pathParts[pathParts.length - 1]; // Extract ID from path
    setLocationId(idFromPath);

    // Extract query parameters for routeId, fromLocation, toLocation, price
    const route = searchParams.get("routeId");
    const from = searchParams.get("fromLocation");
    const to = searchParams.get("toLocation");
    const priceParam = searchParams.get("price");

    if (route) setRouteId(route);
    if (from) setFromLocation(from);
    if (to) setToLocation(to);
    if (priceParam) setPrice(priceParam);
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!locationId || locationId === "create") {
        toast.error("Valid location ID is required.");
        return;
      }

      await updateFare(locationId, routeId, fromLocation, toLocation, price);
      toast.success("Location updated successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setTimeout(() => {
        router.push("/location");
      }, 1500); // Delay to show success message
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-8 w-full md:w-1/2 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Edit Location</h2>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="routeId" className="block text-sm font-medium">
            Route ID
          </label>
          <input
            type="text"
            id="routeId"
            className="w-full rounded-md border border-gray-300 p-2"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            placeholder="Enter Route ID"
            required
          />
        </div>
        <div>
          <label htmlFor="fromLocation" className="block text-sm font-medium">
            From Location
          </label>
          <input
            type="text"
            id="fromLocation"
            className="w-full rounded-md border border-gray-300 p-2"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Enter From Location"
            required
          />
        </div>
        <div>
          <label htmlFor="toLocation" className="block text-sm font-medium">
            To Location
          </label>
          <input
            type="text"
            id="toLocation"
            className="w-full rounded-md border border-gray-300 p-2"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Enter To Location"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="w-full rounded-md border border-gray-300 p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            required
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="rounded-md bg-gray-500 px-4 py-2 text-white"
            onClick={() => router.push("/location")} // Corrected path
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Location"}
          </button>
        </div>
      </form>
    </div>
  );
}
