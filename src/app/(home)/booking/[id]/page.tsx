import { notFound } from "next/navigation";
import { cars } from "../../_data/cars.data";
import CarCard from "./_components/car-card";
import BranchInfo from "./_components/branch-info";
import Reviews from './_components/reviews'
import BookingSidebar from "./_components/sidebar";

export default async function BookingId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const car = cars.find((car) => car.id === Number(id));
  if (!car) notFound();
  return (
    car && (
      <>
        <section className="container mx-auto mb-4 mt-8 flex gap-4 min-h-[70vh] max-lg:flex-col max-sm:px-4">
          <main className="flex basis-3/4 max-xl:basis-2/3 flex-col gap-4 h-full">
            <h2 className="text-center text-2xl text-brand-base underline-offset-8 underline">
              Car Details
            </h2>
            <CarCard car={car} />
            <h2 className="text-center text-2xl text-brand-base mt-6 underline-offset-8 underline">
              Branch Info
            </h2>
            <BranchInfo />
            <h2 className="text-center text-2xl text-brand-base mt-6 underline-offset-8 underline">
              Reviews
            </h2>
            <Reviews car={car} />
          </main>
          <BookingSidebar car={car} className="basis-1/4 max-xl:basis-1/3" />
        </section>
      </>
    )
  );
}
