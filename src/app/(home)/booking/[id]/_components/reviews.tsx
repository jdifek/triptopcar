"use client"
import StarIcon from "@/components/icons/star";
import StarFullIcon from "@/components/icons/star-full";
import UserBestIcon from "@/components/icons/user-icon";
import { Car, Review } from "@/typing/interfaces";
import clsx from "clsx";
import { useState } from "react";

interface ReviewsProps {
  className?: string;
  car: Car;
}

const Reviews: React.FC<ReviewsProps> = ({ className, car }) => {
  return (
    <div
      className={clsx(
        "bg-white p-5 rounded-lg flex flex-col items-start gap-10",
        className
      )}
    >
      {car.reviews?.map((review, index) => (
        <ReviewBlock review={review} key={review.id} isOpen={index === 0} />
      ))}
    </div>
  );
};

const ReviewBlock = ({ review, isOpen }: { review: Review; isOpen: boolean }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(isOpen);

  const toggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <details open={isDetailsOpen} onToggle={toggleDetails} className="flex items-center gap-3 w-full">
        <summary className="flex items-center gap-3 cursor-pointer">
          <div className="rounded-full bg-brand-base flex items-center justify-center p-2">
            <UserBestIcon className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {review.rating > index ? (
                    <StarFullIcon className="w-5 h-5" />
                  ) : (
                    <StarIcon className="w-5 h-5" />
                  )}
                </span>
              ))}
            </div>
            <h3>{review.name}</h3>
          </div>
        </summary>
        <div className="ml-8 mt-2 pl-14 text-gray-600 max-sm:pl-0">
          <p>{review.review}</p>
        </div>
      </details>
    </div>
  );
};

export default Reviews;
