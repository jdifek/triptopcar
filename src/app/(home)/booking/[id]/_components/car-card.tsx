import CalendarIcon from "@/components/icons/calendar-days-icon";
import EngineIcon from "@/components/icons/engine-icon";
import FuelIcon from "@/components/icons/fuel-icon";
import SeatIcon from "@/components/icons/seat-icon";
import TransmissionIcon from "@/components/icons/transmission-icon";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CarCardProps {
  className?: string;
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ className, car }) => {
  return (
    <article
      className={clsx(
        "bg-white p-5 rounded-lg flex flex-col items-start",
        className
      )}
    >
      <header className="flex items-center max-sm:mx-auto gap-3">
        <h3>
          <span className="bg-base-bg-blue mr-4 rounded-sm px-2 py-1.5 text-base">
            {car.carBodyType.toUpperCase()}
          </span>
          <span className="text-lg">{car.name} or Similar</span>
        </h3>
      </header>
      <main className="flex items-start w-full gap-24 max-md:gap-8 max-sm:flex-col max-sm:items-center max-sm:text-center">
        <div className="flex flex-col items-start max-sm:items-center mt-8">
          <Image
            src={car.imageUrl}
            alt={`${car.name} Image`}
            width={250}
            height={250}
          />
          <ul className="flex items-center justify-between gap-4">
            <li className="flex items-center gap-3 text-lg">
              <SeatIcon className="w-7 h-7" />
              {car.seatsQuantity}
            </li>
            <li className="flex items-center gap-3 text-lg">
              <CalendarIcon className="w-7 h-7" /> {car.year}
            </li>
            <li className="flex items-center gap-3 text-lg">
              <EngineIcon className="w-7 h-7" /> {car.engineCapacity}L
            </li>
          </ul>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-lg mt-4">
              <TransmissionIcon className="w-7 h-7" />
              {car.transmissionType}
            </div>
            <div className="flex items-center gap-4 text-lg mt-4">
              <FuelIcon className="w-7 h-7" />
              {car.fuelType}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start my-auto">
          <h4 className="text-lg font-bold text-slate-700">Rental includes</h4>
          <div className="grid grid-cols-2 grid-rows-3 mt-3 gap-x-24 gap-y-3 max-xl:flex max-xl:flex-col max-[350px]:text-sm">
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Confirmed within 48 hours</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Add 1 driver free</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Full to Full</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Time-Limited Free Cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Include Third Party Liability</span>
            </div>
            <div className="flex items-center gap-3 text-base-black-secondary">
              <CheckCircle2 />
              <span>Unlimited Mileage</span>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
};

export default CarCard;
