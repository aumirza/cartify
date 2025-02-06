import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  showTotal?: boolean;
  price?: number;
}

export function QuantityControls({
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  showTotal,
  price,
}: QuantityControlsProps) {
  return (
    <div className="flex items-center gap-2 w-full justify-between">
      <div className="flex items-center gap-2">
        {quantity === 1 ? (
          <Button
            onClick={onRemove}
            className="size-8 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
          >
            <TrashIcon className="!size-4" />
          </Button>
        ) : (
          <Button
            onClick={onDecrement}
            className="size-8 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
            disabled={quantity <= 1}
          >
            <MinusIcon className="!size-4" />
          </Button>
        )}
        <span className="w-8 text-center">{quantity}</span>
        <Button
          onClick={onIncrement}
          className="size-8 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
        >
          <PlusIcon className="!size-4" />
        </Button>
      </div>
      {showTotal && price && (
        <span className="text-gray-600">${(price * quantity).toFixed(2)}</span>
      )}
    </div>
  );
}
