import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

async function updateFare(
  fareId: string,
  fromLocation: string,
  toLocation: string,
  price: number
) {
  console.log("Sending update request:", { fareId, fromLocation, toLocation, price });

  const response = await fetch(`/api/fare/${fareId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fromLocation, toLocation, price }),
  });
  console.log("API response status:", response.status);

  if (!response.ok) {
    toast.error("Failed to update fare");
  }
  return response.json();
}

export default function FareForm() {
  const [fareId, setFareId] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const idFromPath = pathParts[pathParts.length - 1];
    setFareId(idFromPath);

    const fromLocation = searchParams.get("fromLocation");
    const toLocation = searchParams.get("toLocation");
    const price = searchParams.get("price");

    if (fromLocation) setFromLocation(fromLocation);
    if (toLocation) setToLocation(toLocation);
    if (price) setPrice(Number(price)); // Parse price as a number
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!fareId || fareId === "create") {
        toast.error("Valid fare ID is required.");
      }

      await updateFare(fareId, fromLocation, toLocation, price);
      toast.success("Fare updated successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Fare</h1>
      <form onSubmit={handleSubmit}>
        <label>
          From Location:
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          To Location:
          <input
            type="text"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Fare"}
        </button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
}
