"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/locations/columns";
import { LocationDialog } from "@/components/locations/contracts-dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LocationsPage() {
  const { data: locations, error } = useSWR("/api/locations", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (error) return <div>Failed to load locations</div>;
  if (!locations) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">locations Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add locations
        </Button>
      </div>

      <DataTable columns={columns} data={locations} />

      <LocationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
