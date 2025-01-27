"use client"

import { DataTableDemo } from "@/components/fare/fare-data-table"

// Server-side rendering using async function
export default async function AdminPage() {
  // Authenticate the user
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Fare Data Table</h1>
      <DataTableDemo />
      
    </div>
  )
}
