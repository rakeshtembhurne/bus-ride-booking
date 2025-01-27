import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditLocation = () => {
  const router = useRouter();
  const { id } = router.query; // Get the location ID from the URL

  const [location, setLocation] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the location data when the component mounts
  useEffect(() => {
    if (id) {
      console.log("ID from URL:", id); // Ensure 'id' is correctly captured from URL
      const fetchLocation = async () => {
        try {
          const response = await fetch(`/api/locations/${id}`);
          const data = await response.json();
  
          if (response.ok) {
            setLocation(data);
          } else {
            setError('Location not found');
          }
        } catch (error) {
          setError('Failed to fetch location');
        }
      };
      fetchLocation();
    }
  }, [id]);
  // Handle form submission to update location
  const handleSave = async () => {
    if (location) {
      try {
        const response = await fetch(`/api/locations/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location),
        });
  
        if (response.ok) {
          router.push('/location');
        } else {
          setError('Failed to save location');
        }
      } catch (error) {
        setError('An error occurred while saving the location');
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Location</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={location.name}
            onChange={(e) => setLocation({ ...location, name: e.target.value })}
          />
        </div>
        <div>
          <button type="button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLocation;
