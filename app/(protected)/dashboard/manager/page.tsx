import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import TransactionsList from "@/components/manager/TransactionsList";
import ManagerForm from "@/components/manager/ManagerForm";

export const metadata = constructMetadata({
  title: "Manager – Next Template",
  description: "Manager page for only manage management.",
});

// Server-side rendering using async function
export default async function AdminPage() {
  // Authenticate the user
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  // Fetch the manager data from the API
  const pageIndex = 1; // Initial page index
  const pageSize = 10; // Records per page

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/managers?page=${pageIndex}&limit=${pageSize}`,
      { cache: "no-store" } // Ensures fresh data is fetched for each request
    );

    if (!response.ok) {
      throw new Error("Failed to fetch managers data");
    }

    const result = await response.json();

    return (
      <div className="flex flex-col gap-5">
        <TransactionsList
          // initialData={result.data}
          // initialTotal={result.total}
          // pageIndex={pageIndex}
          // pageSize={pageSize}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching managers data:", error);
    // Optionally, render an error page or message
    return (
      <div className="text-center text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }
}
