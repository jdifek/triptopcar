export interface Area {
  id: number;
  name: string;
  deliveryPrice: number;
}

export interface Car {
  id: number;
  imageUrl: string;
  name: string;
  deposit: number;
  carBodyType: CarBodyType["name"];
  pricePerDay: number;
  engineCapacity: number;
  year: number;
  fuelType: "Gasoline A95" | "Diesel" | "Electric";
  seatsQuantity: number;
  transmissionType: "Automatic" | "Manual";
  reviews?: Review[];
}

export interface Review {
  id: number;
  name: string;
  phone: string;
  review: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface CarBodyType {
  id: number;
  name: "Sedan" | "Hatchback" | "SUV" | "Van" | "Pickup";
  icon: JSX.Element;
  startPrice: number;
}
