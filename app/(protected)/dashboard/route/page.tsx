import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import RoutesList from "@/components/route/TransactionsList"; // Assuming the correct path for RoutesList

export const metadata = constructMetadata({
  title: "Routes – Next Template", // Updated title for Routes
  description: "Routes management page for managing routes.",
});

// Server-side rendering using async function
export default async function AdminPage() {
  // Authenticate the user
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  // Fetch the route data from the API
  const pageIndex = 1; // Initial page index
  const pageSize = 10; // Records per page

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/routes?page=${pageIndex}&limit=${pageSize}`, // Adjust API endpoint to fetch routes
      { cache: "no-store" } // Ensures fresh data is fetched for each request
    );

    if (!response.ok) {
      throw new Error("Failed to fetch routes data");
    }

    const result = await response.json();

    return (
      <div className="flex flex-col gap-5">
        <RoutesList
          // Pass the data to the RoutesList component (adjust the props accordingly)
          // initialData={result.data}
          // initialTotal={result.total}
          // pageIndex={pageIndex}
          // pageSize={pageSize}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching routes data:", error);
    // Optionally, render an error page or message
    return (
      <div className="text-center text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }
}
