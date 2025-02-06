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
            variant="destructive"
            size="icon"
            className="size-8"
          >
            <TrashIcon className="!size-4" />
          </Button>
        ) : (
          <Button
            onClick={onDecrement}
            variant="secondary"
            size="icon"
            className="size-8"
            disabled={quantity <= 1}
          >
            <MinusIcon className="!size-4" />
          </Button>
        )}
        <span className="w-8 text-center">{quantity}</span>
        <Button
          onClick={onIncrement}
          variant="secondary"
          size="icon"
          className="size-8"
        >
          <PlusIcon className="!size-4" />
        </Button>
      </div>
      {showTotal && price && (
        <span className="text-muted-foreground">
          ${(price * quantity).toFixed(2)}
        </span>
      )}
    </div>
  );
}
