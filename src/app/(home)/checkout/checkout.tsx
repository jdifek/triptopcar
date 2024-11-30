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
      !phone
    )
      notFound();
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
  ]);

  return (
    <div className={clsx("bg-white py-5 min-h-[75vh]", className)}>
      <h2 className="text-center text-3xl font-bold text-slate-700 mb-5">Checkout Details</h2>
      <ul className="flex items-center flex-col list-disc gap-3 mx-auto">
        <li>Car: {car?.name}</li>
        <li>Pickup Location: {pickupLocation}</li>
        <li>Dropoff Location: {dropoffLocation}</li>
        <li>Insurance: {isPremium ? "Full" : "Standart"}</li>
        <li>Days: {Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)}</li>
        <li>Start Date: {startDate.toLocaleDateString()}</li>
        <li>End Date: {endDate.toLocaleDateString()}</li>
        <li>Full Name: {fullName}</li>
        <li>Phone: {phone}</li>
      </ul>
      <p className="text-center mt-10">Await for confirmation. Thanks for using our service!</p>
    </div>
  );
};

export default Checkout;
