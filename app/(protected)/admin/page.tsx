"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/ui/admin/InfoCard";
import TransactionsList from "@/components/ui/admin/TransactionsList";

export default function AdminPage() {
  const router = useRouter();
  const [vehicleData, setVehicleData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    setLoading(true);
    setError("");

    try {
      let url = "/api/admin";
      const params = new URLSearchParams();
      if (vehicleName) params.append("vehicleName", vehicleName);
      if (selectedDate) params.append("date", selectedDate);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setVehicleData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Filters */}
      <div className="mb-5 flex flex-col sm:flex-row items-center gap-3">
        <div>
          <label htmlFor="vehicleName" className="text-lg font-semibold">
            Vehicle Name:
          </label>
          <input
            type="text"
            id="vehicleName"
            placeholder="Enter vehicle name"
            className="border rounded-md px-3 py-2 ml-2"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date" className="text-lg font-semibold">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            className="border rounded-md px-3 py-2 ml-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Display data */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {vehicleData && vehicleData.data.length === 0 && <p>No data available</p>}
      {vehicleData && vehicleData.data.length > 0 && (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-4">
            <InfoCard title="Total Seats" value={vehicleData.data.reduce((acc, vehicle) => acc + vehicle.totalSeats, 0)} />
            <InfoCard title="Booked Seats" value={vehicleData.data.reduce((acc, vehicle) => acc + vehicle.bookedSeats, 0)} />
            <InfoCard title="Available Seats" value={vehicleData.data.reduce((acc, vehicle) => acc + vehicle.availableSeats, 0)} />
            <InfoCard title="Total Earnings" value={`$${vehicleData.data.reduce((acc, vehicle) => acc + vehicle.totalEarnings, 0)}`} />
          </div>
          <TransactionsList bookings={vehicleData.data.flatMap(vehicle => vehicle.bookings)} />
        </div>
      )}
    </>
  );
}
