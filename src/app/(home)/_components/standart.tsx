import clsx from "clsx";
import { SetStateAction } from "react";

interface StandartConditionsProps {
  className?: string;
  isPremium: boolean;
  setIsPremium: React.Dispatch<SetStateAction<boolean>>;
}

const StandartConditions: React.FC<StandartConditionsProps> = ({
  className,
  isPremium,
  setIsPremium
}) => {
  return (
    <div
      className={clsx(
        "bg-white p-4 rounded-md flex flex-col items-start",
        className
      )}
    >
      <h2 className="font-bold text-[18px] text-slate-700 inline-flex items-center">
        <input
          type="checkbox"
          className="w-5 h-5 mr-2"
          checked={!isPremium}
          onChange={(e) => {
            if(e.target.checked && isPremium) {
              setIsPremium(false);
            }
          }}
        />{" "}
        Standart Conditions {"("}included{")"}
      </h2>
      <ul className="list-disc text-slate-700 pl-5 font-medium mt-5 text-[15px]">
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
        <li>
          Clean car when pick-up, and clean car when drop-off or pay for car
          wash
        </li>
      </ul>
    </div>
  );
};

export default StandartConditions;
