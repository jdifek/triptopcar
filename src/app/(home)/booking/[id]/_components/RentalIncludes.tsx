"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const RentalIncludes = () => {
  const params = useSearchParams();

  const premium = params.get("isPremium") === "true"; // Проверяем строку 'true'

  return (
    <div className="flex flex-col items-start w-full max-sm:w-full -mt-7">
      <h4 className="text-xl font-bold text-slate-700">Rental includes</h4>
      {!premium ? (
        <ul className="list-disc text-slate-700 pl-5 font-medium mt-5 text-[16px] text-left">
          <li>Free cancel up to 24 hours</li>
          <li>Hijack insurance</li>
          <li>
            {Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(5000)}{" "}
            Franchise
          </li>
          <li>Fuel Policy same as when pick-up</li>
          <li>Clean car when pick-up, and clean car when drop-off or pay for car wash</li>
        </ul>
      ) : (
        <ul className="list-disc text-slate-700 text-[15px] pl-5 font-medium mt-5">
          <li>Free cancel up to 48 hours</li>
          <li>Full Insurance</li>
          <li>Hijack insurance</li>
          <li>Civil liability insurance</li>
          <li>Crash insurance</li>
          <li>No Insurance franchise</li>
          <li>Second driver free</li>
          <li>Mileage without restrictions</li>
          <li>24/7 online support</li>
        </ul>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(RentalIncludes), { ssr: false });
