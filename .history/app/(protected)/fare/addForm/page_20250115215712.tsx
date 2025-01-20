"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { addFare } from "@/lib/fare" // Import your Prisma-based service function

export default function AddFarePage() {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (formData: any) => {
    try {
      // Prepare the data to be submitted
      const data = {
        routeId: formData.route, // Route ID
        fromLocationId: formData.fromLocation, // From Location ID
        toLocationId: formData.toLocation, // To Location ID
        price: parseFloat(formData.price), // Price as a float
        createdByUserId: "user-id", // Assuming you will set the logged-in user ID here
      }

      const response = await addFare(data) // Call the addFare function to save the data
      if (response.error) {
        console.error(response.error)
      } else {
        console.log("Fare added successfully:", response)
        router.push("/fare") // Navigate after success
      }
    } catch (error) {
      console.error("Error during form submission:", error)
    }
  }

  return (
    <FormProvider {...{ control }}>
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
                  {/* Add more route options */}
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
