"use client";

import clsx from "clsx";
import { notFound, useSearchParams } from "next/navigation";
import { cars } from "../_data/cars.data";
import { useEffect } from "react";

interface CheckoutProps {
  className?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ className }) => {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const timeStart = searchParams.get("timeStart") ?? "10:00";
  const timeEnd = searchParams.get("timeEnd") ?? "10:30";

  const car = cars.find((car) => car.id === Number(carId));
  const isPremium = searchParams.get("isPremium") === "true";
  const startDate =
    new Date(Number(searchParams.get("startDate"))) ?? new Date();
  const endDate = new Date(Number(searchParams.get("endDate"))) ?? new Date();
  const dropoffLocation = searchParams.get("dropoffLocation");
  const pickupLocation = searchParams.get("pickupLocation");
  const fullName = searchParams.get("fullName");
  const phone = searchParams.get("phone");

  useEffect(() => {
    if (
      !car ||
      !carId ||
      !String(isPremium) ||
      !startDate ||
      !endDate ||
      !dropoffLocation ||
      !pickupLocation ||
      !fullName ||
      !phone ||
      !timeStart ||
      !timeEnd
    ) {
      notFound();
    }
  }, [
    car,
    carId,
    isPremium,
    startDate,
    endDate,
    dropoffLocation,
    pickupLocation,
    fullName,
    phone,
    timeStart,
    timeEnd,
  ]);

  return (
    <div className="bg-[#f4f7fa] min-h-[60vh] flex items-center justify-center flex-col gap-8 m-8">
      <div
        className={clsx(
          "bg-white py-5 px-8 rounded-lg shadow-lg w-full max-w-3xl",
          className
        )}
      >
        <h2 className=" text-3xl font-bold text-slate-700 mb-5">
          Checkout Details
        </h2>
        <ul className="flex flex-col list-disc gap-3 mx-auto ml-[1rem]">
          <li>Car: {car?.name}</li>
          <li>Pickup Location: {pickupLocation}</li>
          <li>Dropoff Location: {dropoffLocation}</li>
          <li>Insurance: {isPremium ? "Full" : "Standard"}</li>
          <li>
            Days:{" "}
            {Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)}
          </li>
          <li>Start Date: {startDate.toLocaleDateString()}</li>
          <li>Start Time: {timeStart}</li> {/* Добавлено */}
          <li>End Date: {endDate.toLocaleDateString()}</li>
          <li>End Time: {timeEnd}</li> {/* Добавлено */}
          <li>Full Name: {fullName}</li>
          <li>Phone: {phone}</li>
        </ul>

        <p className="mt-10">
          Await confirmation. Thanks for using our service!
        </p>
      </div>
      <div
        className={clsx(
          "bg-white py-5 px-8 rounded-lg shadow-lg w-full max-w-3xl",
          className
        )}
      >
        <h2 className=" text-3xl font-bold text-slate-700 mb-5">
          Useful information
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          nobis blanditiis ullam animi earum nesciunt veniam, perspiciatis
          laborum consectetur vitae nihil reprehenderit enim est tempore
          perferendis temporibus nemo culpa cumque.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
