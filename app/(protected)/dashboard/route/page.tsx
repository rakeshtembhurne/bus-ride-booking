import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import RoutesList from "@/components/route/TransactionsList"; 

export const metadata = constructMetadata({
  title: "Routes – Next Template",
  description: "Routes management page for managing routes.",
});


export default async function AdminPage() {

  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }


  const pageIndex = 1; 
  const pageSize = 10; 

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/routes?page=${pageIndex}&limit=${pageSize}`, 
      { cache: "no-store" } 
    );

    if (!response.ok) {
      throw new Error("Failed to fetch routes data");
    }

    const result = await response.json();

    return (
      <div className="flex flex-col gap-5">
        <RoutesList/>
      </div>
    );
  } catch (error) {
    console.error("Error fetching routes data:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }
}
