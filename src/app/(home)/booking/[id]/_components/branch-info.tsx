"use client";

import clsx from "clsx";
import { Clock3Icon, LocateFixedIcon } from "lucide-react";
import { useState } from "react";

interface BranchInfoProps {
  className?: string;
}

const BranchInfo: React.FC<BranchInfoProps> = ({ className }) => {
  const [tab, setTab] = useState<"pick-up" | "drop-off">("pick-up");

  return (
    <div
      className={clsx(
        "bg-white rounded-lg flex flex-col items-start p-5",
        className
      )}
    >
      <header className="flex justify-between items-center py-3 px-6 max-[500px]:px-2 gap-8 max-[500px]:gap-3 max-[500px]:mx-auto max-[350px]:flex-col">
        <button
          onClick={() => setTab("pick-up")}
          className={clsx(
            "flex items-center gap-2 font-medium text-xl max-[500px]:text-base",
            tab === "pick-up" && "text-brand-base underline underline-offset-8"
          )}
        >
          Pick-up Branch
        </button>
        <hr className="h-full w-0.5 bg-tertiary-gray" />
        <button
          onClick={() => setTab("drop-off")}
          className={clsx(
            "flex items-center gap-2 font-medium text-xl max-[500px]:text-base",
            tab === "drop-off" && "text-brand-base underline underline-offset-8"
          )}
        >
          Drop-off Branch
        </button>
      </header>
      <main>
        {tab === "pick-up" ? (
          <>
            <div className="flex items-start gap-4 ml-5 mt-5">
              <LocateFixedIcon className="text-gray-600 h-6 w-6" />
              <div className="flex flex-col items-start gap-1">
                <h4 className="font-bold text-lg max-[500px]:text-base text-slate-700">
                  Getting There
                </h4>
                <p className="text-gray-600">
                  In Terminal, within walking distance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 ml-5 mt-5">
              <Clock3Icon className="text-gray-600 h-6 w-6" />
              <div className="flex flex-col items-start gap-1">
                <h4 className="font-bold max-[500px]:text-base text-lg text-slate-700">
                  Business Hours
                </h4>
                <p className="text-gray-600">06:00 - 21:00</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-4 ml-5 mt-5">
              <LocateFixedIcon className="text-gray-600 h-6 w-6" />
              <div className="flex flex-col items-start gap-1">
                <h4 className="font-bold text-lg max-[500px]:text-base text-slate-700">
                  Dropping There
                </h4>
                <p className="text-gray-600">
                  In Terminal, within walking distance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 ml-5 mt-5">
              <Clock3Icon className="text-gray-600 h-6 w-6" />
              <div className="flex flex-col items-start gap-1">
                <h4 className="font-bold max-[500px]:text-base text-lg text-slate-700">
                  Business Hours
                </h4>
                <p className="text-gray-600">06:00 - 21:00</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default BranchInfo;
