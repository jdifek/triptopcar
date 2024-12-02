import { notFound } from "next/navigation";
import { cars } from "../../_data/cars.data";
import CarCard from "./_components/car-card";
import Reviews from './_components/reviews'
import BookingSidebar from "./_components/sidebar";
import BookCar from "./_components/bookCar";
import PhotoCar from "./_components/PhotoCar";

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
            <CarCard car={car} />
            {/* <PhotoCar car={car} /> */}
            <Reviews car={car} />
          </main>
          <BookingSidebar car={car} className="basis-1/4 max-xl:basis-1/3" />
        </section>
      </>
    )
  );
}
