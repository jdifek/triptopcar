"use client";

import { areas } from "@/app/(home)/_data/areas.data";
import { Car } from "@/typing/interfaces";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface BookingSidebarProps {
  className?: string;
  car: Car;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({ className, car }) => {
  const searchParams = useSearchParams();

  const startDate =
    Number(searchParams.get("startDate")) !== 0
      ? Number(searchParams.get("startDate"))
      : new Date().getTime();
  const endDate =
    Number(searchParams.get("endDate")) !== 0
      ? Number(searchParams.get("endDate"))
      : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const locationFrom =
    Number(searchParams.get("locationFrom")) !== 0
      ? Number(searchParams.get("locationFrom"))
      : 1;
  const locationTo =
    Number(searchParams.get("locationTo")) !== 0
      ? Number(searchParams.get("locationTo"))
      : 1;
  const daysQuantity = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const isPremium = searchParams.get("isPremium") === "true";
  const totalPrice = isPremium
    ? daysQuantity * (car.pricePerDay + 400)
    : daysQuantity * car.pricePerDay;

  useEffect(() => {
    if (!(startDate + 1) || !(endDate + 1) || !locationFrom || !locationTo) {
      notFound();
    }
  }, [startDate, endDate, locationFrom, locationTo]);

  return (
    <aside className={clsx("w-full h-full flex flex-col gap-6", className)}>
      <h2 className="text-center text-2xl text-brand-base mt-6 underline-offset-8 underline lg:hidden">
        Booking Details
      </h2>
      <div className="w-full bg-white rounded-lg p-[20px_10px_20px_10px] flex">
        <div className="basis-1/6 flex items-center flex-col">
          <div className="h-[60%] relative flex items-center flex-col translate-y-2">
            <div className="absolute w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
            <hr className="h-full w-0.5 bg-tertiary-gray" />
            <div className="absolute bottom-0 w-2 aspect-square rounded-full bg-tertiary-gray z-[2]" />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="mb-5">
            <h4 className="font-bold text-2xl text-slate-700 mb-4">Pick-up</h4>
            <p className="text-slate-800">
              {new Date(startDate).toLocaleDateString()}
              <br />
              {areas.find((area) => area.id === Number(locationFrom))?.name}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-2xl text-slate-700 mb-4">Drop-off</h4>
            <p className="text-slate-800">
              {new Date(endDate).toLocaleDateString()}
              <br />
              {areas.find((area) => area.id === Number(locationTo))?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg p-5">
        <h3 className="font-bold text-2xl text-slate-700">Price Details</h3>
        <div className="flex w-full items-start justify-between gap-3 mt-4">
          <h4 className="text-lg font-bold text-slate-700">Car rental fee</h4>
          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-slate-700">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  minimumFractionDigits: 0,
                  currency: "THB",
                }).format(totalPrice);
              })()}
            </span>
            <p className="text-gray-500 text-sm">
              Approx.{" "}
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(isPremium ? car.pricePerDay + 400 : car.pricePerDay);
              })()}
              x{daysQuantity} days
            </p>
          </div>
        </div>
        <ul className="list-disc text-slate-700 pl-5 font-medium mt-5">
          <li>1 additional driver</li>
          <li>Unlimited Mileage</li>
          <li>Full to Full</li>
          <li>
            Taxed and fees {"("}including airport tax, customer facility fee,
            tourism tax, and sales tax{")"}
          </li>
          <li>Basic Rental Fee</li>
        </ul>
        <div className="w-full border-t-2 mt-5 pt-5 border-dashed border-tertiary-gray">
          <div className="flex items-start justify-between gap-4">
            <h4 className="font-bold text-xl text-slate-700">Total</h4>
            <h4 className="text-slate-700 font-bold text-xl">
              {(() => {
                return new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(totalPrice);
              })()}
            </h4>
          </div>
          <button className="w-full h-12 bg-brand-base text-white rounded-lg mt-4 hover:border-brand-base hover:bg-white hover:text-brand-base duration-300 border-2 border-transparent hover:font-semibold">
            Book now
          </button>
          <p className="mt-5">
            By proceeding, I acknowledge that I have read and agree to Ulethai`s{" "}
            <span className="text-brand-base">Terms and Conditions</span> and{" "}
            <span className="text-brand-base">Privacy Policy</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default dynamic(() => Promise.resolve(BookingSidebar), { ssr: false });
