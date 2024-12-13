import { ColumnDef } from "@tanstack/react-table";
import { ContractActions } from "../contracts/actions";

// Интерфейс данных для таблицы
export type Contract = {
  id: number;
  manager: string;
  carId: number | null;
  carBrand: string;
  carModel: string;
  clientId: number | null;
  clientName: string;
  clientSurname: string;
  clientPassportNumber: string;
  clientPhoneNumber: string;
  clientSecondPhoneNumber?: string;
  startDate: string;
  endDate: string;
  timeReturn: string | null;
  locationReturn: string;
  addressReturn: string;
  fuel: string;
  isClean: boolean;
  mileageOdo: number;
  babyChair: boolean;
  fullInsurance: boolean;
  pickupLocationId: number | null;
  pickupAddress: string;
  dropoffLocationId: number | null;
  dropoffAddress: string;
  rentalAmount: number;
  rentalCurrency: string;
  depositAmount: number;
  depositCurrency: string;
  rentalDepositAmount: number;
  rentalDepositCurrency: string;
  status: string;
};

// Мэппинг данных для согласования API с интерфейсом Contract
const mapContract = (contract: any): Contract => ({
  id: contract.id,
  manager: contract.manager,
  carId: contract.car_id ?? null,
  carBrand: contract.car_brand,
  carModel: contract.car_model,
  clientId: contract.client_id ?? null,
  clientName: contract.client_name,
  clientSurname: contract.client_surname,
  clientPassportNumber: contract.client_passport_number,
  clientPhoneNumber: contract.client_phone_number,
  clientSecondPhoneNumber: contract.client_second_phone_number,
  startDate: contract.date_start?.toISOString() || "",
  endDate: contract.date_end?.toISOString() || "",
  timeReturn: contract.time_return ? contract.time_return.toISOString() : null,
  locationReturn: contract.location_return,
  addressReturn: contract.address_return,
  fuel: contract.fuel,
  isClean: contract.is_clean ?? true,
  mileageOdo: contract.mileage_odo,
  babyChair: contract.baby_chair,
  fullInsurance: contract.full_insurance,
  pickupLocationId: contract.pickup_location_id ?? null,
  pickupAddress: contract.pickup_address,
  dropoffLocationId: contract.dropoff_location_id ?? null,
  dropoffAddress: contract.dropoff_address,
  rentalAmount: Number(contract.rental_amount),
  rentalCurrency: contract.rental_currency || "USD",
  depositAmount: Number(contract.deposit_amount),
  depositCurrency: contract.deposit_currency || "USD",
  rentalDepositAmount: Number(contract.rental_deposit_amount),
  rentalDepositCurrency: contract.rental_deposit_currency || "USD",
  status: contract.status,
});

// Определение колонок таблицы
export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => row.getValue("manager"),
  },
  {
    accessorKey: "carBrand",
    header: "Car Brand",
    cell: ({ row }) => row.getValue("carBrand"),
  },
  {
    accessorKey: "carModel",
    header: "Car Model",
    cell: ({ row }) => row.getValue("carModel"),
  },
  {
    accessorKey: "startDate",
    header: "Date Start",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "endDate",
    header: "Date End",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "timeReturn",
    header: "Time Return",
    cell: ({ row }) => row.getValue("timeReturn") || "N/A",
  },
  {
    accessorKey: "locationReturn",
    header: "Location Return",
    cell: ({ row }) => row.getValue("locationReturn"),
  },
  {
    accessorKey: "addressReturn",
    header: "Address Return",
    cell: ({ row }) => row.getValue("addressReturn"),
  },
  {
    accessorKey: "pickupAddress",
    header: "Pickup Address",
    cell: ({ row }) => row.getValue("pickupAddress"),
  },
  {
    accessorKey: "dropoffAddress",
    header: "Dropoff Address",
    cell: ({ row }) => row.getValue("dropoffAddress"),
  },
  {
    accessorKey: "rentalAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number(row.getValue("rentalAmount")); // Ensure amount is a number
      const currency = row.original.rentalCurrency || "USD";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    },
  },
  {
    accessorKey: "depositAmount",
    header: "Deposit",
    cell: ({ row }) => {
      const amount = Number(row.getValue("depositAmount")); // Ensure amount is a number
      const currency = row.original.depositCurrency;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    },
  },
  {
    accessorKey: "rentalDepositAmount",
    header: "Rental Deposit Amount",
    cell: ({ row }) => {
      const amount = Number(row.getValue("rentalDepositAmount")); // Ensure amount is a number
      const currency = row.original.rentalCurrency || "USD"; // default to "USD" if not provided
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string; // Assert that status is a string
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ContractActions contract={row.original} />,
  },
];
