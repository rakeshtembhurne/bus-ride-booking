import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import TransactionsList from "@/components/manager/TransactionsList";

export const metadata = constructMetadata({
  title: "Manager – Next Template",
  description: "Manager page for only manage management.",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Fetch the data on the server side
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/managers`);
  const data = await response.json();

  const pageIndex = 1;
  const pageSize = 10; 

  return (
    <>
      <div className="flex flex-col gap-5">
      <TransactionsList initialData={data} pageIndex={pageIndex} pageSize={pageSize} />
      </div>
    </>
  );
}
