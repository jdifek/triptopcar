import { Car, Review } from "@/typing/interfaces";
import clsx from "clsx";
import { StarIcon, User2Icon } from "lucide-react";

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
      {car.reviews?.map((review) => (
        <ReviewBlock review={review} key={review.id} />
      ))}
    </div>
  );
};

const ReviewBlock = ({ review }: { review: Review }) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-brand-base flex items-center justify-center p-2">
          <User2Icon color="#fff" size={30} />
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                <StarIcon
                  color="rgb(253, 176, 34)"
                  fill={review.rating > index ? "rgb(253, 176, 34)" : "transparent"}
                  size={20}
                />
              </span>
            ))}
          </div>
          <h3>{review.name}</h3>
        </div>
      </div>
      <p className="pl-14 text-gray-600 max-sm:pl-0">{review.review}</p>
    </div>
  );
};

export default Reviews;
