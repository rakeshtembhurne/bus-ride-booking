"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, FormProvider } from "react-hook-form"
import axios from "axios"  // Axios for HTTP requests
import { useSession } from "next-auth/react"
import { fareSchema } from "@/lib/validations/fare"  // Import your Zod schema

// Define the form field types
type FareFormValues = {
  route: string;
  fromLocation: string;
  toLocation: string;
  price: string;
};

export default function AddFarePage() {
  const router = useRouter()

  // Use the correct type for useForm
  const methods = useForm<FareFormValues>() // Storing the full methods object
  const { control, handleSubmit, formState: { errors } } = methods
  const { data: session } = useSession();
  const userId = session?.user?.id; // Replace "user?.id" with the correct property

  const onSubmit = async (data: FareFormValues) => {
    try {
      // Validate the form data using the schema
      const validatedData = fareSchema.parse({
        routeId: data.route,
        fromLocationId: data.fromLocation,
        toLocationId: data.toLocation,
        price: parseFloat(data.price),
        createdByUserId: userId || "", // Assuming `userId` is fetched from the session
      });

      // Send validated data to the API using Axios
      const response = await axios.post('/api/fare/addForm/route', validatedData);
      console.log('Fare added successfully:', response.data);
      router.push("/fare");
    } catch (error) {
      console.error('Error adding fare:', error);
    }
  };

  return (
    <FormProvider {...methods}> {/* Spread the entire methods object */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Add Fare</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Route Dropdown */}
          <div>
            <label htmlFor="route" className="block text-sm font-medium text-gray-700">
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
                  <option value="316">316</option>
                  <option value="317">317</option>
                  <option value="318">318</option>
                </select>
              )}
            />
            {errors.route && <p className="text-sm text-red-600">Route is required</p>}
          </div>

          {/* From Location Input */}
          <div>
            <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700">
              From Location
            </label>
            <Controller
              name="fromLocation"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="fromLocation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              )}
            />
            {errors.fromLocation && <p className="text-sm text-red-600">From Location is required</p>}
          </div>

          {/* To Location Input */}
          <div>
            <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700">
              To Location
            </label>
            <Controller
              name="toLocation"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="toLocation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              )}
            />
            {errors.toLocation && <p className="text-sm text-red-600">To Location is required</p>}
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
            {errors.price && <p className="text-sm text-red-600">Price is required</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => router.push("/fare")}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>

            {/* Submit Button */}
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
