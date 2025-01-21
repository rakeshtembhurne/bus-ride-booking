// import { DashboardHeader } from "@/components/dashboard/header"

// const BookingPage = () => {

//     return (
//         <>
//             <DashboardHeader
//                 heading="Ticket Booking"
//             />
//         </>
//     )
// }

// export default BookingPage


import BookingConfirm from "@/components/booking/booking-confirm";
import { DashboardHeader } from "@/components/dashboard/header";
import { getFareById } from "@/lib/fare";
import { getCurrentUser } from "@/lib/session";

interface BookingPageProps {
    params: { id: string }; // Access the dynamic route parameter
    id: string,
    userid: string,
    fare: string,
}

const BookingConfirmation = async ({ params }: BookingPageProps) => {

    const user = await getCurrentUser();

    const { id } = params;

    const bus = await getFareById(id)

    return (
        <>
            <DashboardHeader
                heading="Booking Confirmation"
            />

            <BookingConfirm
                id={bus?.id}
                userid={user?.id}
                fare={bus?.price}
            />
        </>

    );
};

export default BookingConfirmation;
