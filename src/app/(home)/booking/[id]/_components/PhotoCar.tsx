"use client";

import Image from "next/image";
import { Car } from "@/typing/interfaces";
import dynamic from "next/dynamic";

interface CarCardProps {
  car: Car;
}

const PhotoCar: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg flex flex-row justify-between items-center p-10">
      <Image
        src={car.imageUrl}
        alt={`${car.name} Image`}
        width={200}
        height={200}
      />

      <Image
        src={car.imageUrl}
        alt={`${car.name} Image`}
        width={200}
        height={200}
      />

      <Image
        src={car.imageUrl}
        alt={`${car.name} Image`}
        width={200}
        height={200}
      />

      <Image
        src={car.imageUrl}
        alt={`${car.name} Image`}
        width={200}
        height={200}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(PhotoCar), { ssr: false });
