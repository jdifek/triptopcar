import clsx from "clsx";
import { X } from "lucide-react";

interface PremiumConditionsProps {
  className?: string;
  onChoose: () => void;
  onCancel: () => void;
  isChoosed?: boolean;
}

const PremiumConditions: React.FC<PremiumConditionsProps> = ({
  className,
  isChoosed,
  onCancel,
  onChoose,
}) => {
  return (
    <div
      className={clsx(
        "bg-white p-4 rounded-md flex flex-col items-start",
        className
      )}
    >
      <h2 className="font-bold text-xl text-slate-700 inline-flex items-center">
        <input
          type="checkbox"
          className="w-5 h-5 mr-2"
          checked={isChoosed}
          onChange={(e) => {
            if (e.target.checked) {
              onChoose();
            } else {
              onCancel();
            }
          }}
        />{" "}
        Premium Conditions
      </h2>
      <ul className="list-disc text-slate-700 pl-5 font-medium mt-5">
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
      <p className="text-base-black-secondary flex items-center justify-end max-xl:justify-start max-md:justify-center gap-2 text-sm mt-5">
        <span className="text-base-black text-2xl font-bold">
          {(() => {
            return new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              minimumFractionDigits: 0,
            }).format(400);
          })()}
        </span>
        <span>per day</span>
      </p>
    </div>
  );
};

export default PremiumConditions;
