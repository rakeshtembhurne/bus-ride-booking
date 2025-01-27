import GoogleFormEmbed from "@/components/sections/google-form";

export default function IndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Terms and Conditions for Scheduled Passenger Bus Service
      </h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. General Information</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            These terms and conditions (&quot;Terms&quot;) apply to all
            passengers using our scheduled passenger bus services
            (&quot;Service&quot;). By purchasing a ticket or boarding a bus, you
            agree to these Terms.
          </li>
          <li>
            The Service is operated in accordance with applicable Canadian laws
            and regulations.
          </li>
          <li>
            The Service provider (&quot;Company&quot;) reserves the right to
            amend these Terms at any time without prior notice. Updated Terms
            will be posted on our website and apply immediately upon posting.
          </li>
          <li>
            The information available on the Company’s official website (
            <a href="https://2aexpress.ca" className="text-blue-500 underline">
              2aexpress.ca
            </a>
            ) is considered the most accurate and up-to-date. In case of any
            discrepancies, the information on the website takes precedence over
            all other sources, including advertisements or third-party
            communications.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          2. Tickets and Reservations
        </h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Passengers must purchase a valid ticket before boarding the bus.
            Tickets are non-transferable.
          </li>
          <li>
            Tickets must be presented to the driver or Company representative
            upon request. Failure to provide a valid ticket may result in
            refusal of service.
          </li>
          <li>
            Refunds and exchanges are subject to the Company’s refund policy,
            which may vary depending on the ticket type and purchase terms.
          </li>
          <li>
            The Company is not responsible for lost, stolen, or damaged tickets.
          </li>
          <li>
            Passengers unable to sit within their seat space without encroaching
            into adjacent seats must purchase a second seat.
          </li>
          <li>
            First-row seats are reserved for elderly and disabled passengers.
            Drivers have discretion in implementing this policy.
          </li>
          <li>
            Child safety seats equipped with a 3-point harness may be used,
            provided a ticket is purchased for the seat. Passengers are
            responsible for bringing and securing the seat.
          </li>
          <li>
            Children aged 13 or older may travel unaccompanied, though parental
            assistance is necessary for boarding and disembarking.
          </li>
          <li>
            Children under 13 must be accompanied by someone at least 16 years
            old.
          </li>
          <li>
            Children under 2 traveling without occupying a seat travel free.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Schedules and Delays</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            The Company will make reasonable efforts to adhere to published
            schedules but does not guarantee departure or arrival times.
          </li>
          <li>
            The Company is not liable for delays or cancellations caused by
            factors beyond its control, including but not limited to weather
            conditions, road closures, mechanical failures, or emergencies.
          </li>
          <li>
            In the event of a delay or cancellation, the Company will make
            reasonable efforts to inform passengers and provide ticket refunds,
            as appropriate.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Passenger Conduct</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Passengers must comply with all instructions from the driver or
            Company representatives.
          </li>
          <li>
            Passengers must behave respectfully and avoid conduct that may
            disturb or endanger others.
          </li>
          <li>
            Smoking, alcohol consumption, and the use of illegal substances are
            strictly prohibited on the bus.
          </li>
          <li>
            Passengers are responsible for the safety of their personal
            belongings. The Company is not liable for lost, stolen, or damaged
            items.
          </li>
          <li>
            The Company reserves the right to refuse service to passengers who
            violate these Terms or pose a safety risk to others.
          </li>
          <li>
            Passengers with strong odors, including perfumes or body odor, may
            also be refused service in consideration of other passengers.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          5. Luggage and Personal Items
        </h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Passengers may bring one (1) personal item (up to 7kg) free of
            charge. Additional 2 pieces of luggage will incur a $20 fee each.
          </li>
          <li>
            Oversized and overweight items such as snowboards, skis, ski poles,
            furniture, or car parts are subject to additional charges.
            Overweight items cannot exceed 25kg per piece. Oversized items are
            defined as baggage over 76cm/30 inches in length and/or 48cm/19
            inches in width.
          </li>
          <li>
            The Company reserves the right to inspect luggage for safety and
            security purposes.
          </li>
          <li>
            The Company is not liable for damage to or loss of luggage unless
            caused by the Company’s negligence. Liability for lost or damaged
            luggage is limited to the maximum amount prescribed by applicable
            laws.
          </li>
          <li>
            Prohibited items, including hazardous materials and illegal goods,
            are not allowed on the bus or in luggage.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          6. Accessibility and Special Assistance
        </h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            The Company strives to provide accessible services for passengers
            with disabilities. Passengers requiring special assistance are
            encouraged to notify the Company at the time of booking.
          </li>
          <li>
            Service animals are permitted on the bus, subject to applicable laws
            and Company policies.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          7. Liability and Limitations
        </h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            The maximum baggage liability is $100 per person/ticket, including
            bikes.
          </li>
          <li>
            The Company’s liability for personal injury, death, or property
            damage is limited to the extent permitted by Canadian law.
          </li>
          <li>
            The Company is not liable for indirect, consequential, or incidental
            damages arising from the use of the Service.
          </li>
          <li>
            Passengers assume all risks associated with travel and are
            encouraged to obtain appropriate travel insurance.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Force Majeure</h2>
        <p>
          The Company is not liable for failure to provide the Service due to
          circumstances beyond its control, including but not limited to natural
          disasters, acts of terrorism, labor disputes, or government actions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Province of Alberta and
          applicable federal laws of Canada. Any disputes arising from these
          Terms or the use of the Service shall be resolved in the courts of
          Alberta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">10. Contact Information</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Phone: <span className="font-medium">825-982-2112</span>
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:contact@2aexpress.ca"
              className="text-blue-500 underline"
            >
              contact@2aexpress.ca
            </a>
          </li>
        </ol>
      </section>

      <p className="mt-8 text-center text-gray-600">
        By using the Service, you acknowledge that you have read, understood,
        and agreed to these Terms and Conditions.
      </p>
    </div>
  );
}
