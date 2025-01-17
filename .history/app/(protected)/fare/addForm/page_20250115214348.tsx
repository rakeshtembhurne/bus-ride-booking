"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddFarePage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    route: "",
    fromLocation: "",
    toLocation: "",
    price: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Perform form submission logic here
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Route Dropdown */}
        <div>
          <label htmlFor="route" className="block text-sm font-medium text-gray-700">
            Route
          </label>
          <select
            id="route"
            name="route"
            value={formData.route}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Route</option>
            <option value="316">316</option>
            <option value="317">317</option>
            <option value="318">318</option>
            {/* Add other route options as needed */}
          </select>
        </div>

        {/* From Location Input */}
        <div>
          <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700">
            From Location
          </label>
          <input
            type="text"
            id="fromLocation"
            name="fromLocation"
            value={formData.fromLocation}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* To Location Input */}
        <div>
          <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700">
            To Location
          </label>
          <input
            type="text"
            id="toLocation"
            name="toLocation"
            value={formData.toLocation}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

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
      </form>
    </div>
  )
}
