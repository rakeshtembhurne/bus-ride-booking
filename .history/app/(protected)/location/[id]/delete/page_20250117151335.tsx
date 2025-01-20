// pages/locations/[id]/delete.tsx
import { useRouter } from "next/router";

const DeleteLocationPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the location ID from the URL

  const handleDelete = async () => {
    try {
      // Call your API to delete the location (make sure the API supports this)
      const response = await fetch(`/api/locations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Location deleted successfully.");
        router.push("/locations"); // Redirect after successful delete
      } else {
        alert("Failed to delete location.");
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("An error occurred while deleting the location.");
    }
  };

  return (
    <div>
      <h1>Delete Location</h1>
      <p>Are you sure you want to delete this location?</p>
      <button onClick={handleDelete}>Confirm Delete</button>
      <button onClick={() => router.push("/locations")}>Cancel</button>
    </div>
  );
};

export default DeleteLocationPage;
