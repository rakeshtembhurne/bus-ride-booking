"use client"

import { DataTableDemo } from "@/components/fare/fare-data-table"

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Fare Data Table</h1>
      <DataTableDemo />
      <Button
          onClick={() => router.push("/fare/addForm")
          }
        >
          Add Fare
        </Button>
    </div>
  )
}
