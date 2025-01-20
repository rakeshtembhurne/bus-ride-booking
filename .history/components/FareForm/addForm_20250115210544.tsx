"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes"; // Importing useTheme hook for theme switching

interface AddFormProps {
  onSubmit: (route: string, fromLocation: string, toLocation: string, price: number) => void;
  onCancel: () => void;
}

const AddForm = ({ onSubmit, onCancel }: AddFormProps) => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [route, setRoute] = useState("pending");
  const [locations, setLocations] = useState<{ fromLocation: string; toLocation: string; price: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Theme logic from next-themes
  const { theme } = useTheme();

  // Add or Edit Location
  const handleAddOrEditLocation = () => {
    if (editingIndex !== null) {
      // Edit location
      const updatedLocations = [...locations];
      updatedLocations[editingIndex] = { fromLocation, toLocation, price };
      setLocations(updatedLocations);
    } else {
      // Add new location
      setLocations([...locations, { fromLocation, toLocation, price }]);
    }

    // Close Modal after adding/editing
    setIsModalOpen(false);
    setFromLocation("");
    setToLocation("");
    setPrice(0);
    setEditingIndex(null); // Reset editing index
  };

  // Open Modal for editing
  const handleEditLocation = (index: number) => {
    setFromLocation(locations[index].fromLocation);
    setToLocation(locations[index].toLocation);
    setPrice(locations[index].price);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className={`space-y-4 p-6 rounded-md shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      {/* Route Dropdown */}
      <div>
        <label htmlFor="route" className="block text-sm font-medium">Route</label>
        <Select value={route} onValueChange={setRoute}>
          <SelectTrigger>
            <SelectValue placeholder="Select route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Bus 1 (Nagpur To Pune)</SelectItem>
            <SelectItem value="processing">Bus 2 (Nagpur To Mumbai)</SelectItem>
            <SelectItem value="success">Bus 3 (Mumbai to Pune)</SelectItem>
            <SelectItem value="failed">Bus 4 (Pune to Delhi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add New Location Button */}
      <div className="flex items-center justify-between">
        <Button
          aria-expanded="false"
          className="artdeco-dropdown__trigger artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--3 artdeco-button--tertiary"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            aria-label="Add new location"
          >
            <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z" />
          </svg>
        </Button>
        <span>Add New Location</span>
      </div>

      {/* Modal for Adding/Editing Location */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded-md shadow-lg w-80 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h3 className="text-lg font-medium">
              {editingIndex !== null ? "Edit Location" : "Add New Location"}
            </h3>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="fromLocation" className="block text-sm font-medium">From Location</label>
                <Input
                  id="fromLocation"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="toLocation" className="block text-sm font-medium">To Location</label>
                <Input
                  id="toLocation"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <Input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-gray-500 border-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleAddOrEditLocation}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Locations List */}
      <div className="mt-4">
        {locations.map((location, index) => (
          <div key={index} className="flex justify-between items-center space-x-4 border p-4 rounded-md">
            <div>
              <div>From: {location.fromLocation}</div>
              <div>To: {location.toLocation}</div>
              <div>Price: {location.price}</div>
            </div>
            <Button
              variant="outline"
              onClick={() => handleEditLocation(index)}
              className="text-gray-500 border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-label="Edit location"
              >
                <path d="M17.62 3.38l3 3-12 12-3-3 12-12zM12 15.5l-1.5 1.5L4 9.5l1.5-1.5L12 12l5.5-5.5L19 8.5 12 15.5z" />
              </svg>
            </Button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel} className="text-gray-500 border-gray-300">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(route, fromLocation, toLocation, price)}>Submit</Button>
      </div>
    </div>
  );
};

export default AddForm;
