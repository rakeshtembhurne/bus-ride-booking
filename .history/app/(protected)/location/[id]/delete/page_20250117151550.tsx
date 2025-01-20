// /app/locations/[id]/delete/page.tsx
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function DeleteLocationPage() {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL params

  // You can then call your delete API here
  // Example:
  const handleDelete = async () => {
    const response = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
    if (response.ok) {
      router.push('/locations'); // Redirect after successful delete
    } else {
      console.error('Failed to delete location');
    }
  };

  return (
    <div>
      <h1>Are you sure you want to delete this location?</h1>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => router.push('/locations')}>Cancel</button>
    </div>
  );
}
