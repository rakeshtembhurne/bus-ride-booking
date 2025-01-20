"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

async function updateLocation(
    locationId : string,
    locationName: string,
) {
  const response = await fetch(`/api/locations/edit/${locationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: locationName}),
  });
  if (!response.ok) {
    toast.error("Failed to update manager");
  }
  return response.json();
}

export default function LocationForm() {
  const [locationId, setLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract managerId from the URL
    const pathParts = window.location.pathname.split("/");
    const idFromPath = pathParts[pathParts.length - 1]; // Adjust based on your URL structure
    setLocationId(idFromPath);

    // Extract query parameters for name and email
    const name = searchParams.get("name");

    if (name) setLocationName(name);
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!locationId || locationId === "create") {
        toast.error("Valid manager ID is required.");
      }

      await updateLocation(locationId, locationName);
      toast.success("Location  updated successfully");
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
          <label htmlFor="managerName" className="block text-sm font-medium">
            Location Name
          </label>
          <input
            type="text"
            id="managerName"
            className="w-full rounded-md border border-gray-300 p-2"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter Manager Name"
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
            {loading ? "Saving..." : "Update Manager"}
          </button>
        </div>
      </form>
    </div>
  );
}
