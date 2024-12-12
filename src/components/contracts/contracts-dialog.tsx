"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Схема валидации для модели contracts
const contractSchema = z.object({
  client_id: z.number().int().positive().nullable().optional(),
  car_id: z.number().int().positive().nullable().optional(),
  car_brand: z.string().min(1, "Car brand is required").max(100, "Must be less than 100 characters"),
  car_model: z.string().min(1, "Car model is required").max(100, "Must be less than 100 characters"),
  created_by: z.string().min(1, "Created by is required").max(50, "Must be less than 50 characters"),
  mileage: z.number().int().positive("Mileage must be a positive number"),
  fuel_level: z.string().max(20, "Fuel level must be less than 20 characters"),
  is_clean: z.boolean().optional(),
  rental_amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Enter a valid amount (e.g. 100.00)" }),
  deposit_amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Enter a valid deposit amount (e.g. 200.00)" }),
  deposit_currency: z.string().length(3, "Deposit currency must be 3 characters").optional(),
  pickup_address: z.string().max(255, "Pickup address must be less than 255 characters").optional(),
  dropoff_address: z.string().max(255, "Dropoff address must be less than 255 characters").optional(),
  rental_currency: z.string().length(3, "Rental currency must be 3 characters").optional(),
  client_name: z.string().max(100, "Client name must be less than 100 characters").optional(),
  client_surname: z.string().max(100, "Client surname must be less than 100 characters").optional(),
  client_passport_number: z.string().max(50, "Passport number must be less than 50 characters").optional(),
  client_phone_number: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  client_second_phone_number: z.string().max(20, "Second phone number must be less than 20 characters").optional(),
  pickup_location_id: z.number().int().nullable().optional(),
  dropoff_location_id: z.number().int().nullable().optional(),
});

export function ContractDialog({ open, onOpenChange, contract, onClose }: any) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(contractSchema),
    defaultValues: contract || {
      client_id: null,
      car_id: null,
      car_brand: "",
      car_model: "",
      created_by: "",
      mileage: 0,
      fuel_level: "",
      is_clean: true,
      rental_amount: "",
      deposit_amount: "",
      deposit_currency: "USD",
      pickup_address: "",
      dropoff_address: "",
      rental_currency: "USD",
      client_name: "",
      client_surname: "",
      client_passport_number: "",
      client_phone_number: "",
      client_second_phone_number: "",
      pickup_location_id: null,
      dropoff_location_id: null,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Преобразование данных для сохранения
      const preparedData = {
        ...data,
        mileage: Number(data.mileage),
        rental_amount: parseFloat(data.rental_amount),
        deposit_amount: parseFloat(data.deposit_amount),
      };

      const response = await fetch(`/api/contracts${contract ? `/${contract.id}` : ""}`, {
        method: contract ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) throw new Error("Failed to save contract");

      toast({
        title: contract ? "Contract updated" : "Contract created",
        description: contract
          ? "The contract has been successfully updated."
          : "The contract has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the contract.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contract ? "Edit Contract" : "Add New Contract"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Client ID */}
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="1"
                      placeholder="Enter client ID"
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Car ID */}
            <FormField
              control={form.control}
              name="car_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="1"
                      placeholder="Enter car ID"
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Car Brand */}
            <FormField
              control={form.control}
              name="car_brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Brand</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter car brand" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Car Model */}
            <FormField
              control={form.control}
              name="car_model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Model</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter car model" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Created By */}
            <FormField
              control={form.control}
              name="created_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created By</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter creator's name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter manager's name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Start</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date End</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Return</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location_return"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Return</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter return location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baby_chair"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Baby Chair</FormLabel>
                  <FormControl>
                    <Input {...field} type="checkbox" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Insurance</FormLabel>
                  <FormControl>
                    <Input {...field} type="checkbox" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage_odo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage Odo</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter mileage odo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mileage */}
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter mileage" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fuel Level */}
            <FormField
              control={form.control}
              name="fuel_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Level</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter fuel level" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Rental Amount */}
            <FormField
              control={form.control}
              name="rental_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. 100.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Deposit Amount */}
            <FormField
              control={form.control}
              name="deposit_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. 200.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Pickup Address */}
            <FormField
              control={form.control}
              name="pickup_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter pickup address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Dropoff Address */}
            <FormField
              control={form.control}
              name="dropoff_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter dropoff address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Client Name */}
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Client Surname */}
            <FormField
              control={form.control}
              name="client_surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Surname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter client surname" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Client Passport Number */}
            <FormField
              control={form.control}
              name="client_passport_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Passport Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter passport number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Client Phone Number */}
            <FormField
              control={form.control}
              name="client_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deposit_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter deposit currency" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deposit_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter deposit currency" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter fuel type" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickup_location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="1"
                      placeholder="Enter pickup location ID"
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dropoff_location_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dropoff Location ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="1"
                      placeholder="Enter dropoff location ID"
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_clean"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Clean</FormLabel>
                  <FormControl>
                    <Input {...field} type="checkbox" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rental_deposit_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Deposit Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="e.g. 300.00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rental_currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental Currency</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter rental currency" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client Second Phone Number */}
            <FormField
              control={form.control}
              name="client_second_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Second Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter second phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
