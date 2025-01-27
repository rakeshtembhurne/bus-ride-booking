"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { useSession } from "next-auth/react"

type FareFormValues = {
  route: string;
  fromLocation: string;
  toLocation: string;
  price: string;
};

export default function AddFarePage() {
  const router = useRouter()

  const methods = useForm<FareFormValues>({
    defaultValues: {
      route: '',
      fromLocation: '',
      toLocation: '',
      price: '',
    },
  })

  const { control, handleSubmit, formState: { errors } } = methods
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [routes, setRoutes] = useState<any[]>([]) // List of routes
  const [locations, setLocations] = useState<any[]>([]) // List of locations

  useEffect(() => {
    fetchRoutes();
    fetchLocations(); // Fetch locations for dropdowns
  }, []);
  
  // Fetch routes from API (existing logic)
  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/fare'); // API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched routes:', data);
      setRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  // Fetch locations from API for dropdown
  const [locations, setLocations] = useState<Location[]>([]); // Initialize locations state

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations"); // Adjust to your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch locations");
  
        const locationsData = await response.json();
        setLocations(locationsData); // Save locations in state
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
  
    fetchLocations();
  }, []);
  
  const onSubmit = async (data: FareFormValues) => {
    try {
      if (!userId) {
        console.error("User is not logged in, cannot submit fare.")
        return
      }

      const fareData = {
        routeId: data.route,
        fromLocationId: data.fromLocation,
        toLocationId: data.toLocation,
        price: parseFloat(data.price),
        createdByUserId: "user123",
      }

      console.log("Sending data:", fareData)

      const response = await fetch("/api/fare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fareData),
      })
      
      console.log("Response : ", response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log("Fare added successfully:", responseData)
      router.push("/fare")
    } catch (error) {
      console.error("Error adding fare:", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Add Fare</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Route Dropdown */}
          <div>
            <label
              htmlFor="route"
              className="block text-sm font-medium text-gray-700"
            >
              Route
            </label>
            <Controller
              name="route"
              control={control}
              render={({ field }) => (
                <select
                  id="route"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.origin?.name && route.destination?.name
                        ? `${route.origin.name} to ${route.destination.name} (${route.id})`
                        : `Route ${route.id}`}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.route && (
              <p className="text-sm text-red-600">Route is required</p>
            )}
          </div>

          {/* From Location Dropdown */}
          <div>
            <label
              htmlFor="fromLocation"
              className="block text-sm font-medium text-gray-700"
            >
              From Location
            </label>
            <Controller
              name="fromLocation"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="fromLocation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select From Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.fromLocation && (
              <p className="text-sm text-red-600">From Location is required</p>
            )}
          </div>

          {/* To Location Dropdown */}
          <div>
            <label
              htmlFor="toLocation"
              className="block text-sm font-medium text-gray-700"
            >
              To Location
            </label>
            <Controller
              name="toLocation"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="toLocation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select To Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.toLocation && (
              <p className="text-sm text-red-600">To Location is required</p>
            )}
          </div>

          {/* Price Input */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              )}
            />
            {errors.price && (
              <p className="text-sm text-red-600">Price is required</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/fare")}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
