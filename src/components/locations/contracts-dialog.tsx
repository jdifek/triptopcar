"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Схема валидации для модели locations
const locationSchema = z.object({
  hotel_name: z.string().min(1, "Hotel name is required").max(100, "Hotel name must be less than 100 characters"),
  google_maps_link: z.string().min(1, "Google Maps link is required").max(255, "Link must be less than 255 characters"),
});

type LocationFormData = {
  hotel_name: string;
  google_maps_link: string;
};

type LocationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: { id: number; hotel_name: string; google_maps_link: string }; // optional для редактирования
  onClose: () => void;
};

export function LocationDialog({ open, onOpenChange, location, onClose }: LocationDialogProps) {
  const { toast } = useToast();

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: location || {
      hotel_name: "",
      google_maps_link: "",
    },
  });

  const onSubmit = async (data: LocationFormData) => {
    try {
      const response = await fetch(`/api/locations${location ? `/${location.id}` : ""}`, {
        method: location ? "PUT" : "POST", // PUT для редактирования, POST для создания
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save location");

      toast({
        title: location ? "Location updated" : "Location created",
        description: location
          ? "The location has been successfully updated."
          : "The location has been successfully created.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the location.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{location ? "Edit Location" : "Add New Location"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Hotel Name */}
            <FormField
              control={form.control}
              name="hotel_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter hotel name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Google Maps Link */}
            <FormField
              control={form.control}
              name="google_maps_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Google Maps link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
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
