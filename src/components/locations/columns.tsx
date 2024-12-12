"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationActions } from "../locations/actions";
// Обновляем тип Location
export type Location = {
    id: number;
    hotel_name: string;
    google_maps_link: string;
  };

  export const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "id",
      header: "Location ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "hotel_name", // Обновляем для использования hotel_name
      header: "Hotel Name",
      cell: ({ row }) => row.getValue("hotel_name"),
    },
    {
      accessorKey: "google_maps_link", // Обновляем для использования google_maps_link
      header: "Google Maps Link",
      cell: ({ row }) => row.getValue("google_maps_link"),
    },
    {
      id: "actions",
      cell: ({ row }) => <LocationActions location={row.original} />,
    },
  ];
