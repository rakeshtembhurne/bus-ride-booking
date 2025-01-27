"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For client-side navigation in Next.js
import { toast } from "sonner";

export default function ManagerForm() {
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Add new manager logic
      const response = await fetch("/api/managers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: managerName, email: managerEmail }),
      });

      if (!response.ok) {
        toast.error("Failed to add manager");
      }

      toast.success("Manager added successfully");
      router.push("/dashboard/manager"); // Redirect back to the list
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="mx-auto mt-8 w-full rounded-md bg-white p-6 shadow-md md:w-1/2">
      <h2 className="mb-4 text-lg font-semibold">Add New Manager</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="managerName" className="block text-sm font-medium">
            Manager Name
          </label>
          <input
            type="text"
            id="managerName"
            className="w-full rounded-md border border-gray-300 p-2"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            placeholder="Enter Manager Name"
            required
          />
        </div>

        <div>
          <label htmlFor="managerEmail" className="block text-sm font-medium">
            Manager Email
          </label>
          <input
            type="email"
            id="managerEmail"
            className="w-full rounded-md border border-gray-300 p-2"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            placeholder="Enter Manager Email"
            required
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
              type="button"
              className="rounded-md bg-gray-500 px-4 py-2 text-white"
              onClick={() => router.push("/dashboard/manager")} // Corrected path
            >
              Cancel
            </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Add Manager
          </button>
        </div>
      </form>
    </div>
  );
}
