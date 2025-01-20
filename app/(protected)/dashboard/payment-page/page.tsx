import { handlePayment } from "../../../../actions/payment";
export default function PaymentSuccess({
    searchParams: { amount },
}: {
    searchParams: { amount: string };
}) {
    return (
        <form action={handlePayment} method="post" className="p-10">
        <h1 className="text-2xl font-bold mb-4">Enter Payment Amount</h1>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          className="border p-2 rounded-md w-full mb-4"
          required
          min="1"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Proceed to Payment
        </button>
      </form>
    );
}
