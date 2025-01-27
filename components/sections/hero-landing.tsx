import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-24">
      <div className="container flex max-w-screen-md flex-col items-center gap-5 text-center">
        <Link
          href="https://next-saas-stripe-starter.vercel.app/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "xl" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🚌</span> 2A Express{" "}
          <span className="mr-3">🚌</span>
        </Link>

        <h1 className="text-balance font-satoshi text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
          Your Destination{" "}
          <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Our Priority!
          </span>
        </h1>

        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          Book your comfortable and affordable bus journey today!
        </p>

        <p>
          2A Express is a new passenger transportation service based in Calgary,
          Alberta, dedicated to meeting the travel needs of surrounding
          communities.{" "}
        </p>
        <p>
          We specialize in providing affordable, safe, and reliable scheduled
          bus services. As a small business, our focus is on connecting Calgary
          and Red Deer with convenient stops in the towns along the route. We
          aim to offer a dependable travel option that fosters community
          connections and supports the mobility of all passengers.
        </p>
        <p>
          {" "}
          We are running a daily service going Calgary to Red Deer in the
          Morning and Red Deer to Calgary in the Evening. The bus starts from
          Calgary at 06:30 am and from Red Deer at 05:00 pm. We will put updates
          here as the service expands to other times of the day.
        </p>
      </div>
    </section>
  );
}
