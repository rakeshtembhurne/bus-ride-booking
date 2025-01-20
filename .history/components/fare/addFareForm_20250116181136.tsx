import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type FareFormValues = {
  route: string;
  fromLocation: string;
  toLocation: string;
  price: string;
};

export default function AddFarePage() {
  const [routes, setRoutes] = useState<any[]>([]); // State to store fetched routes
  const router = useRouter();

  const methods = useForm<FareFormValues>({
    defaultValues: {
      route: '',
      fromLocation: '',
      toLocation: '',
      price: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = methods;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch routes when the component mounts
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/routes');
        const data = await response.json();
        setRoutes(data); // Store the routes in the state
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const onSubmit = async (data: FareFormValues) => {
    try {
      if (!userId) {
        console.error("User is not logged in, cannot submit fare.");
        return;
      }

      const fareData = {
        routeId: data.route,
        fromLocationId: data.fromLocation,
        toLocationId: data.toLocation,
        price: parseFloat(data.price),
        createdByUserId: userId,
      };

      const response = await fetch("/api/fare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fareData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Fare added successfully:", responseData);
      router.push("/fare");
    } catch (error) {
      console.error("Error adding fare:", error);
    }
  };

  return (
    <FormProvider {...methods}>
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
                  {routes.map((route: any) => (
                    <option key={route.id} value={route.id}>
                      {route.origin.name} to {route.destination.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.route && <p className="text-sm text-red-600">Route is required</p>}
          </div>

          {/* From Location, To Location, and Price Inputs */}
          {/* ... your other form fields remain the same ... */}

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
  );
}
