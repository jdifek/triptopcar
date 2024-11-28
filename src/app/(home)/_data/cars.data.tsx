import { Car } from "@/typing/interfaces";

export const cars: Car[] = [
  {
    id: 1,
    imageUrl: "/toyota-fortuner.png",
    name: "Toyota Fortuner",
    carBodyType: "SUV",
    pricePerDay: 1500,
    engineCapacity: 2.4,
    fuelType: "Gasoline",
    seatsQuantity: 4,
    year: 2023,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Fortuner is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
        phone: "+1 234 5678",
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Fortuner! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
        phone: "+1 234 5678",
      },
    ],
  },
  {
    id: 2,
    imageUrl: "/toyota-yaris-ativ.png",
    name: "Toyota Yaris Ativ",
    carBodyType: "Hatchback",
    pricePerDay: 400,
    engineCapacity: 1.2,
    year: 2024,
    fuelType: "Gasoline",
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Yaris Ativ is a gem for traveling around Phuket! We rented this hatchback for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 4,
        phone: "+1 234 5678",
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Yaris Ativ! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
        phone: "+1 234 5678",
      },
    ],
  },
  {
    id: 3,
    imageUrl: "/chevrolet-captiva.png",
    name: "Chevrolet Captiva",
    carBodyType: "SUV",
    pricePerDay: 450,
    engineCapacity: 1.5,
    year: 2021,
    fuelType: "Gasoline",
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
        phone: "+1 234 5678",
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
        phone: "+1 234 5678",
      },
    ],
  },
];
