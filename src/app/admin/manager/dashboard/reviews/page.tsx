"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/reviews/columns";
import { ReviewsDialog } from "@/components/reviews/reviews-dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewsPage() {
  const { data: reviews, error } = useSWR("/api/reviews", fetcher);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (error) return <div>Failed to load reviews</div>;
  if (!reviews) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">reviews Management</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add reviews
        </Button>
      </div>

      <DataTable columns={columns} data={reviews} />

      <ReviewsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
