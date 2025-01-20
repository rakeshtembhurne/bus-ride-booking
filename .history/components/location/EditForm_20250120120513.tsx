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
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  const locationId = searchParams?.get("id") || "";
  const router = useRouter();

  useEffect(() => {
    if (locationId) {
      const locationName = searchParams?.get("name") || "";
      setName(locationName);
    }
  }, [locationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Location name is required");
      return;
    }
    try {
      const updatedLocation = await updateLocation(locationId, name);
      toast.success("Location updated successfully");
      router.push("/dashboard/locations");
    } catch (error) {
      toast.error("Error updating location");
    }
  };

  return (
    <div className="w-full max-w-lg p-4 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}