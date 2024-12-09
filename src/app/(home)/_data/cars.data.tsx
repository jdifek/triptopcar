import { Car } from "@/typing/interfaces";

export const cars: Car[] = [
  {
    id: 1,
    imageUrl: "/honda_jazz.png",
    name: "Honda Jazz",
    carBodyType: "Hatchback",
    pricePerDay: 700,
    engineCapacity: "1.0 Turbo",
    fuelType: "Gasoline A95",
    seatsQuantity: 4,
    deposit: 6000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "I recently rented a Honda Jazz for my trip to Phuket, and I couldn't be happier with my choice. The car was in excellent condition, clean, and well-maintained. It handled beautifully on the winding roads and offered great fuel efficiency, which was a big plus for our long drives across the island.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "The rental process was smooth and hassle-free. The staff were friendly, professional, and very helpful in providing all the necessary information. They even gave us some great tips on places to visit and the best routes to take.",
        rating: 5,
      },
      {
        id: 3,
        name: "Emily Johnson",
        review:
          "The Honda Jazz itself was the perfect size for our needs. It comfortably accommodated all our luggage and provided a smooth and comfortable ride for both city driving and exploring the more remote parts of Phuket.",
        rating: 5,
      },
      {
        id: 4,
        name: "Emily Johnson",
        review:
          "Rented a new Honda Jazz hatchback at the beginning of December, overall I highly recommend renting one to anyone visiting Phuket. It made our trip incredibly convenient and enjoyable. Will definitely choose this service again for future trips!",
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    imageUrl: "/toyota-yaris-ativ.png",
    name: "Toyota Yaris Ativ",
    carBodyType: "Sedan",
    pricePerDay: 750,
    engineCapacity: "1.2",
    year: "2023",
    deposit: 6000,
    fuelType: "Gasoline A95",
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Yaris Ativ is a gem for traveling around Phuket! We rented this hatchback for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 4,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Yaris Ativ! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    imageUrl: "/toyota_veloz.png",
    name: "Toyota Veloz",
    carBodyType: "Van",
    pricePerDay: 950,
    engineCapacity: "1.5",
    year: "2023",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 7,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    imageUrl: "/chevrolet-captiva.png",
    name: "Chevrolet Captiva",
    carBodyType: "SUV",
    pricePerDay: 850,
    engineCapacity: "1.5",
    year: "2020",
    fuelType: "Gasoline A95",
    deposit: 6000,
    seatsQuantity: 4,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 5,
    imageUrl: "/mazda-cx30.png",
    name: "Mazda CX-30",
    carBodyType: "SUV",
    pricePerDay: 1200,
    engineCapacity: "2.0",
    year: "2023",
    fuelType: "Gasoline A95",
    deposit: 10000,
    seatsQuantity: 5,
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Chevrolet Captiva is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Chevrolet Captiva! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
  {
    id: 6,
    imageUrl: "/toyota-fortuner.png",
    name: "Toyota Fortuner",
    carBodyType: "SUV",
    pricePerDay: 1700,
    engineCapacity: "2.4",
    fuelType: "Diesel",
    seatsQuantity: 7,
    deposit: 10000,
    year: "2023",
    transmissionType: "Automatic",
    reviews: [
      {
        id: 1,
        name: "James Smith",
        review:
          "The Toyota Fortuner is a gem for traveling around Phuket! We rented this SUV for a week, and it handled every road perfectly—from beaches to mountain trails. The cabin is very comfortable, and the engine has enough power for any conditions.",
        rating: 5,
      },
      {
        id: 2,
        name: "Emily Johnson",
        review:
          "We were thrilled with the Toyota Fortuner! It's spacious, perfect for family trips around Phuket. It glides smoothly over bumpy roads, and we enjoyed traveling comfortably on both beaches and mountain roads. I definitely recommend it for rental.",
        rating: 5,
      },
    ],
  },
];
