"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"

export default function AddFarePage() {
  const router = useRouter()
  
  // Set up the form with React Hook Form
  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (formData: any) => {
    console.log("Form submitted:", formData)
    // After form submission, navigate back to the fare page
    router.push("/fare")
  }

  const handleCancel = () => {
    // Redirect to the fare page on cancel
    router.push("/fare")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Add Fare</h1>

      {/* Form wrapper from ShadCN */}
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Route Dropdown */}
        <FormField
          name="route"
          control={control}
          rules={{ required: "Route is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="route">Route</FormLabel>
              <FormControl>
                <select
                  id="route"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...field}
                >
                  <option value="">Select Route</option>
                  <option value="316">316</option>
                  <option value="317">317</option>
                  <option value="318">318</option>
                  {/* Add other route options as needed */}
                </select>
              </FormControl>
              <FormMessage>{errors.route?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* From Location Input */}
        <FormField
          name="fromLocation"
          control={control}
          rules={{ required: "From Location is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="fromLocation">From Location</FormLabel>
              <FormControl>
                <input
                  id="fromLocation"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.fromLocation?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* To Location Input */}
        <FormField
          name="toLocation"
          control={control}
          rules={{ required: "To Location is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="toLocation">To Location</FormLabel>
              <FormControl>
                <input
                  id="toLocation"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.toLocation?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Price Input */}
        <FormField
          name="price"
          control={control}
          rules={{ required: "Price is required", valueAsNumber: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="price">Price</FormLabel>
              <FormControl>
                <input
                  id="price"
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-between">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
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
      </Form>
    </div>
  )
}
