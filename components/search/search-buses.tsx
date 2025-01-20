"use client";

import React, { useEffect, useState } from "react";
import { EmptyPlaceholder } from "../shared/empty-placeholder";
import AvailableBusCard from "./buses-card";
import { getAllLocations } from "@/lib/location";

interface Location {
    id: string | undefined;
    name: string | undefined;
}

interface Bus {
    id: string;
    route?: {
        vehicle?: {
            name: string | undefined;
            number: string | undefined;
            type: string | undefined;
            seats: number | undefined;
        };
        origin: {
            name: string | undefined;
        };
        destination: {
            name: string | undefined;
        };
        departureTime: string | undefined;
        arrivalTime: string | undefined;
    };
    origin: {
        name: string | undefined;
    };
    destination: {
        name: string | undefined;
    };
    price: number | undefined;
}

const SearchBuses = () => {
    const [locations, setLocations] = useState<Location[]>([]); // Store locations data
    const [loading, setLoading] = useState(true); // Track loading state
    const [availableBuses, setAvailableBuses] = useState<Bus[]>([]); // State for search results


    // Fetch locations from the API
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                console.log("Fetching locations...");
                const response = await fetch("/api/location", {
                    method: "GET", // Ensure GET method is specified
                });
                const data = await response.json();
                console.log(data);

                setLocations(data);
                console.log("Locations fetched successfully:", data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const origin = formData.get("origin") as string;
        const destination = formData.get("destination") as string;

        console.log({ origin, destination });

        if (!origin || !destination) {
            alert("Please select both origin and destination");
            return;
        }

        console.log(`Searching for buses from ${origin} to ${destination}`);

        try {
            const response = await fetch(`/api/search?origin=${origin}&destination=${destination}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch buses.");
            }

            const result: Bus[] = await response.json();
            console.log("Search results:", result);

            if (result.length > 0) {
                setAvailableBuses(result); // Update state with search results
            } else {
                setAvailableBuses([]); // Clear results if no buses are found
                console.log("No buses found for the selected route.");
            }
        } catch (error) {
            console.error("Error searching buses:", error);
        }
    };

    return (
        <>

            <div className="flex items-center justify-center ">
                <form method="get" className=" flex h-[10vh] w-[60vw] rounded-3xl" onSubmit={handleSearch} >

                    {/* Origin Dropdown */}
                    <div className="h-full w-2/5 rounded-3xl">

                        <select
                            id="origin"
                            name="origin"
                            // defaultValue={origin || ""}
                            className="sm:text-md size-full rounded-l-3xl border-gray-300 px-8 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="" disabled>
                                Select Origin
                            </option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Destination Dropdown */}
                    <div className="h-full w-2/5 rounded-3xl bg-slate-500">

                        <select
                            id="desination"
                            name="destination"
                            className="sm:text-md size-full border-gray-300 px-8 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >

                            <option value="" disabled>
                                Select Destination
                            </option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="w-1/5 rounded-r-3xl bg-zinc-900 px-5 py-2 text-lg text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2"
                    >
                        Search
                    </button>
                </form>
            </div>

            <EmptyPlaceholder>
                {availableBuses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableBuses.map((bus) => (
                            <AvailableBusCard
                            id={bus.id}
                            busName={bus.route?.vehicle?.name ?? "Unknown"} // Provide a default value
                            startLocation={bus.route?.origin?.name ?? "Unknown"} // Add optional chaining
                            startTime={bus.route?.departureTime ?? "Unknown"}
                            endLocation={bus.route?.destination?.name ?? "Unknown"}
                            endTime={bus.route?.arrivalTime ?? "Unknown"}
                            vehicleNumber={bus.route?.vehicle?.number ?? "N/A"}
                            userStartLocation={bus.origin?.name ?? "Unknown"}
                            userEndLocation={bus.destination?.name ?? "Unknown"}
                            fare={bus.price}
                            type={bus.route?.vehicle?.type ?? "N/A"}
                            availableSeats={bus.route?.vehicle?.seats ?? 0}
                        />
                        
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <p>No buses found for the selected route.</p>
                    </EmptyPlaceholder>
                )}
            </EmptyPlaceholder>
        </>
    );
};

export default SearchBuses;
