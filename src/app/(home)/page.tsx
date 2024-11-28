import SearchForm from "./_components/search-form";
import CarCatalog from "./_components/car-catalog";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  return (
    <>
      <SearchForm />
      <section className="container mx-auto mb-4 mt-8 flex gap-4 min-h-[70vh] max-md:px-4">
        <aside className="basis-1/4 max-xl:basis-1/3 rounded-2xl text-center max-lg:hidden sticky top-5">
          <div className="w-full rounded-2xl bg-white p-4">
            <Image
              src="/banner.jpeg"
              alt="medical insurance"
              width={500}
              height={500}
              className="rounded-2xl"
            />
            <div className="relative w-full h-full py-4">
              <div className="h-full flex items-center flex-col justify-center">
                Medical insurance to Thailand and 21 other countries with
                insurance coverage of USD 100,000 for only USD 300 per year.
                Your reliable protection against accidents and illnesses abroad
                <Link
                  target="_blank"
                  href="https://wa.me/+66659769300"
                  className="text-blue-400 underline underline-offset-4 mt-2"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex basis-3/4 max-xl:basis-2/3 flex-col gap-4 h-full max-lg:basis-full">
          <CarCatalog />
        </main>
      </section>
    </>
  );
}
