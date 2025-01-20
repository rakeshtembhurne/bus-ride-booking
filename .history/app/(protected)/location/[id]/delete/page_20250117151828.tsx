// /app/(protected)/location/[id]/delete/page.tsx

import { useParams } from 'next/navigation';

export default function DeleteLocationPage() {
  const { id } = useParams();  // useParams() gives access to dynamic route parameters

  const handleDelete = async () => {
    const response = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
    if (response.ok) {
      // Redirect after successful delete
      window.location.href = '/locations'; // or use another method to redirect
    } else {
      console.error('Failed to delete location');
    }
  };

  return (
    <div>
      <h1>Are you sure you want to delete the location {id}?</h1>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={() => window.location.href = '/locations'}>No</button>
    </div>
  );
}
