import { cn } from "@/lib/utils";
import { CircleXIcon, StarIcon } from "lucide-react";
import React, { useState } from "react";

export default function RatingFilter({
  handleFilter,
  handleReset,
}: {
  handleFilter: (
    cb: (value: IProduct, index: number, array: IProduct[]) => unknown
  ) => void;
  handleReset: () => void;
}) {
  const [rating, setRating] = useState(0);

  const handleChangeRating = (preRating: number) => {
    if (preRating === rating) {
      setRating(0);
      handleReset();
      return;
    }
    setRating(preRating);
    handleFilter((p: IProduct) => p.rating.rate >= preRating);
  };

  return (
    <div className="flex flex-col gap-2">
      <span>By rating</span>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {new Array(5).fill(0).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "size-6 hover:fill-yellow-300",
                i < rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-muted-foreground"
              )}
              onClick={() => handleChangeRating(i + 1)}
            />
          ))}
        </div>
        {rating > 0 && (
          <div className="cursor-pointer" onClick={() => handleChangeRating(0)}>
            <CircleXIcon className="!size-5 " />
          </div>
        )}
      </div>
    </div>
  );
}
