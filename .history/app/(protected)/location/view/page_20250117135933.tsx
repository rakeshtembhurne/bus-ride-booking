// /home/ptspl21/Bus-Booking/bus-ride-booking/app/location/view/[id]/page.tsx

import { useRouter } from 'next/router';

export default function LocationViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div>
      <h1>Viewing Location {params.id}</h1>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}
