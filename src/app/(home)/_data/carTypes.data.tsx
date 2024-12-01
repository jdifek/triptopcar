import Hatchback from "@/components/icons/car-types/hatchback";
import Pickup from "@/components/icons/car-types/pickup";
import Sedan from "@/components/icons/car-types/sedan";
import SUV from "@/components/icons/car-types/suv";
import Van from "@/components/icons/car-types/van";
import { CarBodyType } from "@/typing/interfaces";

export const carTypes: CarBodyType[] = [
  {
    icon: <Hatchback className="scale-125" />,
    name: "Hatchback",
    startPrice: 120,
    id: 2,
  },
  {
    icon: <Sedan className="scale-125" />,
    name: "Sedan",
    startPrice: 100,
    id: 1,
  },
  { icon: <SUV className="scale-125" />, 
   name: "SUV", 
   startPrice: 160, 
   id: 4 },
  {
    icon: <Pickup className="scale-125" />,
    name: "Pickup",
    startPrice: 200,
    id: 6,
  },
  { icon: <Van className="scale-125" />, 
   name: "Van", 
   startPrice: 180, 
   id: 5 },
];
